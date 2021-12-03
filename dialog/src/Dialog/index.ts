interface DialogOptions {
  modal?: boolean;
  cancelable?: boolean;
  activeClass?: string;
}

type CloseEvent = 'accept' | 'cancel';
type OnCloseEventListener = () => void;

export class Dialog {
  protected readonly dialogElement: Element;
  protected readonly acceptButtonElements: Element[] = [];
  protected readonly cancelButtonElements: Element[] = [];
  protected readonly onAcceptEventListeners: OnCloseEventListener[] = [];
  protected readonly onCancelEventListeners: OnCloseEventListener[] = [];
  protected readonly activeClass: string;
  protected readonly isModal: boolean;
  protected readonly isCancelable: boolean;

  protected onAcceptEventHandler?: (event: Event) => void;
  protected onCancelEventHandler?: (event: Event) => void;

  public constructor(element: Element, options?: DialogOptions) {
    this.dialogElement = element;
    this.isModal = options?.modal ?? true;
    this.isCancelable = options?.cancelable ?? false;
    this.activeClass = options?.activeClass ?? 'is-active';
  }

  public addAcceptButton(element: Element) {
    this.acceptButtonElements.push(element);
  }

  public addCancelButton(element: Element) {
    this.cancelButtonElements.push(element);
  }

  public addEventListener(event: 'accept', listener: OnCloseEventListener): void;
  public addEventListener(event: 'cancel', listener: OnCloseEventListener): void;
  public addEventListener(event: CloseEvent, listener: OnCloseEventListener) {
    if (event === 'accept') {
      this.onAcceptEventListeners.push(listener);
    } else if (event === 'cancel') {
      this.onCancelEventListeners.push(listener);
    }
  }

  public show() {
    this.dialogElement.classList.add(this.activeClass);

    if (this.isModal) {
      this.dialogElement.classList.add('is-modal');
    }
  }

  public open() {
    this.show();

    this.onAcceptEventHandler = (event: Event) => {
      this.accept();
      event.stopPropagation();
    };

    this.onCancelEventHandler = (event: Event) => {
      this.cancel();
      event.stopPropagation();
    };

    this.registerCloseEvents();
  }

  public confirm() {
    return new Promise<boolean>(resolve => {
      this.show();

      this.onAcceptEventHandler = (event: Event) => {
        resolve(true);
        this.close();
        event.stopPropagation();
      };

      this.onCancelEventHandler = (event: Event) => {
        resolve(false);
        this.close();
        event.stopPropagation();
      };

      this.registerCloseEvents();
    });
  }

  public close() {
    this.dialogElement.classList.remove(this.activeClass);
    this.unregisterCloseEvents();
  }

  public accept() {
    this.onAcceptEventListeners.forEach(listener => listener());
    this.close();
  }

  public cancel() {
    this.onCancelEventListeners.forEach(listener => listener());
    this.close();
  }

  protected registerCloseEvents() {
    this.acceptButtonElements.forEach(element => {
      if (this.onAcceptEventHandler) {
        element.addEventListener('click', this.onAcceptEventHandler, { once: true });
      }
    });

    this.cancelButtonElements.forEach(element => {
      if (this.onCancelEventHandler) {
        element.addEventListener('click', this.onCancelEventHandler, { once: true });
      }
    });

    if (this.isModal && this.isCancelable) {
      if (this.onCancelEventHandler) {
        this.dialogElement.addEventListener('click', this.onCancelEventHandler, { once: true });
      }
    }
  }

  protected unregisterCloseEvents() {
    if (this.onAcceptEventHandler) {
      for (const element of this.acceptButtonElements) {
        element.removeEventListener('click', this.onAcceptEventHandler);
      }
    }

    if (this.onCancelEventHandler) {
      for (const element of this.cancelButtonElements) {
        element.removeEventListener('click', this.onCancelEventHandler);
      }

      this.dialogElement.removeEventListener('click', this.onCancelEventHandler);
    }
  }
}
