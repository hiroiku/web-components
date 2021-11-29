interface DialogOptions {
  activeClass?: string;
}

type CloseEvent = 'accept' | 'cancel';
type OnCloseEventListener = () => void;

export class Dialog {
  protected readonly dialogElement: Element;
  protected readonly acceptButtonElements: Element[] = [];
  protected readonly cancelButtonElements: Element[] = [];
  protected readonly activeClass: string;
  protected readonly onAcceptedEventListeners: OnCloseEventListener[] = [];
  protected readonly onCanceledEventListeners: OnCloseEventListener[] = [];

  public constructor(element: Element, options?: DialogOptions) {
    this.dialogElement = element;
    this.activeClass = options?.activeClass ?? 'is-active';
  }

  public addEventListener(event: 'accept', listener: OnCloseEventListener): void;
  public addEventListener(event: 'cancel', listener: OnCloseEventListener): void;
  public addEventListener(event: CloseEvent, listener: OnCloseEventListener) {
    if (event === 'accept') {
      this.onAcceptedEventListeners.push(listener);
    } else if (event === 'cancel') {
      this.onCanceledEventListeners.push(listener);
    }
  }

  public addAcceptButton(element: Element) {
    element.addEventListener('click', event => {
      this.close();
      this.onAcceptedEventListeners.forEach(listener => listener());
      event.stopPropagation();
    });
    this.acceptButtonElements.push(element);
  }

  public addCancelButton(element: Element) {
    element.addEventListener('click', event => {
      this.close();
      this.onCanceledEventListeners.forEach(listener => listener());
      event.stopPropagation();
    });
    this.cancelButtonElements.push(element);
  }

  public open() {
    this.dialogElement.classList.add(this.activeClass);
  }

  protected close() {
    this.dialogElement.classList.remove(this.activeClass);
  }

  public confirm() {
    this.open();

    return new Promise<boolean>(resolve => {
      this.acceptButtonElements.forEach(element => {
        element.addEventListener(
          'click',
          event => {
            resolve(true);
            event.stopPropagation();
          },
          { once: true },
        );
      });

      this.cancelButtonElements.forEach(element => {
        element.addEventListener(
          'click',
          event => {
            resolve(false);
            event.stopPropagation();
          },
          { once: true },
        );
      });
    });
  }
}
