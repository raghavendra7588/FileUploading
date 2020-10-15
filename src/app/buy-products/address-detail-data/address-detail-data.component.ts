import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BuyProductsService } from '../buy-products.service';
import { DialogAddAddressComponent } from '../dialog-add-address/dialog-add-address.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmitterService } from 'src/shared/emitter.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-address-detail-data',
  templateUrl: './address-detail-data.component.html',
  styleUrls: ['./address-detail-data.component.css']
})
export class AddressDetailDataComponent implements OnInit {

  displayedColumns: string[] = ['name', 'mobileNumber', 'houseNo', 'society', 'landMark', 'pinCode', 'city',
    'area', 'state', 'action'];

  dataSource: any;
  vendorId: string;
  addressData: any = [];

  constructor(
    public dialog: MatDialog,
    public buyProductsService: BuyProductsService,
    public emitterService: EmitterService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.vendorId = sessionStorage.getItem('vendorId');
    this.getAddressData();
    this.emitterService.isAddressCreated.subscribe(value => {
      if (value) {
        this.getAddressData();
      }
    });
  }


  openDialog() {
    this.dialog.open(DialogAddAddressComponent, {
      height: '400px',
      width: '800px'
    });
  }

  getAddressData() {
    this.buyProductsService.getAddressDataById(this.vendorId).subscribe(data => {
      this.addressData = data;
      this.dataSource = new MatTableDataSource(this.addressData);
    });
  }

  editAddress(response) {
    this.dialog.open(DialogAddAddressComponent, {
      height: '400px',
      width: '800px',
      data: response
    });
  }

  GoToCart() {
    this.router.navigate(['buyProducts/goToCart']);
  }

}