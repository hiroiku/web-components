interface DialogOptions {
  activeClass?: string;
}

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

  public addAcceptButton(element: Element) {
    this.acceptButtonElements.push(element);
  }

  public addCancelButton(element: Element) {
    this.cancelButtonElements.push(element);
  }

  public open() {
    this.dialogElement.classList.add(this.activeClass);

    return new Promise<boolean>(async resolve => {
      this.accept().then(() => resolve(true));
      this.cancel().then(() => resolve(false));
    });
  }

  public async accept() {
    return new Promise<void>(resolve => {
      this.acceptButtonElements.forEach(element => {
        element.addEventListener(
          'click',
          event => {
            this.close();
            this.onAcceptedEventListeners.forEach(listener => listener());
            resolve();
            event.stopPropagation();
          },
          { once: true },
        );
      });
    });
  }

  public async cancel() {
    return new Promise<void>(resolve => {
      this.cancelButtonElements.forEach(element => {
        element.addEventListener(
          'click',
          event => {
            this.close();
            this.onCanceledEventListeners.forEach(listener => listener());
            resolve();
            event.stopPropagation();
          },
          { once: true },
        );
      });
    });
  }

  protected close() {
    this.dialogElement.classList.remove(this.activeClass);
  }
}
