import { Component, OnInit } from '@angular/core';
import { HubServiceService } from 'src/app/services/hub-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hub-connections',
  templateUrl: './hub-connections.component.html',
  styleUrls: ['./hub-connections.component.css']
})
export class HubConnectionsComponent implements OnInit {
  title = 'Sample'
  baseUrl = 'https://localhost:44342/api';
  hubUrl = environment.hubUrl;

  constructor(private hubService: HubServiceService) { }

  ngOnInit(): void {
  }

  startCartHub() {
    this.hubService.createHubConnectionCart();
  }
  stopCartHub() {
    this.hubService.stopHubConnectionCart();
  }

  startOrderHub() {
    this.hubService.createHubConnectionOrder();
  }
  stopOrderHub() {
    this.hubService.stopHubConnectionOrder();
  }

  startShopHub() {
    this.hubService.createHubConnectionShop();
  }
  stopShopHub() {
    this.hubService.stopHubConnectionShop();
  }

}
