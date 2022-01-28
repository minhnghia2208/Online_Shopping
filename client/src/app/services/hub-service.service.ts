import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  IHttpConnectionOptions,
} from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HubServiceService {
  hubUrl = environment.hubUrl;
  private hubConnectionCart: HubConnection = {} as any;
  private hubConnectionShop: HubConnection = {} as any;
  private hubConnectionOrder: HubConnection = {} as any;

  createHubConnectionCart() {
    this.hubConnectionCart = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '/cart?cart=103ba8', {
        withCredentials: false,
      } as IHttpConnectionOptions)
      .withAutomaticReconnect()
      .build();

    this.hubConnectionCart.start().catch((error: any) => console.log(error));

    this.hubConnectionCart.on('SubmitItems', (id: any) => {
      console.log('LOOK AT THE ID ---->'+ id);
    });
    this.hubConnectionCart.on('UnsubmitItems', (id: any) => {
      console.log(id);
    });
  }
  stopHubConnectionCart() {
    this.hubConnectionCart.stop().catch((error: any) => console.log(error));
  }

  createHubConnectionShop() {
    this.hubConnectionShop = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '/shop?shop=acd839', {
        withCredentials: false,
      } as IHttpConnectionOptions)
      .withAutomaticReconnect()
      .build();

    this.hubConnectionShop.start().catch((error: any) => console.log(error));
    this.hubConnectionShop.on('NewOrder', (id: any) => {
      console.log(id);
    });
    this.hubConnectionShop.on('CancelOrder', (id: any) => {
      console.log(id);
    });
  }
  stopHubConnectionShop() {
    this.hubConnectionShop.stop().catch((error: any) => console.log(error));
  }

  createHubConnectionOrder() {
    this.hubConnectionOrder = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '/order?order=acd839', {
        withCredentials: false,
      } as IHttpConnectionOptions)
      .withAutomaticReconnect()
      .build();

    this.hubConnectionOrder.start().catch((error: any) => console.log(error));

    this.hubConnectionOrder.on('NewOrder', (id: any) => {
      console.log(id);
    });
    this.hubConnectionOrder.on('CancelOrder', (id: any) => {
      console.log(id);
    });
  }
  stopHubConnectionOrder() {
    this.hubConnectionOrder.stop().catch((error: any) => console.log(error));
  }
}
