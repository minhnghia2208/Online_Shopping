import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubConnectionsComponent } from './hub-connections.component';

describe('HubConnectionsComponent', () => {
  let component: HubConnectionsComponent;
  let fixture: ComponentFixture<HubConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubConnectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
