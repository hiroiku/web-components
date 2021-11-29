interface AccordionOptions {
  multiple?: boolean;
  itemSelector?: string;
  handleSelector?: string;
  activeClass?: string;
}

export class Accordion {
  protected readonly multiple: boolean;
  protected readonly itemElements: NodeListOf<Element>;
  protected readonly activeClass: string = 'is-enabled';

  public constructor(element: Element, options?: AccordionOptions) {
    this.multiple = options?.multiple ?? false;
    const itemSelector = options?.itemSelector || '.accordion-item';
    const handleSelector = options?.handleSelector || '.accordion-handle';

    if (options?.activeClass) {
      this.activeClass = options.activeClass;
    }

    this.itemElements = element.querySelectorAll(itemSelector);
    this.itemElements.forEach(itemElement => {
      const handleElement = itemElement.querySelector(handleSelector);
      if (!handleElement) {
        return;
      }

      handleElement.addEventListener('click', () => this.toggle(itemElement));
    });
  }

  public open(element: Element) {
    element.classList.add(this.activeClass);
  }

  public close(element: Element) {
    element.classList.remove(this.activeClass);
  }

  public toggle(element: Element) {
    if (this.multiple) {
      this.itemElements.forEach(itemElement => this.close(itemElement));
      this.open(element);
    } else {
      element.classList.toggle(this.activeClass);
    }
  }
}
