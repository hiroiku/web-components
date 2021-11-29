import { Picture } from '@/Feature/Picture';

export class Bmp extends Picture {
  protected static readonly mimetype = 'image/bmp';
  protected static readonly types = {
    lossless:
      'Qk1xAAAAAAAAAHsAAABsAAAAAQAAAAEAAAABACAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ==',
  };
}
