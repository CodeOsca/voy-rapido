import { Optional } from './optional.interface';
import { StatusResponse } from './flow-status-response.interface';
import { FlowURL } from './flow-url.interface';

export interface FlowPayment {
  build(amount: number, email: string, optional: Optional): Promise<FlowURL>;

  result(data: StatusResponse);
}
