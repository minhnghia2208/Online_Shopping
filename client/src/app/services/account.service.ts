import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterCustomerInfo, RegisterShopInfo } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseURL = environment.apiUrl;
  
  phoneNumber = 0 as number;

  shopId = '' as string;
  customerId = '' as string;
  constructor(private http: HttpClient) { } 

  regAsCustomer(criteria: FormData): void {
    let res = this.http.post<RegisterCustomerInfo>(this.baseURL + '/Customer/register', criteria)
    .subscribe(x => {
      console.log(x);
      this.customerId = x.customerId;
    });
  }

  regAsShop(criteria: FormData): Observable<RegisterShopInfo> {
    return this.http.post<RegisterShopInfo>(this.baseURL + '/Shop/register', criteria);
  }

  loginAsCustomer(phoneNumber: string): void {
    let res = this.http.post<RegisterCustomerInfo>(this.baseURL + '/Shop/login'
    , {phoneNumber: phoneNumber})
    .subscribe(x => {
      console.log(x);
      this.customerId = x.customerId;
    });
  }

  loginAsShop(phoneNumber: string): Observable<RegisterShopInfo>  {
    return this.http.post<RegisterShopInfo>(this.baseURL + '/Shop/login'
    , {phoneNumber: phoneNumber});
  }

  getCustomerId(): string {
    return this.customerId;
  }
  getShopId(): string {
    return this.shopId;
  }
}
