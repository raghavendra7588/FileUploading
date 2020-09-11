import { Component, OnInit, Input, ViewChild, OnDestroy, ChangeDetectorRef, AfterViewChecked, Output, EventEmitter, Inject } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PriceList, PurchaseOrderItem, customPriceList, CustomProductList } from '../purchase.model';
import { LoginService } from 'src/app/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { MatSelect } from '@angular/material/select';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { EmitterService } from 'src/shared/emitter.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-get-price-list',
  templateUrl: './get-price-list.component.html',
  styleUrls: ['./get-price-list.component.css']
})
export class GetPriceListComponent implements OnInit, AfterViewChecked, OnDestroy {
  categoryId: any;
  priceListData: any = [];
  sellerId: any;
  masterBrandData: any = [];
  extractPriceListData: any = [];
  finalPriceList: any = [];
  categoryListData: any;
  dataSource: any;
  isDataLoaded: boolean = false;
  purchaseOrderItem: PurchaseOrderItem = new PurchaseOrderItem();
  priceList: PriceList = new PriceList();
  customPriceList: customPriceList = new customPriceList();
  customProductList: CustomProductList = new CustomProductList();
  @ViewChild('select') select: MatSelect;
  selection = new SelectionModel<PriceList[]>(true, []);
  displayedColumns: string[] = ['select', 'productId', 'brandName', 'productName', 'quantity', 'actualPrice', 'discount', 'finalPrice', 'availableQuantity'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  datePicker: any;
  objSeller: any;
  sellerName: string;
  subCategoriesArray: any = [];
  categoriesArray: any = [];
  brandArray: any = [];
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
  categoryList: string;
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
  isMultipleAmount: boolean = true;
  checkFinalPrice: boolean = true;
  selectedBrandId: number;
  anyArray: any = [];
  uniqueBrandNamesArray = [];
  allSelected = false;
  allBrandSelected: boolean = false;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('check') check: MatCheckbox;
  @ViewChild('BrandSelect') BrandSelect: MatSelect;
  totalAmount: number = 0;
  @Output() purchaseOrderListData = new EventEmitter<any[]>();
  finalPurchaseOrderArray: any = [];
  uniquePurchaseOrderItemArray: any = [];
  isAllPurchaseOrder: any = [];
  isProductSelected: boolean = false;
  receivedVendorId: number;
  categorySettings = {};
  subCategorySettings = {};
  brandSettings = {};
  particularCategoryArray: any = [];
  particularVendor: any = [];
  vendorData: any = [];
  selectedsubCategory: any = [];
  sortedCategory: any = [];
  numSubcategoryIdArray: any = [];
  numBrandIdArray: any = [];

  constructor(public purchaseService: PurchaseService,
    public loginService: LoginService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    public emitterService: EmitterService,
    private dialogRef: MatDialogRef<GetPriceListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.isDataLoaded = false;
    this.isProductSelected = false;
    this.receivedVendorId = data;
    // this.getVendorData();
  }

  ngOnInit(): void {


    this.dataSource = new MatTableDataSource();
    this.loginService.seller_object.categories = JSON.parse(sessionStorage.getItem('categories'));
    this.sellerId = sessionStorage.getItem('sellerId');
    this.objSeller = JSON.parse(sessionStorage.getItem('categories'));
    this.sellerName = sessionStorage.getItem('sellerName');
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
    this.loginService.seller_object.categories = JSON.parse(sessionStorage.getItem('categories'));
    this.getPriceListData();
    this.getBrandsMasterData();
    this.filterCategoryList();

    this.categorySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.subCategorySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.brandSettings = {
      singleSelection: false,
      idField: 'BrandID',
      textField: 'BrandName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    // singleSelection: false,
    // idField: 'BrandID',
    // textField: 'BrandName',
    // selectAllText: 'Select All',
    // unSelectAllText: 'UnSelect All',
    // badgeShowLimit: 3,
    // allowSearchFilter: true

    // this.filterCategoryList();
  }
  filterCategoryList() {
    // let particularVendor;
    let particularCategory;
    let strcategoryIdArray: any = [];
    let strsubCategoryIdArray: any = [];
    let numCategoryIdArray: any = [];
    let strBrandIdArray: any = [];

    this.purchaseService.allvendorData.filter(item => {
      if (Number(item.vendorId) === Number(this.receivedVendorId)) {
        this.particularVendor = item;
      }
    });
    strcategoryIdArray = this.particularVendor.category;
    numCategoryIdArray = strcategoryIdArray.split(',').map(Number);

    strsubCategoryIdArray = this.particularVendor.subCategory;
    this.numSubcategoryIdArray = strsubCategoryIdArray.split(',').map(Number);


    strBrandIdArray = this.particularVendor.brand;
    this.numBrandIdArray = strBrandIdArray.split(',').map(Number);

    this.loginService.seller_object.categories.filter(item => {

      if (numCategoryIdArray.includes(Number(item.id))) {
       
        particularCategory = item;
        this.particularCategoryArray.push(particularCategory);
      }
    });
  }

  filterSubCategoryList() {
    // let particularVendor;
    // let particularSubCategory;
    // this.purchaseService.allvendorData.filter(item => {
    //   if (Number(item.vendorId) === Number(this.receivedVendorId)) {
    //     particularVendor = item;
    //   }
    // });


  }


  getVendorData() {
    this.purchaseService.getAllVendorData().subscribe(data => {
      this.vendorData = data;
    });
  }


  ngAfterViewChecked() {
    this.cdr.detectChanges();
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


  onChange(event) {
    if (event.checked === true) {
      this.updateAllRecordsCount++;
    }
    else {
      this.updateAllRecordsCount--;
    }
  }



  updateAll() {
    this.checkFinalPrice = true;
    this.selection.selected.forEach((element) => {
      if (this.checkFinalPrice === false) {
        return;
      }

      this.checkFinalPrice = this.checkItemFinalPrice(element);
      if (!this.checkFinalPrice) {
        this.toastr.error('Please Check Purchase Quantity');
      }
    });
    if (this.checkFinalPrice) {
      this.selection.selected.forEach((element) => {
        this.multipleEntriesArray.push(element);
        this.uniquePurchaseOrderItemArray = this.uniqueEntries(this.multipleEntriesArray, element);

      });
      this.postMultipleInsertion(this.uniquePurchaseOrderItemArray);
    }
  }
  uniqueEntries(arr, obj) {
    let isExist = arr.some(o => o.ProductVarientId === obj.ProductVarientId && o.Id === obj.Id);
    if (!isExist)
      arr.push(obj);
    return arr;
  }
  getBrandsMasterData() {
    setTimeout(() => {
      this.purchaseService.getEveryBrand().subscribe(data => {
        this.masterBrandData = data;
      });
    }, 400);
  }

  onCategorySelect(event) {

    this.purchaseService.getAllSubCategories(event.id).subscribe(data => {
      if (this.multipleCategoriesArray.length === 0) {
        this.multipleCategoriesArray = data;
        this.sortedCategory = this.sortArrayInAscendingOrder(this.multipleCategoriesArray);
        // this.multipleCategoriesArray = [];
        // this.multipleCategoriesArray = sortedCategory;

      }
      else {
        this.categoriesArray2 = data;
        this.categoriesArray3 = [...this.multipleCategoriesArray, ...this.categoriesArray2];
        this.multipleCategoriesArray = this.categoriesArray3;
        this.sortedCategory = this.sortArrayInAscendingOrder(this.multipleCategoriesArray);

      }

      let particularSubCategoryArray: any = [];
      this.sortedCategory.filter(item => {
  
        if (this.numSubcategoryIdArray.includes(Number(item.id))) {
          particularSubCategoryArray.push(item);
        }
        this.multipleCategoriesArray = particularSubCategoryArray;
      });

    });

  }

  onCategoryDeSelect(event) {

    let remainingCategoriesArray = this.multipleCategoriesArray.filter(function (item) {
      return Number(item.parentid) !== Number(event.id);
    });
    this.multipleCategoriesArray = [];
    this.multipleCategoriesArray = remainingCategoriesArray;

    if (this.multipleCategoriesArray.length === 0) {
      this.multipleCategoriesArray = [];
      this.anyArray = [];
      this.dataSource = [];
    }
  }

  onCategorySelectAll(event) {
    console.log('select all', event);
  }
  onCategoryDeSelectAll(event) {
    console.log('disselect all', event);
  }




  onSubCategorySelect(event, data) {
    let uniqueBrandName: any = [];
    let particularBrands: any = [];
    this.purchaseService.getAllBrand(data[0].parentid, event.id).subscribe(data => {
      if (this.multipleBrandArray.length === 0) {
        this.multipleBrandArray = data;
        this.catchMappedData = this.mapObj(this.multipleBrandArray, this.dbData);
        // this.multipleBrandArray = this.catchMappedData;
      }
      else {
        this.array2 = data;
        this.array2 = this.mapObj(this.array2, this.dbData);
        this.array3 = [...this.catchMappedData, ...this.array2];
        this.catchMappedData = this.array3;
      }
      this.uniqueBrandNamesArray = this.createUniqueBrandName(this.catchMappedData);

      uniqueBrandName = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
 

      uniqueBrandName.filter(item => {
        if (this.numBrandIdArray.includes(Number(item.BrandID))) {
          particularBrands.push(item);
        }
      });
      this.anyArray = particularBrands;
      this.multipleBrandArray = this.catchMappedData;

    });
  }

  onSubCategoryDeSelect(event) {
    let newArr = [];
    newArr = this.anyArray.filter(function (item) {
      return Number(item.SubCategoryID) !== Number(event.id);
    });
    this.anyArray = [];
    this.anyArray = newArr;

    let unSelectedSubCategoryArray = this.finalBrandArray.filter(function (item) {
      return Number(item.SubCategoryID) !== Number(event.id);
    });
    this.finalBrandArray = unSelectedSubCategoryArray;
    this.dataSource = new MatTableDataSource(unSelectedSubCategoryArray);
    this.dataSource.paginator = this.paginator;

  }

  onBrandSelect(event) {


    if (this.finalBrandArray.length === 0) {
      let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
        return item.BrandName.trim() === event.BrandName
      });
      this.finalBrandArray = filteredBrandArray;

      this.dataSource = new MatTableDataSource(this.finalBrandArray);
      this.dataSource.paginator = this.paginator;
    }
    else {
      this.brands1 = this.multipleBrandArray.filter(function (item) {
        return item.BrandName.trim() === event.BrandName
      });
      this.brands2 = this.brands1;
      this.brands3 = [...this.finalBrandArray, ...this.brands2];
      this.finalBrandArray = this.brands3;

      this.dataSource = new MatTableDataSource(this.finalBrandArray);
      this.dataSource.paginator = this.paginator;
    }
  }

  onBrandDeSelect(event) {
    let tempArr = this.finalBrandArray.filter(function (item) {
      return item.BrandName.trim() != event.BrandName.trim();
    });
    this.finalBrandArray = tempArr;

    this.dataSource = new MatTableDataSource(this.finalBrandArray);
    this.dataSource.paginator = this.paginator;
  }


  onCategoriesChange(event, category: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        let items: any = [];
        this.purchaseService.getAllSubCategories(category.id).subscribe(data => {
          if (this.multipleCategoriesArray.length === 0) {
            // this.multipleCategoriesArray = data;
            items = data;
            items.filter(data => {
              if (Number(data.id) === Number(this.particularVendor.subCategory)) {
                this.multipleCategoriesArray.push(data);
              }
            });
          }
          else {
            this.categoriesArray2 = data;
            this.categoriesArray3 = [...this.multipleCategoriesArray, ...this.categoriesArray2];
            this.multipleCategoriesArray = this.categoriesArray3;
          }
        });


      }
    }

    if (!event.source.selected) {
      let newCategoriesArr = this.multipleCategoriesArray.filter(function (item) {
        // return item.id != category.id;
        return Number(item.parentid) !== Number(category.id);
      });
      this.multipleCategoriesArray = newCategoriesArr;
    }
  }


  onSubCategoriesChange(event, subCategory: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        let brandItem: any = [];
        this.purchaseService.getAllBrand(subCategory.parentid, subCategory.id).subscribe(data => {
          if (this.multipleBrandArray.length === 0) {
            this.multipleBrandArray = data;
            this.catchMappedData = this.mapObj(this.multipleBrandArray, this.dbData);
          }
          else {
            this.array2 = data;
            this.array2 = this.mapObj(this.array2, this.dbData);
            this.array3 = [...this.catchMappedData, ...this.array2];
            this.catchMappedData = this.array3;
          }
          this.uniqueBrandNamesArray = this.createUniqueBrandName(this.catchMappedData);
          brandItem = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
          brandItem.filter(data => {
            if (Number(data.BrandID) === Number(this.particularVendor.brand)) {
              this.anyArray.push(data);
            }
          });
          // this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
          this.multipleBrandArray = this.catchMappedData;
          // this.multipleBrandArray = this.anyArray;
        });
      }
    }
    if (!event.source.selected) {
      let newArr = [];
      newArr = this.anyArray.filter(function (item) {
        return item.SubCategoryID != subCategory.id;
      });
      this.anyArray = [];
      // this.multipleBrandArray = newArr;
      this.anyArray = newArr;
      let unSelectedSubCategoryArray = this.finalBrandArray.filter(function (item) {
        return item.SubCategoryID != subCategory.id
      });

      this.finalBrandArray = unSelectedSubCategoryArray;

      this.dataSource = new MatTableDataSource(unSelectedSubCategoryArray);
      this.dataSource.paginator = this.paginator;
    }

  }


  onProductChange(event, product: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        if (this.finalBrandArray.length === 0) {
          let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
            return item.BrandName.trim() === product.BrandName
          });
          this.finalBrandArray = filteredBrandArray;
          // this.multipleBrandArray = this.finalBrandArray;
          this.dataSource = new MatTableDataSource(this.finalBrandArray);
          this.dataSource.paginator = this.paginator;
        }
        else {
          this.brands1 = this.multipleBrandArray.filter(function (item) {
            return item.BrandName.trim() === product.BrandName
          });
          this.brands2 = this.brands1;
          this.brands3 = [...this.finalBrandArray, ...this.brands2];
          this.finalBrandArray = this.brands3;
          this.dataSource = new MatTableDataSource(this.finalBrandArray);
          this.dataSource.paginator = this.paginator;
        }

      }
      if (!event.source.selected) {
        var tempArr = this.finalBrandArray.filter(function (item) {
          return item.BrandName.trim() != product.BrandName;
        });
        this.finalBrandArray = tempArr;
        this.dataSource = new MatTableDataSource(this.finalBrandArray);
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }


  getPriceListData() {
    this.purchaseService.getAllPriceListData(this.sellerId).subscribe(data => {
      this.dbData = data;
    });
  }

  mapObj(apiData, ownDbData) {
    let exisitingRecords: any = [];
    for (let i = 0; i < apiData.length; i++) {
      apiData[i].ProductPrice = 0;
      apiData[i].Discount = 0;
      apiData[i].FinalPrice = 0;
      for (let j = 0; j < ownDbData.length; j++) {
        if (apiData[i].ProductID === ownDbData[j].ProductId && apiData[i].ProductVarientId === ownDbData[j].ProductVarientId && Number(apiData[i].Id) === Number(ownDbData[j].ReferenceId)) {
          apiData[i].ProductPrice = ownDbData[j].BuyingPrice;
          apiData[i].Discount = ownDbData[j].Discount;
          apiData[i].FinalPrice = ownDbData[j].FinalPrice;
          exisitingRecords.push(apiData[i]);
        }
      }
    }
    return exisitingRecords;
  }

  postMultipleInsertion(elements) {
    elements.forEach(element => {
      this.customPriceList = new customPriceList();
      this.customPriceList.priceListId = element.priceListId;
      this.customPriceList.sellerId = element.SellerId;
      this.customPriceList.productId = element.ProductID;
      this.customPriceList.subCategoryId = element.SubCategoryID;
      this.customPriceList.brandId = element.BrandID;
      this.customPriceList.buyingPrice = element.ProductPrice;
      this.customPriceList.finalPrice = element.FinalPrice;
      this.customPriceList.ReferenceId = element.Id;
      this.customPriceList.discount = element.Discount;
      this.customPriceList.availableQuantity = element.AvailableQuantity;
      this.customPriceList.quantity = element.Quantity;
      this.customPriceList.ProductVarientId = element.ProductVarientId;
      this.customPriceList.BrandName = element.BrandName;
      this.customPriceList.Name = element.Name;
      // this.customPriceList.categoryId = this.categoryListData;
      this.isMultipleAmount = true;

      this.customPriceList.finalPrice = Number(element.FinalPrice) * Number(element.AvailableQuantity);
      this.multipleEntries.push(this.customPriceList);

    });
    this.toastr.success('price list saved');
    this.updateAllRecordsCount = 0;
    this.updateAllArray = [];

    this.finalPurchaseOrderArray = this.multipleEntries;
    this.multipleEntriesArray = [];
    this.multipleEntries = [];
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


  checkItemFinalPrice(element) {
    let prevFinalPrice = 0;
    let isRecordValid: boolean = true;
    prevFinalPrice = element.FinalPrice;
    let purchasedQuantity = element.AvailableQuantity;

    if (purchasedQuantity < 1 || (Number(element.ProductPrice) < 1) || (Number(element.FinalPrice) < 1)) {
      isRecordValid = false;
    } else {
      if ((Number(element.ProductPrice) - Number(element.Discount) === Number(element.FinalPrice)) || (Number(element.ProductPrice) - Number(element.Discount) === (Number(element.FinalPrice)) / element.AvailableQuantity)) {
        isRecordValid = true;
      }
      else {
        isRecordValid = false;
      }
    }
    return isRecordValid;
  }


  sendPurchaseOrder() {
    this.emitterService.sendPurchaseOrder.emit(this.finalPurchaseOrderArray);
    this.dialogRef.close();
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
  ngOnDestroy() {
    this.isDataLoaded = false;
  }

}
