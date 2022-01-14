import { FlowRequest } from './../enums/flow-request.enum';
import { FlowURL } from '../interfaces/flow-url.interface';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class FlowBuilder {
  private ApiFlowUrl = this.config.get('FLOW_URL');
  private ApiUrl = this.config.get('API_URL');
  private params;

  constructor(private config: ConfigService) {
    this.reset();
  }

  reset() {
    this.params = { apiKey: this.config.get('FLOW_API_KEY'), currency: 'CLP' };
    return this;
  }

  setEmail(email: string) {
    this.params['email'] = email;
    return this;
  }

  setCommerceOrder(commerceOrder: string = uuidv4()) {
    this.params['commerceOrder'] = commerceOrder;
    return this;
  }

  setSubject(subject: string = 'Pago de despacho') {
    this.params['subject'] = subject;
    return this;
  }

  setAmount(amount: number) {
    this.params['amount'] = amount;
    return this;
  }

  setToken(token: string) {
    this.params['token'] = token;
    return this;
  }

  setUrlConfirmation(url: string = this.ApiUrl + 'flow/confirm') {
    this.params['urlConfirmation'] = url;
    return this;
  }

  setUrlReturn(url: string) {
    this.params['urlReturn'] = this.ApiUrl + url;
    return this;
  }

  setOptional(object: any) {
    this.params['optional'] = JSON.stringify(object);
    return this;
  }

  build(request: FlowRequest): FlowURL {
    const sortParams = this.sortParams();
    const sign = this.sign(sortParams);
    const url = this.ApiFlowUrl + request;
    const params = sortParams + '&s=' + sign;
    return { url, params };
  }

  private sortParams() {
    const keys = Object.keys(this.params).sort();
    let params = [];
    keys.map((key) => params.push(key + '=' + this.params[key]));
    return params.join('&');
  }

  private sign(params: string) {
    const secretKey = this.config.get('FLOW_SECRET_KEY');
    return CryptoJS.HmacSHA256(params, secretKey);
  }
}
