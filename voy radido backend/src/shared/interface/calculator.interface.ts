export interface Calculator<T> {
  calculate(element: Partial<T>, ...args: any): Promise<number> | number;
}
