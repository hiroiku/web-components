import { Picture } from '@/Feature/Picture';

export class Png extends Picture {
  protected static readonly mimetype = 'image/png';
  protected static readonly types = {
    alpha: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  };
}
