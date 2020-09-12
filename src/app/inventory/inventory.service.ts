import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  price: any;
  token: string;
  sellerId: string;
  intSellerId: number;
  storageSellerId: number;
  priceListData: any = [];
  masterBrandData: any = [];
  extractPriceListData: any = [];
  finalPriceList: any = [];

  private BASE_URL = 'http://203.112.144.38/uat_InventoryService/';
  // private BASE_URL = 'http://localhost:55547/';
  private GET_PURCHASE_ORDER_INVENTORY_DATA = this.BASE_URL + 'api/PurchaseReportInventory';
  private SAVE_ITEM_MASTER = this.BASE_URL + 'api/ItemMaster';
  private GET_ITEM_MASTER = this.BASE_URL + 'api/ItemMaster';
  private GET_MEASUREMENT_UNIT = 'http://203.112.144.38/uat_AdminApi/api/PriceDecisionFactor/getall';

  constructor(public http: HttpClient, public loginService: LoginService) {
    this.token = sessionStorage.getItem('token');
    this.sellerId = sessionStorage.getItem('sellerId');
    this.storageSellerId = Number(sessionStorage.getItem('sellerId'));
  }

  getPurchaseOrderInventoryData(purchaseOrderInventoryData) {
    return this.http.post(this.GET_PURCHASE_ORDER_INVENTORY_DATA, purchaseOrderInventoryData);
  }

  saveItemMaster(itemMaster) {
    return this.http.post(this.SAVE_ITEM_MASTER, itemMaster);
  }

  getItemMaster(sellerId: number) {
    return this.http.get(this.GET_ITEM_MASTER + '/' + sellerId);
  }

  getMeasurementUnitData() {
    const data = {};
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_MEASUREMENT_UNIT, data, { headers: reqHeader });
  }
  
}