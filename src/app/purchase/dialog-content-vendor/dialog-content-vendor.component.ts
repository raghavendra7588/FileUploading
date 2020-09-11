import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { Vendor, Address } from '../purchase.model';
import { LoginService } from 'src/app/login/login.service';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NumberValueAccessor } from '@angular/forms';
import { EmitterService } from 'src/shared/emitter.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-dialog-content-vendor',
  templateUrl: './dialog-content-vendor.component.html',
  styleUrls: ['./dialog-content-vendor.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS
    }
  ]
})
export class DialogContentVendorComponent implements OnInit, OnDestroy {

  panelOpenState = false;

  categorySettings = {};
  subCategorySettings = {};
  brandSettings = {};




  documents: any;
  labelPosition: 'before' = 'before';
  selectedTerm: any;
  selectedCategory: any;
  selectedTransporter: any;
  vendor: Vendor = new Vendor();
  paymentTerm: any;
  paymentCategory: any;
  transporters: any;
  subCategories: any = [];
  subProducts: any = [];
  selectedSubCategoriesId: any = [];
  getEveryBrandItem: any = [];
  filteredBrandItem: any = [];
  public multipleBrandArray: any = [];
  array1: any = [];
  array2: any = [];
  array3: any = [];
  fullDate: any;
  fileData: File = null;
  fileName: any;
  isFileUploaded: boolean = false;
  subCategoriesArray: any = [];
  categoriesArray: any = [];
  brandArray: any = [];
  maxLengthGst = 15;
  maxLengthPan = 10;
  maxLengthAccountNumber = 18;
  maxLengthIfsc = 11;
  maxLengthCin = 21;
  maxLengthPinCode = 6;
  maxLengthPhone = 10;
  datePicker: any;
  formattedDate: any;
  parentid = 3;
  SubCategoryId: string;
  vendorData: any;
  isImageUploaded: boolean;
  isDateSelected: boolean;
  getAddressData: Address;
  multipleCategoriesArray: any = [];
  categoriesArray1: any = [];
  categoriesArray2: any = [];
  categoriesArray3: any = [];
  currentBillingId: string;
  currentShippingId: string;
  storageSellerId: number;
  maxDate: any;
  uniqueBrandNamesArray: any = [];
  anyArray: any = [];
  subCategoryNamesArray: any = [];
  masterBrandData: any = [];
  vendorDetails: any = [];
  selectedBrandArray: any = [];
  selectedSubCategoryArray: any = [];
  selectedCategoryArray: any = [];
  selectedBrandString: string;
  selectedSubCategoryString: string;
  selectedCategoryString: string;
  finalBrandArray: any = [];
  multipleBrands: any = [];
  brands1: any = [];
  brands2: any = [];
  brands3: any = [];
  subCategoryForm: FormControl;
  saveVendorForm: FormGroup;
  AccountType: any;

  selectedItems = [];
  dropdownSettings = {};
  dataList = [];

  selectedCategoryIdArray: any = [];
  selectedSubCategoryIdArray: any = [];
  selectedBrandIdArray: any = [];
  sellerName: string;
  sellerId: any;
  categoryId: any;
  AllCategoryArray: any = [];
  AllSubCategoryArray: any = [];

  constructor(public purchaseService: PurchaseService,
    public loginService: LoginService,
    public toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public router: Router,
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogContentVendorComponent>) {
    this.sellerName = sessionStorage.getItem('sellerName');
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
    // this.itemMaster.sellerId = sessionStorage.getItem('sellerId').toString();
    this.loginService.seller_object.categories = JSON.parse(sessionStorage.getItem('categories'));
    let sortedData = this.sortArrayInAscendingOrder(this.loginService.seller_object.categories);
    this.loginService.seller_object.categories = [];
    this.loginService.seller_object.categories = sortedData;
    this.vendorData = data;
    this.categorySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.subCategorySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.brandSettings = {
      singleSelection: false,
      idField: 'BrandID',
      textField: 'BrandName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 1,
      allowSearchFilter: true
    };
    this.getAddressDetails();
    this.getMasterBrandData();
    this.getVendorData();
    if (this.vendorData) {
      this.isImageUploaded = true;
      // this.selectedBrandString = this.vendorData.brand;
      // this.selectedSubCategoryString = this.vendorData.subCategory;
      this.selectedCategoryString = this.vendorData.category;

      let categoryString = this.selectedCategoryString;
      this.selectedCategoryArray = categoryString.split(",");
      let preSelectedCategoryArray = this.selectedCategoryArray.map(Number);
      // this.vendor.category = preSelectedCategoryArray;
      // console.log('check', this.vendor.category);
      let customCategoryList: any = [];
      let itemData;
      this.vendor.category = [{
        descriptions: "Groceries",
        id: "3",
        imageurl: "20190811144816_grocery.jpeg",
        isactive: "True",
        isparent: "True",
        name: "Grocery",
        parentcategoryname: "",
        parentid: "0",
        userid: ""
      }];
  
      // this.loginService.seller_object.categories.filter(item => {
      //   if (preSelectedCategoryArray.includes(Number(item.id))) {
      //     console.log('item', item);
      //     itemData = item;
      //     itemData = { item_id: item.id, item_text: item.name }
      //     customCategoryList.push(itemData);
      //     this.vendor.category = customCategoryList;
      //     console.log('preselected ***', customCategoryList);
      //   }
      // });
      // console.log('preselected categry', preSelectedCategoryArray);
      // // let string = this.selectedBrandString;
      // this.selectedBrandArray = string.split(",");
      // var preSelectedBrandArray = this.selectedBrandArray.map(Number);
      // console.log('brand array', preSelectedBrandArray);
      // console.log('vendor data', this.vendorDetails);
      // let filteredArray1 = this.vendorDetails.filter(el => {
      //   return preSelectedBrandArray.indexOf(el.brand) !== -1;
      // });
      // console.log('after brand array', filteredArray1);

      // this.selectedSubCategoryArray = this.selectedSubCategoryString.split(",");

    }

    this.saveVendorForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      code: [''],
      underLedger: [''],
      contactPerson: [''],
      PrintName: [''],
      category: [''],
      subCategory: [''],
      brand: [''],
      gst: [''],
      pan: [''],
      gstCategory: [''],
      datePicker: [''],
      distance: [''],
      cin: [''],
      creditLimitDays: [''],
      priceCategory: [''],
      selectedTransporter: [''],
      agentBroker: [''],
      creditLimit: [''],
      ifscCode: [''],
      accountNumber: [''],
      bankName: [''],
      branch: [''],
      inputFiles: [''],
      address: [''],
      city: [''],
      state: [''],
      pinCode: [''],
      country: [''],
      phone: [''],
      email: [''],
      accountName: [''],
      accountType: ['']
    });
    this.assignData();

  }

  ngOnInit(): void {

    this.vendor.sellerId = sessionStorage.getItem('sellerId');
    // this.sellerId = sessionStorage.getItem('sellerId');
    // this.maxDate = new Date();

    // this.loginService.seller_object.categories = JSON.parse(sessionStorage.getItem('categories'));
    // let data = this.sortArrayInAscendingOrder(this.loginService.seller_object.categories);
    // this.loginService.seller_object.categories = [];
    // this.loginService.seller_object.categories = data;

    /////

    // this.objSeller = JSON.parse(sessionStorage.getItem('categories'));


    this.paymentCategory = [
      { id: 0, title: 'Not Applicable' },
      { id: 1, title: 'Scheme' },
      { id: 2, title: 'Non Scheme' },
    ];

    this.transporters = [
      { id: 0, title: 'Not Applicable' },
      { id: 1, title: 'From Vendor' },
      { id: 2, title: 'Own' },
    ];

    this.AccountType = [
      { id: 0, title: 'Saving' },
      { id: 1, title: 'Current' },
      { id: 2, title: 'Other' },
    ];

    this.isImageUploaded = false;

    this.vendor.Country = 'India';


  }

  selectedBillingAddress(event, adr) {
    this.currentBillingId = adr.id.toString();
  }

  selectedShippingAddress(event, address) {
    this.currentShippingId = address.id.toString();
  }



  onCategorySelectAll() {
  

    // this.uniqueBrandNamesArray = this.createUniqueBrandName(this.multipleBrandArray);
    // this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);

    this.purchaseService.getEveryBrand().subscribe(data => {
     
      this.AllCategoryArray = data;

      let uniqueBrandName = this.createUniqueBrandName(this.AllCategoryArray);
      this.anyArray = this.sortUniqueBrandName(uniqueBrandName);

    });

  }

  onCategorySelectAllList(event) {
    console.log('select all', event);
  }
  onCategoryDeSelectAll(event) {
    console.log('disselect all', event);
  }

  onSubCategorySelectAll() {

  
    this.purchaseService.getEachBrand(this.categoryId.toString(), '0').subscribe(data => {
      this.AllSubCategoryArray = data;
      let uniqueBrands = this.createUniqueBrandName(this.AllSubCategoryArray);
      this.anyArray = this.sortUniqueBrandName(uniqueBrands);
    });
  }

  onBrandSelectAll() {
    console.log();
  }


  onCategorySelect(event) {

    this.selectedCategoryIdArray.push(event.id);
    // console.log('selected CATE ID', this.selectedCa  tegoryIdArray);

    // this.purchaseService.getAllSubCategories(event.id).subscribe(data => {
    //   if (this.multipleCategoriesArray.length === 0) {
    //     this.multipleCategoriesArray = data;
    //     let sortedCategory = this.sortArrayInAscendingOrder(this.multipleCategoriesArray);
    //     this.multipleCategoriesArray = [];
    //     this.multipleCategoriesArray = sortedCategory;

    //   }
    //   else {
    //     this.categoriesArray2 = data;
    //     this.categoriesArray3 = [...this.multipleCategoriesArray, ...this.categoriesArray2];
    //     this.multipleCategoriesArray = this.categoriesArray3;
    //     let sortedCategories = this.sortArrayInAscendingOrder(this.multipleCategoriesArray);
    //     this.multipleCategoriesArray = [];
    //     this.multipleCategoriesArray = sortedCategories;

    //   }
    // });



    this.purchaseService.getAllSubCategories(event.id).subscribe(data => {

      if (this.multipleCategoriesArray.length === 0) {
        this.multipleCategoriesArray = data;
        let sortedSubCategory = this.sortArrayInAscendingOrder(this.multipleCategoriesArray);
        this.multipleCategoriesArray = [];
        this.multipleCategoriesArray = sortedSubCategory;
      }
      else {
        this.categoriesArray2 = data;
        this.categoriesArray3 = [...this.multipleCategoriesArray, ...this.categoriesArray2];
        this.multipleCategoriesArray = this.categoriesArray3;
        let sortedSubCategory = this.sortArrayInAscendingOrder(this.multipleCategoriesArray);
        this.multipleCategoriesArray = [];
        this.multipleCategoriesArray = sortedSubCategory;
      }
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
      this.selectedSubCategoryIdArray = [];
      this.selectedBrandIdArray = [];
      // this.dataSource = [];
    }

    const index = this.selectedCategoryIdArray.indexOf(event.id);
    if (index > -1) {
      this.selectedCategoryIdArray.splice(index, 1);
    }
 
  }




  onSubCategorySelect(event, data) {

    this.selectedSubCategoryIdArray.push(event.id);

    // this.purchaseService.getAllBrand(data[0].parentid, event.id).subscribe(data => {
    //   if (this.multipleBrandArray.length === 0) {
    //     this.multipleBrandArray = data;
    //     // this.catchMappedData = this.mapObj(this.multipleBrandArray, this.dbData);
    //     // // this.multipleBrandArray = this.catchMappedData;
    //   }
    //   else {
    //     this.array2 = data;
    //     this.array2 = this.mapObj(this.array2, this.dbData);
    //     this.array3 = [...this.catchMappedData, ...this.array2];
    //     this.catchMappedData = this.array3;
    //   }
    //   this.uniqueBrandNamesArray = this.createUniqueBrandName(this.catchMappedData);
    //   this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
    //   this.multipleBrandArray = this.catchMappedData;

    // });

    this.purchaseService.getAllBrand(data[0].parentid, event.id).subscribe(data => {
      if (this.multipleBrandArray.length === 0) {
        this.multipleBrandArray = data;
      }
      else {
        this.array2 = data;
        this.array3 = [...this.multipleBrandArray, ...this.array2];
        this.multipleBrandArray = this.array3;
      }
      this.uniqueBrandNamesArray = this.createUniqueBrandName(this.multipleBrandArray);
      this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
      this.subCategoryNamesArray = this.multipleBrandArray;
    });
  }

  onSubCategoryDeSelect(event) {
   
    // let newArr = [];
    // console.log(' before sub category un selected ', this.anyArray);
    // newArr = this.anyArray.filter(function (item) {
    //   return Number(item.SubCategoryID) !== Number(event.id);
    // });
    // this.anyArray = [];
    // this.anyArray = newArr;
    // console.log(' after sub category un selected ', this.anyArray);
    // let unSelectedSubCategoryArray = this.finalBrandArray.filter(function (item) {
    //   return Number(item.SubCategoryID) !== Number(event.id);
    // });
    // this.finalBrandArray = unSelectedSubCategoryArray;


   
    let newArr = this.anyArray.filter(function (item) {
      return Number(item.SubCategoryID) != Number(event.id);
    });
    this.anyArray = [];
    this.anyArray = newArr;
    const subCategoryIndex = this.selectedSubCategoryIdArray.indexOf(event.id);
    if (subCategoryIndex > -1) {
      this.selectedSubCategoryIdArray.splice(subCategoryIndex, 1);
    }

    if (this.multipleCategoriesArray.length === 0) {
      this.anyArray = [];
    }
  
  }


  onBrandSelect(event) {

    this.selectedBrandIdArray.push(event.BrandID);
    
    if (this.finalBrandArray.length === 0) {
      let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
        return item.BrandName.trim() === event.BrandName;
      });
      let sortedBrandArray = this.sortUniqueBrandName(filteredBrandArray);
      this.finalBrandArray = sortedBrandArray;
     
    }
    else {
      this.brands1 = this.multipleBrandArray.filter(function (item) {
        return item.BrandName.trim() === event.BrandName;
      });
      this.brands2 = this.brands1;
      this.brands3 = [...this.finalBrandArray, ...this.brands2];
      this.finalBrandArray = this.brands3;
     
    }
  }

  onBrandDeSelect(event) {

    // var tempArr = this.finalBrandArray.filter(function (item) {
    //   return item.BrandName.trim() != event.BrandName.trim();
    // });
    // this.finalBrandArray = tempArr;
    // // this.dataSource = new MatTableDataSource(this.finalBrandArray);
    // // this.dataSource.paginator = this.paginator;

    // const brandIndex = this.selectedBrandIdArray.indexOf(event.BrandID);
    // if (brandIndex > -1) {
    //   this.selectedBrandIdArray.splice(brandIndex, 1);
    // }


    let tempArr = this.finalBrandArray.filter(function (item) {
      return item.BrandName.trim() != event.BrandName;
    });
    this.finalBrandArray = tempArr;


    const brandIndex = this.selectedBrandIdArray.indexOf(event.BrandID);
    if (brandIndex > -1) {
      this.selectedBrandIdArray.splice(brandIndex, 1);

    }
    // var tempArr = this.finalBrandArray.filter(function (item) {
    //   return item.BrandName.trim() != product.BrandName;
    // });
    // this.finalBrandArray = tempArr;
    // const index = this.brandArray.indexOf(product.ProductID);
    // if (index > -1) {
    //   this.brandArray.splice(index, 1);
    // }
  }


  onCategoriesChange(event, category: any) {
    this.categoryId = category.id;
    this.selectedCategoryIdArray = [];
    this.selectedCategoryIdArray.push(category.id);

    if (event.isUserInput) {
      if (event.source.selected) {
        this.categoriesArray.push(category.id);
        this.purchaseService.getAllSubCategories(category.id).subscribe(data => {

          if (this.multipleCategoriesArray.length === 0) {
            this.multipleCategoriesArray = data;
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
      const index = this.categoriesArray.indexOf(category.id);
      if (index > -1) {
        this.categoriesArray.splice(index, 1);
      }



    }
  }

  onSubCategoriesChange(event, subCategory: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.selectedSubCategoryIdArray = [];
        this.selectedSubCategoryIdArray.push(subCategory.id);
      
        this.purchaseService.getAllBrand(subCategory.parentid, subCategory.id).subscribe(data => {
          if (this.multipleBrandArray.length < 2 && this.array3 < 1) {
            this.multipleBrandArray = data;
          }
          else {
            this.array2 = data;
            this.array3 = [...this.multipleBrandArray, ...this.array2];
            this.multipleBrandArray = this.array3;
          }
          this.uniqueBrandNamesArray = this.createUniqueBrandName(this.multipleBrandArray);
          this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
          this.subCategoryNamesArray = this.multipleBrandArray;
        });
      }
    }
    if (!event.source.selected) {
      var newArr = this.multipleBrandArray.filter(function (item) {
        return item.SubCategoryID != subCategory.id;
      });
      this.multipleBrandArray = newArr;
      const index = this.subCategoriesArray.indexOf(subCategory.id);
      if (index > -1) {
        this.subCategoriesArray.splice(index, 1);
      }
    }
  }



  onProductChange(event, product: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.selectedBrandIdArray = [];
        this.selectedBrandIdArray.push(product.BrandID);
        if (this.finalBrandArray.length === 0) {
          let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
            return item.BrandName.trim() === product.BrandName
          });
          let selectedBrandId = filteredBrandArray[0].BrandID;
          this.brandArray.push(selectedBrandId);

        }
        else {
          this.brands1 = this.multipleBrandArray.filter(function (item) {
            return item.BrandName.trim() === product.BrandName
          });
          this.brands2 = this.brands1;
          this.brands3 = [...this.finalBrandArray, ...this.brands2];
          this.finalBrandArray = this.brands3;
        }

      }
      if (!event.source.selected) {

        var tempArr = this.finalBrandArray.filter(function (item) {
          return item.BrandName.trim() != product.BrandName;
        });
        this.finalBrandArray = tempArr;
        const index = this.brandArray.indexOf(product.ProductID);
        if (index > -1) {
          this.brandArray.splice(index, 1);
        }

      }
    }
  }


  valueChanged() {
    let date = new Date(this.vendor.registrationDate);
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")

    const day = `${date.getDate()}`.padStart(2, "0")

    const stringDate = [day, month, year].join("/");
    this.fullDate = stringDate;
    return this.fullDate
  }

  selectedSubCategory() {
    // console.log(this.vendor.subCategory);
  }


  onBrandChange() {
    // console.log('inside brand');
  }

  selectePaymentTerm() {
    // console.log(this.vendor.paymentTerm);

  }

  selectePriceCategory() {
    // console.log(this.vendor.priceCategory);
  }

  selectedTransporterDetail() {
    // console.log(this.vendor.transporter);
  }


  onFileSelect(e: any): void {
    this.fileData = <File>e.target.files[0];
    this.vendor.fileUpload = e.target.files[0].name;
    this.isImageUploaded = true;
  }


  saveVendor() {
    const formData = new FormData();
    if (this.isImageUploaded) {
      formData.append('File', this.fileData, this.vendor.fileUpload);
      formData.append('FileName', this.vendor.fileUpload);
    }


    if (this.vendorData) {
      formData.append('vendorId', this.vendorData.vendorId);
    }
    else {

      formData.append('vendorId', '0');
    }


    if (this.vendor.name === null || this.vendor.name === undefined || this.vendor.name === '') {
      formData.append('name', 'NULL');
    }
    else {
      formData.append('name', this.vendor.name);
    }


    if (this.vendor.code === null || this.vendor.code === undefined || this.vendor.code === '') {
      formData.append('code', 'NULL');
    }
    else {
      formData.append('code', this.vendor.code);
    }

    if (this.vendor.underLedger === null || this.vendor.underLedger === undefined || this.vendor.underLedger === '') {
      formData.append('underLedger', 'NULL');
    }
    else {
      formData.append('underLedger', this.vendor.underLedger);
    }

    if (this.vendor.contactPerson === null || this.vendor.contactPerson === undefined || this.vendor.contactPerson === '') {
      formData.append('contactPerson', 'NULL');
    }
    else {
      formData.append('contactPerson', this.vendor.contactPerson);
    }


    if (this.vendor.printName === null || this.vendor.printName === undefined || this.vendor.printName === '') {
      formData.append('printName', 'NULL');
    }
    else {
      formData.append('printName', this.vendor.printName);
    }

    // let brandStr = '';
    // brandStr = this.selectedBrandIdArray.toString();



    // if (this.vendor.category === null || this.vendor.category === undefined || this.vendor.category === '') {
    //   formData.append('category', "NULL");
    // }
    // else {

    //   // formData.append('category', categoryStr);
    // }
    // if (this.vendor.subCategory === null || this.vendor.subCategory === undefined || this.vendor.subCategory === '') {
    //   formData.append('subCategory', "NULL");
    // }
    // else {

    //   // formData.append('subCategory', SubCategorystr);
    // }
    // if (this.vendor.brand === null || this.vendor.brand === undefined || this.vendor.brand === '') {
    //   formData.append('brand', "NULL");
    // }
    // else {
    //   // formData.append('brand', brandStr);
    // }

    if (this.vendor.gst === null || this.vendor.gst === undefined || this.vendor.gst === '') {
      formData.append('gst', 'NULL');
    }
    else {
      formData.append('gst', this.vendor.gst);
    }

    if (this.vendor.gstCategory === null || this.vendor.gstCategory === undefined || this.vendor.gstCategory === '') {
      formData.append('gstCategory', 'NULL');
    }
    else {
      formData.append('gstCategory', this.vendor.gstCategory);
    }


    if (this.vendor.pan === null || this.vendor.pan === undefined || this.vendor.pan === '') {
      formData.append('pan', 'NULL');
    }
    else {
      formData.append('pan', this.vendor.pan);
    }

    if (this.vendor.registrationDate === null || this.vendor.registrationDate === undefined) {
      formData.append('registrationDate', 'NULL');
    }
    else {
      this.fullDate = this.valueChanged();
      formData.append('registrationDate', this.fullDate.toString());
    }

    if (this.vendor.distance === null || this.vendor.distance === undefined || this.vendor.distance === '') {
      formData.append('distance', 'NULL');
    }
    else {
      formData.append('distance', this.vendor.distance);
    }

    if (this.vendor.cin === null || this.vendor.cin === undefined) {
      formData.append('cin', "0");
    }
    else {
      formData.append('cin', this.vendor.cin.toString());
    }

    if (this.vendor.creditLimitDays === null || this.vendor.creditLimitDays === undefined || this.vendor.creditLimitDays === '') {
      formData.append('creditLimitDays', "0");
    }
    else {
      formData.append('creditLimitDays', this.vendor.creditLimitDays);
    }


    if (this.vendor.priceCategory === null || this.vendor.priceCategory === undefined || this.vendor.priceCategory === '') {
      formData.append('priceCategory', 'NULL');
    }
    else {
      formData.append('priceCategory', this.vendor.priceCategory);
    }


    if (this.vendor.transporter === null || this.vendor.transporter === undefined || this.vendor.transporter === '') {
      formData.append('transporter', 'NULL');
    }
    else {
      formData.append('transporter', this.vendor.transporter);
    }


    if (this.vendor.agentBroker === null || this.vendor.agentBroker === undefined || this.vendor.agentBroker === '') {
      formData.append('agentBroker', 'NULL');
    }
    else {
      formData.append('agentBroker', this.vendor.agentBroker);
    }


    if (this.vendor.agentBroker === null || this.vendor.creditLimit === undefined) {
      formData.append('creditLimit', "0");
    }
    else {
      formData.append('creditLimit', this.vendor.creditLimit.toString());
    }


    if (this.vendor.ifscCode === null || this.vendor.ifscCode === undefined) {
      formData.append('ifscCode', 'NULL');
    }
    else {
      formData.append('ifscCode', this.vendor.ifscCode.toString());
    }


    if (this.vendor.bankName === null || this.vendor.bankName === undefined || this.vendor.bankName === '') {
      formData.append('bankName', 'NULL');
    }
    else {
      formData.append('bankName', this.vendor.bankName);
    }


    if (this.vendor.branch === null || this.vendor.branch === undefined || this.vendor.branch === '') {
      formData.append('branch', 'NULL');
    }
    else {
      formData.append('branch', this.vendor.branch);
    }


    if (this.vendor.accountNumber === null || this.vendor.accountNumber === undefined) {
      formData.append('accountNumber', "0");
    }
    else {
      formData.append('accountNumber', this.vendor.accountNumber.toString());
    }



    if (this.vendor.Address === null || this.vendor.Address === undefined || this.vendor.Address === '') {
      formData.append('address', 'NULL');
    }
    else {
      formData.append('address', this.vendor.Address);
    }



    if (this.vendor.City === null || this.vendor.City === undefined || this.vendor.City === '') {

      formData.append('city', 'NULL');
    }
    else {
      formData.append('city', this.vendor.City);
    }

    if (this.vendor.State === null || this.vendor.State === undefined || this.vendor.State === '') {

      formData.append('state', 'NULL');
    }
    else {
      formData.append('state', this.vendor.State);
    }


    if (this.vendor.PinCode === null || this.vendor.PinCode === undefined || this.vendor.PinCode === '') {

      formData.append('pinCode', 'NULL');
    }
    else {
      formData.append('pinCode', this.vendor.PinCode);
    }

    if (this.vendor.Country === null || this.vendor.Country === undefined || this.vendor.Country === '') {

      formData.append('country', 'NULL');
    }
    else {
      formData.append('country', this.vendor.Country);
    }

    if (this.vendor.Phone === null || this.vendor.Phone === undefined || this.vendor.Phone === '') {
      formData.append('phone', 'NULL');
    }
    else {
      formData.append('phone', this.vendor.Phone);
    }

    if (this.vendor.Email === null || this.vendor.Email === undefined || this.vendor.Email === '') {
      formData.append('email', 'NULL');
    }
    else {
      formData.append('email', this.vendor.Email);
    }

    if (this.vendor.accountName === null || this.vendor.accountName === undefined || this.vendor.accountName === '') {
      formData.append('accountName', 'NULL');
    }
    else {
      formData.append('accountName', this.vendor.accountName);
    }

    if (this.vendor.accountType === null || this.vendor.accountType === undefined || this.vendor.accountType === '') {
      formData.append('accountType', 'NULL');
    }
    else {
      formData.append('accountType', this.vendor.accountType);
    }



    let categoriesValue = this.saveVendorForm.get('category').value;
    let subCategoriesValue = this.saveVendorForm.get('subCategory').value;
    let brandValue = this.saveVendorForm.get('brand').value;

    if (categoriesValue === undefined) {
      formData.append('category', "NULL");
    } else {
      let categoryStr = '';
    
      // let nonDuplicateCategory = [... new Set(this.selectedCategoryIdArray)];
      categoryStr = this.selectedCategoryIdArray.toString();
      
      formData.append('category', categoryStr.toString());
    }

    if (subCategoriesValue === undefined || subCategoriesValue === null || subCategoriesValue === '') {
      formData.append('subCategory', "NULL");
    } else {
      let SubCategorystr = '';
      let nonDuplicateSubCategory = [... new Set(this.selectedSubCategoryIdArray)];
      SubCategorystr = nonDuplicateSubCategory.toString();
      formData.append('subCategory', SubCategorystr);

    }


    if (brandValue === undefined || brandValue === null || brandValue === '') {
      formData.append('brand', "NULL");
    } else {
      let brandStr = '';
      let nonDuplicateBrand = [... new Set(this.selectedBrandIdArray)];
      brandStr = nonDuplicateBrand.toString();
      formData.append('brand', brandStr);
    }

    formData.append('sellerId', this.vendor.sellerId);
    this.purchaseService.saveVendorMaster(formData).subscribe(data => {
      this.toastr.success('Vendor added Successfully!');
      this.emitterService.isVendorMasterUpdated.emit(true);
      this.dialogRef.close();
    });

  }

  assignData() {
    if (this.vendorData) {
     
      this.vendor.code = this.vendorData.code;
      this.vendor.underLedger = this.vendorData.underLedger;
      this.vendor.name = this.vendorData.name;
      this.vendor.contactPerson = this.vendorData.contactPerson;
      this.vendor.printName = this.vendorData.printName;
      this.vendor.gst = this.vendorData.gst;
      this.vendor.category = this.vendorData.category;
      this.vendor.subCategory = this.vendorData.subCategory;
      this.purchaseService.allBrandData.filter(data => {
        if (Number(data.BrandID) === Number(this.vendorData.brand) && Number(data.SubCategoryID) === Number(this.vendorData.subCategory)) {
    
          this.vendor.brand = data.BrandName;
        }
      });
      
      this.vendor.brand = this.vendorData.brand;
      this.vendor.gstCategory = this.vendorData.gstCategory;
      this.vendor.pan = this.vendorData.pan;
      this.vendor.distance = this.vendorData.distance;
      this.vendor.cin = this.vendorData.cin;
      this.vendor.creditLimitDays = this.vendorData.creditLimitDays;
      this.vendor.priceCategory = this.vendorData.priceCategory;
      this.vendor.transporter = this.vendorData.transporter;
      if (this.vendorData.registrationDate !== 'NULL' || this.vendorData.registrationDate === '') {
        this.vendor.registrationDate = this.vendorData.registrationDate;
        let dateString = this.vendorData.registrationDate;
        let dateParts = dateString.split("/");
        let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        this.vendor.registrationDate = dateObject;
      }
      else {
        this.vendorData.registrationDate = '';
      }

      this.vendor.agentBroker = this.vendorData.agentBroker;
      this.vendor.creditLimit = this.vendorData.creditLimit;
      this.vendor.ifscCode = this.vendorData.ifscCode;
      this.vendor.accountNumber = this.vendorData.accountNumber;
      this.vendor.bankName = this.vendorData.bankName;
      this.vendor.branch = this.vendorData.branch;
      this.vendor.Address = this.vendorData.address;
      this.vendor.City = this.vendorData.city;
      this.vendor.PinCode = this.vendorData.pinCode;
      this.vendor.State = this.vendorData.state;
      this.vendor.Country = this.vendorData.country;
      this.vendor.Phone = this.vendorData.phone;
      this.vendor.Email = this.vendorData.email;
      this.vendor.accountType = this.vendorData.accountType;
    }

  }

  getAddressDetails() {
    this.purchaseService.getAddressData().subscribe(data => {
      this.getAddressData = data;
    });
  }

  getMasterBrandData() {
    this.purchaseService.getEveryBrand().subscribe(data => {
      this.masterBrandData = data;
    });
  }

  getVendorData() {
    this.purchaseService.getAllVendorData().subscribe(data => {
      this.vendorDetails = data;
    });
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


  // mapObj(apiData, ownDbData) {
  //   for (let i = 0; i < apiData.length; i++) {
  //     apiData[i].ProductPrice = 0;
  //     apiData[i].Discount = 0;
  //     apiData[i].FinalPrice = 0;
  //     for (let j = 0; j < ownDbData.length; j++) {
  //       if (apiData[i].ProductID === ownDbData[j].ProductId && apiData[i].ProductVarientId === ownDbData[j].ProductVarientId) {
  //         apiData[i].ProductPrice = ownDbData[j].BuyingPrice;
  //         apiData[i].Discount = ownDbData[j].Discount;
  //         apiData[i].FinalPrice = ownDbData[j].FinalPrice;
  //       }
  //     }
  //   }
  //   return apiData;
  // }

  // createUniqueBrandName(array: any) {
  //   let sortedArray: Array<any> = [];
  //   for (let i = 0; i < array.length; i++) {
  //     if ((sortedArray.findIndex(p => p.BrandName.trim() == array[i].BrandName.trim())) == -1) {
  //       var item = { BrandName: array[i].BrandName.trim(), SubCategoryID: array[i].SubCategoryID, BrandID: array[i].BrandID }
  //       sortedArray.push(item);
  //     }
  //   }
  //   return sortedArray;
  // }



  ngOnDestroy() {
    this.isImageUploaded = false;
  }

}
