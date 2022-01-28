import { Component, OnInit } from '@angular/core';
import { ShopInfo } from 'src/app/models/shop.model';
import { AccountService } from 'src/app/services/account.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  shopId = '' as string;
  shopInfo = '' as any;

  constructor(private accountService: AccountService
    , private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopId = this.shopService.getShopId();
    this.shopService.getShopInfo().subscribe(x => this.shopInfo = x); 
  }

}
