import { CommuneDocument, CommuneSchema } from './communes.schema';
import { IVA } from './enums/iva.enum';

CommuneSchema.pre<CommuneDocument>('validate', async function (next) {
  if (this.isModified('price')) {
    const increment = (IVA.percentaje * this.price) / 100;
    this.priceWithIVA = Math.round(this.price + increment);
  }
  next();
});

CommuneSchema.pre<CommuneDocument>('updateOne', async function (next) {
  const data = this['getUpdate']();
  if (data.price) {
    const increment = (IVA.percentaje * data.price) / 100;
    data.priceWithIVA = Math.round(data.price + increment);
  }
  next();
});
