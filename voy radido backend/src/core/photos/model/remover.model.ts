import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';

export class PhotoRemover {
  private default = 'default.png';
  private path = join(process.cwd(), 'uploads');
  constructor(private name: string) {}

  remove() {
    const image = join(this.path, this.name);
    if (!this.isDefault && existsSync(image)) {
      unlinkSync(image);
    }
  }

  private get isDefault() {
    return this.name === this.default;
  }
}
