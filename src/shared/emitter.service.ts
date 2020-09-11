import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  public isRecord: EventEmitter<boolean>;
  public isVendorMasterUpdated: EventEmitter<boolean>;
  public isAddressCreated: EventEmitter<boolean>;
  public isPriceListUpdated: EventEmitter<boolean>;
  public sendPurchaseOrder: EventEmitter<any>;
  public isItemCreated: EventEmitter<boolean>;
  public isLoginResponse: EventEmitter<any>;

  constructor() {
    this.isRecord = new EventEmitter();
    this.isVendorMasterUpdated = new EventEmitter();
    this.isAddressCreated = new EventEmitter();
    this.isPriceListUpdated = new EventEmitter();
    this.sendPurchaseOrder = new EventEmitter();
    this.isItemCreated = new EventEmitter();
    this.isLoginResponse = new EventEmitter();
  }
}
