import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubServiceService } from 'src/app/services/hub-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  
  constructor() {}

  ngOnInit(): void {
  }

  
}
