export class Picture {
  protected static readonly mimetype: string = '';
  protected static readonly types = {};

  public static async features() {
    const loaders: Promise<string>[] = [];

    for (const [key, value] of Object.entries(this.types)) {
      const loader = new Promise<string>(async resolve => {
        const image = new Image();
        image.onload = () => resolve(key);
        image.onerror = () => resolve('');
        image.src = `data:${this.mimetype};base64,${value}`;
      });
      loaders.push(loader);
    }

    const results = await Promise.all(loaders);

    return results.filter(Boolean);
  }
}
