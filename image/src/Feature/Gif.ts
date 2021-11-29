import { Picture } from '@/Feature/Picture';

export class Gif extends Picture {
  protected static readonly mimetype = 'image/gif';
  protected static readonly types = {
    alpha: 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  };
}
