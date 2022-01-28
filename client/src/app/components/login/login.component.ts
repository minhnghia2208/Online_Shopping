import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pnCustomerReg = '' as string;
  pnShopReg = '' as string;

  nameCustomerReg = '' as string;
  nameShopReg = '' as string;
  
  pnCustomerLogin = '' as string;
  pnShopLogin = '' as string;

  constructor(private accountService: AccountService
    , private shopService: ShopService
    , private router: Router
    , private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
  }

  registerAsCustomer(): void {
    let criteria = new FormData();
    criteria.append('name', this.nameCustomerReg);
    criteria.append('phoneNumber', this.pnCustomerReg);

    this.accountService.regAsCustomer(criteria);
  }

  registerAsShop(): void {
    let criteria = new FormData();
    criteria.append('name', this.nameShopReg);
    criteria.append('phoneNumber', this.pnShopReg);
    
    this.accountService.regAsShop(criteria).subscribe(x => {
      console.log(x);
      this.shopService.setShopId(x.shopId);
      this.router.navigate(['./Shop'], {
        relativeTo: this.activatedRouter, 
      });
    })
  }

  loginAsCustomer(): void {
  }

  loginAsShop(): void {
    this.accountService.loginAsShop(this.pnShopLogin).subscribe(x => {
      console.log(x);
      this.shopService.setShopId(x.shopId);
      this.router.navigate(['./Shop'], {
        relativeTo: this.activatedRouter, 
      });
    });
    
  }

}
