import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShopInfo } from '../models/shop.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseURL = environment.apiUrl;

  shopId = '' as string;

  constructor(private http: HttpClient) { }

  setShopId(shopId: string): void {
    this.shopId = shopId;
  }
  getShopId(): string {
    return this.shopId;
  }

  getShopInfo(): Observable<ShopInfo> {
    return this.http.get<ShopInfo>(this.baseURL + '/Shop/' + this.shopId);
  }
}
