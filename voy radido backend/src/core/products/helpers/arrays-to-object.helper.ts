import { Product } from '../products.schema';

export const arraysToObject = (
  keys: string[],
  products: Product[][],
): Product[] => {
  const object = [];

  products.forEach((product) => {
    let newProduct = {};

    product.forEach((value, index) => {
      newProduct[keys[index]] = value;
    });

    object.push(newProduct);
  });

  return object;
};
