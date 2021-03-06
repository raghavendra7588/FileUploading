import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentPriceListComponent } from '../dialog-content-price-list/dialog-content-price-list.component';
import { LoginService } from 'src/app/login/login.service';
import { PurchaseService } from '../purchase.service';
import { MatPaginator } from '@angular/material/paginator';
import { PriceList } from '../purchase.model';
import { EmitterService } from 'src/shared/emitter.service';
import { ToastrService } from 'ngx-toastr';
import { NgModel } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { NgxSpinnerService } from "ngx-spinner";

import * as _ from 'lodash';

@Component({
  selector: 'app-specific-price-list',
  templateUrl: './specific-price-list.component.html',
  styleUrls: ['./specific-price-list.component.css']
})
export class SpecificPriceListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'productId', 'brandName', 'productName', 'quantity', 'actualPrice', 'discount', 'finalPrice', 'availableQuantity', 'save'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any = [];
  datePicker: any;
  objSeller: any;
  sellerName: string;
  sellerId: any;
  categorySettings = {};
  subCategorySettings = {};
  brandSettings = {};

  subCategoriesArray: any = [];
  categoriesArray: any = [];
  brandArray: any = [];

  selectedCategory: any = [];
  multipleCategoriesArray: any = [];
  categoriesArray1: any = [];
  categoriesArray2: any = [];
  categoriesArray3: any = [];
  public multipleBrandArray: any = [];
  array1: any = [];
  array2: any = [];
  array3: any = [];
  finalBrandArray: any = [];
  multipleBrands: any = [];
  brands1: any = [];
  brands2: any = [];
  brands3: any = [];
  categoryList: any;
  subCategoriesList: string;
  brandList: string;
  buyingPrice: any;
  price: any;
  dbData: any = [];
  catchMappedData: any = [];
  updateAllArray: any = [];
  updateAllRecordsCount: number = 0;
  multipleEntries = [];
  multipleEntriesArray: any = [];
  isPriceValid: any;
  isMultipleAmount: boolean;
  priceList: PriceList = new PriceList();
  masterBrandData: any = [];
  selectedBrandId: number;
  anyArray: any = [];
  uniqueBrandNamesArray = [];
  selectedSubCategory: any = [];
  allSelected = false;
  allBrandSelected: boolean = false;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('check') check: MatCheckbox;
  @ViewChild('select') select: MatSelect;
  @ViewChild('BrandSelect') BrandSelect: MatSelect;
  selection = new SelectionModel<PriceList[]>(true, []);
  categoryId: string;
  subCategoryId: string;
  AllSubCategoryArray: any = [];
  AllCategoryArray: any = [];
  categorySearch: any = [];
  subCategorySearch: any = [];
  brandSearch: any = [];
  vendorDetails: any;
  vendorData: any = [];
  strSellerId: string;
  vendorId: any;
  categoryArrayData: any = [];


  particularCategory;
  strcategoryIdArray: any = [];
  strsubCategoryIdArray: any = [];
  numCategoryIdArray: any = [];
  strBrandIdArray: any = [];
  particularVendor: any = [];

  numSubcategoryIdArray: any = [];
  numBrandIdArray: any = [];
  particularCategoryArray: any = [];


  sortedCategory: any = [];

  constructor(public dialog: MatDialog,
    public loginService: LoginService,
    public purchaseService: PurchaseService,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.objSeller = JSON.parse(sessionStorage.getItem('categories'));
    this.sellerName = sessionStorage.getItem('sellerName');
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
    this.loginService.seller_object.categories = JSON.parse(sessionStorage.getItem('categories'));

    let data = this.sortArrayInAscendingOrder(this.loginService.seller_object.categories);
    this.loginService.seller_object.categories = [];
    this.loginService.seller_object.categories = data;
    // this.categorySearch = this.loginService.seller_object.categories;

    this.getPriceListData();
    this.getBrandsMasterData();
    this.getVendorData();

    this.categorySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'All',
      unSelectAllText: 'All',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,

    };

    this.subCategorySettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.brandSettings = {
      singleSelection: true,
      idField: 'BrandID',
      textField: 'BrandName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 1
    };


  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  getVendorData() {
    this.spinner.show();
    this.purchaseService.getAllVendorData(this.strSellerId).subscribe(data => {
      this.vendorData = data;
      this.purchaseService.allvendorData = data;
      this.spinner.hide();
      console.log('all vendor data from Purchase Order 11', this.purchaseService.allvendorData);
    });
  }

  onChange(event) {
    if (event.checked === true) {
      this.updateAllRecordsCount++;
    }
    else {
      this.updateAllRecordsCount--;
    }
  }


  selectedVendorFromList(item) {
    // console.log(item);
    this.categoryList = '';
    this.subCategoriesList = '';
    this.brandList = '';

    this.particularCategoryArray = [];
    this.categorySearch = [];
    this.categoryArrayData = [];
    this.vendorId = item.vendorId;
    // console.log('selected vendor ', this.vendorId);

    this.multipleCategoriesArray = [];
    this.anyArray = [];
    this.purchaseService.allvendorData.filter(item => {
      if (Number(item.vendorId) === Number(this.vendorId)) {
        this.particularVendor = item;
      }
    });
    console.log('particular vendor', this.particularVendor);
    this.dataSource = [];
    this.strcategoryIdArray = this.particularVendor.category;
    this.numCategoryIdArray = this.strcategoryIdArray.split(',').map(Number);
    console.log('int category array', this.numCategoryIdArray);

    this.strsubCategoryIdArray = this.particularVendor.subCategory;
    this.numSubcategoryIdArray = this.strsubCategoryIdArray.split(',').map(Number);
    console.log('int sub category array', this.numSubcategoryIdArray);

    this.strBrandIdArray = this.particularVendor.brand;
    this.numBrandIdArray = this.strBrandIdArray.split(',').map(Number);
    console.log('int brand array', this.numBrandIdArray);

    let particularCategory: any = [];

    this.loginService.seller_object.categories.filter(item => {
      if (this.numCategoryIdArray.includes(Number(item.id))) {
        particularCategory = item;
        this.particularCategoryArray.push(particularCategory);
      }
    });

    // console.log('particularCategory', particularCategory);
    console.log('particularCategoryArray', this.particularCategoryArray);
    this.categorySearch = this.particularCategoryArray;

    this.particularCategoryArray = this.categorySearch.slice();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    this.updateAllRecordsCount = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.updateAllRecordsCount = 0;
    }
    else {
      this.dataSource.data.forEach((row) => {
        this.selection.select(row);
      });

    }
  }

  logSelection() {
    this.isPriceValid = true;
    this.selection.selected.forEach((element) => {
      this.updateAllArray.push(element);
      this.multipleEntriesArray.push(element);
    });
    this.postMultipleInsertion(this.multipleEntriesArray);

    this.updateAllRecordsCount = this.updateAllArray.length;
    this.multipleEntriesArray = [];
    this.updateAllArray = [];
  }

  getBrandsMasterData() {
    this.spinner.show();
    setTimeout(() => {
      this.purchaseService.getEveryBrand().subscribe(data => {
        this.masterBrandData = data;
        this.spinner.hide();
      });
    }, 400);
  }

  openDialog() {
    this.dialog.open(DialogContentPriceListComponent, {
      height: '600px',
      width: '800px',
    });
  }



  onCategorySelectAll() {

    // let catchMappedCategory: any = [];
    // let filteredCategoryData: any = [];
    // let filteredBrandData: any = [];
    // this.purchaseService.getEveryBrand().subscribe(data => {

    //   this.AllCategoryArray = data;
    //   this.multipleCategoriesArray = [];

    //   catchMappedCategory = this.mapObj(this.AllCategoryArray, this.dbData);

    //   this.dataSource = [];

    //   catchMappedCategory.filter(data => {
    //     if (this.numSubcategoryIdArray.includes(Number(data.SubCategoryID))) {
    //       filteredCategoryData.push(data);
    //     }
    //   });
    //   console.log('filteredCategoryData', filteredCategoryData);
    //   // this.finalBrandArray = filteredCategoryData;
    //   // console.log('finalBrandArray', this.finalBrandArray);

    //   this.subCategorySearch = filteredCategoryData;

    //   catchMappedCategory.filter(data => {
    //     if (this.numBrandIdArray.includes(Number(data.BrandID))) {
    //       console.log('inside cat select all');
    //       filteredBrandData.push(data);
    //     }
    //   });
    //   console.log('filteredBrandData', filteredBrandData);

    //   // this.dataSource = new MatTableDataSource(filteredCategoryData);
    //   // this.dataSource = new MatTableDataSource(filteredBrandData);
    //   // this.dataSource = [...filteredBrandData];
    //   this.dataSource.data = filteredBrandData;
    //   // this.dataSource = filteredBrandData;
    //   this.dataSource.paginator = this.paginator;
    //   console.log('cat select all data source', this.dataSource);

    //   let uniqueBrandName = this.createUniqueBrandName(filteredBrandData);
    //   this.anyArray = this.sortUniqueBrandName(uniqueBrandName);

    //   this.brandSearch = this.anyArray;

    //   console.log('any array in cat', this.anyArray);
    // });
    // // this.particularCategoryArray = this.categorySearch.slice();
    // this.multipleCategoriesArray = this.subCategorySearch.slice();
    // this.anyArray = this.brandSearch.slice();


    let catchMappedCategory: any = [];
    let filteredCategoryData: any = [];
    let filteredBrandData: any = [];
    this.purchaseService.getEveryBrand().subscribe(data => {

      this.AllCategoryArray = data;
      this.multipleCategoriesArray = [];

      catchMappedCategory = this.mapObj(this.AllCategoryArray, this.dbData);

      this.dataSource = [];

      catchMappedCategory.filter(data => {
        if (this.numSubcategoryIdArray.includes(Number(data.SubCategoryID))) {
          filteredCategoryData.push(data);
        }
      });
      console.log('filteredCategoryData', filteredCategoryData);

      this.subCategorySearch = filteredCategoryData;

      catchMappedCategory.filter(data => {

        if (this.numBrandIdArray.includes(Number(data.BrandID))) {
          filteredBrandData.push(data);
        }
      });


      // this.dataSource = new MatTableDataSource(filteredCategoryData);
      this.dataSource = new MatTableDataSource(filteredBrandData);
      this.dataSource.paginator = this.paginator;

      let uniqueBrandName = this.createUniqueBrandName(filteredBrandData);
      this.anyArray = this.sortUniqueBrandName(uniqueBrandName);

      this.brandSearch = this.anyArray;

      console.log('any array in cat', this.anyArray);
    });
    this.particularCategoryArray = this.categorySearch.slice();
    this.multipleCategoriesArray = this.subCategorySearch.slice();
    this.anyArray = this.brandSearch.slice();
  }


  onSubCategorySelectAll() {

    let catchMappedSubCategory: any = [];
    let filteredSubCategoryData: any = [];
    let filteredBrandData: any = [];

    this.purchaseService.getEachBrand(this.categoryId.toString(), '0').subscribe(data => {
      this.AllSubCategoryArray = data;
      catchMappedSubCategory = this.mapObj(this.AllSubCategoryArray, this.dbData);


      catchMappedSubCategory.filter(data => {
        if (this.numSubcategoryIdArray.includes(Number(data.SubCategoryID))) {
          filteredSubCategoryData.push(data);
        }
      });

      // this.subCategorySearch = filteredSubCategoryData;
      // this.finalBrandArray = catchMappedSubCategory;
      // console.log('finalBrandArray', this.finalBrandArray);
      console.log('this.numBrandIdArray', this.numBrandIdArray);
      console.log('filteredSubCategoryData', filteredSubCategoryData);
      catchMappedSubCategory.filter(data => {
        if (this.numBrandIdArray.includes(Number(data.BrandID))) {
          filteredBrandData.push(data);
        }
      });
      console.log('filteredBrandData', filteredBrandData);
      // this.dataSource = filteredBrandData;
      // this.dataSource = new MatTableDataSource(filteredSubCategoryData);
      this.dataSource = new MatTableDataSource(filteredBrandData);
      this.dataSource.paginator = this.paginator;

      let uniqueBrands = this.createUniqueBrandName(filteredBrandData);
      this.anyArray = this.sortUniqueBrandName(uniqueBrands);

      this.brandSearch = this.anyArray;
      console.log('any array', this.anyArray);
    });
    // this.particularCategoryArray = this.categorySearch.slice();
    // this.multipleCategoriesArray = this.subCategorySearch.slice();
    this.anyArray = this.brandSearch.slice();


  }

  onBrandSelectAll() {
    let mappedBrandData: any = [];
    let brandData: any = [];
    let uniqueBrandNameData: any = [];
    let FinalFilteredBrandData: any = [];

    this.purchaseService.getAllBrand(this.categoryId, this.subCategoryId).subscribe(data => {

      brandData = data;

      mappedBrandData = this.mapObj(brandData, this.dbData);
      console.log('mappedBrandData', mappedBrandData);

      mappedBrandData.filter(item => {
        if (this.numBrandIdArray.includes(Number(item.BrandID))) {
          FinalFilteredBrandData.push(item);
          // console.log('inside');
        }
      });

      console.log('FinalFilteredBrandData', FinalFilteredBrandData);
      // this.multipleBrandArray = this.catchMappedData;
      this.dataSource = new MatTableDataSource(FinalFilteredBrandData);
      this.dataSource.paginator = this.paginator;
      uniqueBrandNameData = this.createUniqueBrandName(FinalFilteredBrandData);
      this.anyArray = this.sortUniqueBrandName(uniqueBrandNameData);
      this.multipleBrandArray = this.catchMappedData;
      this.brandSearch = this.anyArray;

    });
    // this.particularCategoryArray = this.categorySearch.slice();
    // this.multipleCategoriesArray = this.subCategorySearch.slice();
    this.anyArray = this.brandSearch.slice();
  }

  onCategoriesChange(event, category: any) {
    let multipleCategoryData: any = [];
    this.anyArray = [];
    if (event.isUserInput) {
      if (event.source.selected) {
        this.categoryId = category.id.toString();
        this.categoriesArray.push(category.id);
        this.spinner.show();
        this.purchaseService.getAllSubCategories(category.id).subscribe(data => {
          multipleCategoryData = data;
          // this.multipleCategoriesArray = data;
          // this.subCategorySearch = this.multipleCategoriesArray;
          this.sortedCategory = this.sortArrayInAscendingOrder(multipleCategoryData);


          let particularSubCategoryArray: any = [];
          this.sortedCategory.filter(item => {


            if (this.numSubcategoryIdArray.includes(Number(item.id))) {

              particularSubCategoryArray.push(item);
            }
          });
          console.log('particularSubCategoryArray', particularSubCategoryArray);
          // this.multipleCategoriesArray = particularSubCategoryArray;
          this.multipleCategoriesArray = particularSubCategoryArray;
          this.subCategorySearch = this.multipleCategoriesArray;
          this.spinner.hide();
        });

        this.multipleCategoriesArray = this.subCategorySearch.slice();


        let eachBrandData: any = [];
        let mappedData: any = [];
        let uniqueBrandName: any = [];
        console.log('category select category id', category.id);
        // this.purchaseService.getEachBrand(category.id, '0').subscribe(data => {
        //   eachBrandData = data;
        //   // this.uniqueBrandNamesArray = this.createUniqueBrandName(this.catchMappedData);
        //   // this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);


        //   mappedData = this.mapObj(eachBrandData, this.dbData);

        //   this.dataSource = new MatTableDataSource(mappedData);
        //   this.dataSource.paginator = this.paginator;
        //   // uniqueBrandName = this.createUniqueBrandName(mappedData);
        //   // this.anyArray = this.sortUniqueBrandName(uniqueBrandName);
        // });




      }
    }

  }

  onSubCategoriesChange(event, subCategory: any) {
    let filteredBrandDataArray: any = [];
    if (event.isUserInput) {
      if (event.source.selected) {
        this.subCategoryId = subCategory.id.toString();
        this.subCategoriesArray.push(subCategory.id);
        this.spinner.show();
        this.purchaseService.getAllBrand(subCategory.parentid, subCategory.id).subscribe(data => {

          this.multipleBrandArray = data;
          this.catchMappedData = this.mapObj(this.multipleBrandArray, this.dbData);
          this.multipleBrandArray = this.catchMappedData;

          console.log('sub this.catchMappedData', this.catchMappedData);



          this.catchMappedData.filter(data => {

            if (this.numBrandIdArray.includes(Number(data.BrandID))) {
              filteredBrandDataArray.push(data);
            }
          });
          console.log('filteredBrandDataArray', filteredBrandDataArray);



          // let uniquePurchaseOrder = _.uniqBy(this.reportData, 'ProductVarientId');




          this.uniqueBrandNamesArray = this.createUniqueBrandName(filteredBrandDataArray);
          this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
          console.log('brand data received', this.anyArray);
          this.brandSearch = this.anyArray;

          this.dataSource = new MatTableDataSource(filteredBrandDataArray);
          this.dataSource.paginator = this.paginator;

          // this.particularCategoryArray = this.categorySearch.slice();
          // this.multipleCategoriesArray = this.subCategorySearch.slice();
          // this.anyArray = this.brandSearch.slice();

          // this.uniqueBrandNamesArray = this.createUniqueBrandName(this.catchMappedData);
          // this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
          // console.log(this.anyArray);
          // this.multipleBrandArray = this.catchMappedData;
          // this.brandSearch = this.anyArray;
          // this.dataSource = new MatTableDataSource(this.catchMappedData);
          // this.dataSource.paginator = this.paginator;
          this.spinner.hide();
        });
        this.anyArray = this.brandSearch.slice();

      }
    }


  }

  onProductChange(event, product: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.spinner.show();
        this.dataSource = [];
        this.brandArray.push(product.ProductID);

        let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
          return item.BrandName.trim() === product.BrandName;
        });
        this.finalBrandArray = filteredBrandArray;

        this.dataSource = [];
        this.dataSource = new MatTableDataSource(this.finalBrandArray);
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
      }

    }
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editPriceList(element) {
    if (element.priceListId) {

      this.priceList.sellerId = element.SellerId;
      this.priceList.productId = element.ProductID;
      this.priceList.subCategoryId = element.SubCategoryID;
      this.priceList.brandId = element.BrandID;
      this.priceList.buyingPrice = element.ProductPrice;
      this.priceList.finalPrice = element.FinalPrice;
      this.priceList.ReferenceId = element.Id;
      this.priceList.discount = element.Discount;
      this.priceList.availableQuantity = element.AvailableQuantity;
      this.priceList.quantity = element.Quantity;
      this.priceList.ProductVarientId = element.ProductVarientId;
      this.purchaseService.savePriceListMaster(this.priceList).subscribe(data => {
        this.toastr.success('price list updated');
      });
    }
    else {

      this.priceList.priceListId = element.priceListId;
      this.priceList.sellerId = element.SellerId;
      this.priceList.productId = element.ProductID;
      this.priceList.subCategoryId = element.SubCategoryID;
      this.priceList.brandId = element.BrandID;

      this.priceList.buyingPrice = element.ProductPrice;
      this.priceList.finalPrice = element.FinalPrice;

      this.priceList.ReferenceId = element.Id;

      this.priceList.discount = element.Discount;

      this.priceList.availableQuantity = element.AvailableQuantity;
      this.priceList.quantity = element.Quantity;
      this.priceList.ProductVarientId = element.ProductVarientId;
      let isPriceValid = (Number(this.priceList.buyingPrice) - Number(this.priceList.discount)) === Number(this.priceList.finalPrice);
      if (isPriceValid) {
        this.purchaseService.savePriceListMaster(this.priceList).subscribe(data => {
          this.toastr.success('price list saved');
          this.priceList.buyingPrice = 0;
          this.priceList.discount = 0;
          this.priceList.finalPrice = 0;
        });
      }
      else {
        this.toastr.error('Please Check Buying Price, Discount and Final Price');
      }
    }
  }

  getPriceListData() {
    this.spinner.show();
    this.purchaseService.getAllPriceListData(this.sellerId).subscribe(data => {
      this.dbData = data;
      this.spinner.hide();
    });
  }


  postMultipleInsertion(elements) {
    elements.forEach(element => {
      this.priceList = new PriceList();
      this.priceList.priceListId = element.priceListId;
      this.priceList.sellerId = element.SellerId;
      this.priceList.productId = element.ProductID;
      this.priceList.subCategoryId = element.SubCategoryID;
      this.priceList.brandId = element.BrandID;

      this.priceList.buyingPrice = element.ProductPrice;
      this.priceList.finalPrice = element.FinalPrice;

      this.priceList.ReferenceId = element.Id;

      this.priceList.discount = element.Discount;
      this.priceList.availableQuantity = element.AvailableQuantity;
      this.priceList.quantity = element.Quantity;
      this.priceList.ProductVarientId = element.ProductVarientId;

      this.isPriceValid = (Number(this.priceList.buyingPrice) - Number(this.priceList.discount)) === Number(this.priceList.finalPrice);
      if (this.isPriceValid) {
        this.multipleEntries.push(this.priceList);
        this.isMultipleAmount = true;
      }
      else {
        this.isMultipleAmount = false;
      }
    });
    if (this.isMultipleAmount) {
      this.purchaseService.saveMultiplePriceList(this.multipleEntries).subscribe(data => {
        this.toastr.success('price list saved');
        this.selection.clear();
        this.updateAllRecordsCount = 0;
        this.priceList = new PriceList();
        this.priceList.buyingPrice = 0;
        this.priceList.discount = 0;
        this.priceList.finalPrice = 0;
        this.updateAllArray = [];
        this.multipleEntriesArray = [];
      });
    }
    else {
      this.toastr.error('Please Check Buying Price, Discount and Final Price');
      this.multipleEntriesArray = [];
    }
  }

  mapObj(apiData, ownDbData) {
    for (let i = 0; i < apiData.length; i++) {
      apiData[i].ProductPrice = 0;
      apiData[i].Discount = 0;
      apiData[i].FinalPrice = 0;
      for (let j = 0; j < ownDbData.length; j++) {
        if (apiData[i].ProductID === ownDbData[j].ProductId && apiData[i].ProductVarientId === ownDbData[j].ProductVarientId) {
          apiData[i].ProductPrice = ownDbData[j].BuyingPrice;
          apiData[i].Discount = ownDbData[j].Discount;
          apiData[i].FinalPrice = ownDbData[j].FinalPrice;
        }
      }
    }
    return apiData;
  }


  createUniqueBrandName(array: any) {
    let sortedArray: Array<any> = [];
    for (let i = 0; i < array.length; i++) {
      if ((sortedArray.findIndex(p => p.BrandName.trim() == array[i].BrandName.trim())) == -1) {
        var item = { BrandName: array[i].BrandName.trim(), SubCategoryID: array[i].SubCategoryID, BrandID: array[i].BrandID }
        sortedArray.push(item);
      }
    }
    return sortedArray;
  }
  sortUniqueBrandName(array) {
    array.sort((a, b) => {
      return a.BrandName.localeCompare(b.BrandName);
    });
    return array
  }

  sortArrayInAscendingOrder(array) {
    array.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return array;
  }
}