import { NumberValueAccessor } from '@angular/forms';

export class Vendor {
    sellerId?: string;
    code?: string;
    name?: string;
    underLedger?: string;
    contactPerson?: string;
    category?: string;
    printName?: string;
    subCategory?: string;
    brand?: any;
    gst?: string;
    gstCategory?: string;
    pan?: string;
    distance?: string;
    fileUpload?: any;
    cin?: number;
    registrationDate?: any;
    ifscCode?: number;
    accountNumber?: number;
    bankName?: string;
    branch?: string;
    paymentTerm?: string;
    priceCategory?: string;
    transporter?: string;
    creditLimit?: number;
    agentBroker?: string;
    Address?: string;
    City?: string;
    PinCode?: string;
    Country?: string;
    State?: string;
    Phone?: string;
    Email?: string;
}

export class Test {
    userId: number;
    firstName: string;
}


export class Address {
    id?: string;
    sellerId?: number;
    sellerName?: string;
    billing_address?: string;
    billing_city?: string;
    billing_pinCode?: number;
    billing_country?: string;
    billing_state?: string;
    billing_phone?: number;
    billing_email?: string;
    shipping_address?: string;
    shipping_country?: string;
    shipping_state?: string;
    shipping_city?: string;
    shipping_pinCode?: number;
    shipping_phone?: number;
    shipping_email?: string;
    billingName?: string;
    shippingName?: string;
}

export class PurchaseOrder {
    gstType?: string;
    vendor?: string;
    vendorName?: string;
    email?: string;
    orderNo?: number;
    orderDate?: Date;
    deliveryDate?: Date;
    referenceNo?: number;
    billingNameList?: number;
    billingAddress?: string;
    billingCity?: string;
    billingPhone?: string;
    billingEmail?: string;
    shippingNameList?: number;
    shippingAddress?: string;
    shippingCity?: string;
    shippingPhone?: string;
    shippingEmail?: string;
    BatchNumber?: string;
    tax?: string;
    remarks?: string;
    advanceLedger?: string;
    advanceAmount?: number;
    itemValue?: number;
    taxable?: number;
    taxAmount?: number;
    cessAmount?: number;
    docAmount?: number;
    paymentTerms: string;
    items?: Array<customPriceList>;
}


export class CustomProductList {
    priceListId?: number;
    sellerId?: number;
    productId?: number;
    categoryId?: number;
    subCategoryId?: number;
    brandId?: number;
    ProductPrice?: number;
    FinalPrice?: number;
    ReferenceId?: number;
    Discount?: number;
    AvailableQuantity?: number;
    quantity?: number;
    ProductVarientId?: number;
}



export class PriceList {
    priceListId?: number;
    sellerId?: number;
    productId?: number;
    categoryId?: number;
    subCategoryId?: number;
    brandId?: number;
    buyingPrice?: number;
    finalPrice?: number;
    ReferenceId?: number;
    discount?: number;
    availableQuantity?: number;
    quantity?: number;
    ProductVarientId?: number;
}


export class PurchaseOrderItem {
    SellerId: number;
    ProductId: number;
    SubCategoryId: number;
    BrandId: number;
    BuyingPrice: number;
    FinalPrice: number;
    ReferenceId: number;
    Discount: number;
    PurchaseQuantity: number;
    Quantity: string;
    ProductVarientId: number;
}

export class PurchaseOrderData {
    PurchaseOrderId?: number;
    SellerId?: number;
    VendorId?: string;
    OrderNo?: string;
    OrderDate?: string;
    DeliveryDate?: string;
    ReferenceNo?: string;
    BillingId?: string;
    ShippingId?: string;
    Remarks?: string;
    ItemValue?: string;
    TaxAmount?: string;
    Taxable?: string;
    CESSAmount?: string;
    DocAmount?: string;
    AdvanceAmount?: string;
    AdvanceLedger?: string;
    BatchNumber?: string;
    items?: Array<customPriceList>;
}

export class customPriceList {
    priceListId?: number;
    sellerId?: number;
    productId?: number;
    categoryId?: number;
    subCategoryId?: number;
    brandId?: number;
    buyingPrice?: number;
    finalPrice?: number;
    ReferenceId?: number;
    discount?: number;
    availableQuantity?: number;
    quantity?: number;
    ProductVarientId?: number;
    BrandName?: string;
    Name?: string;
}

export class PurchaseReport {
    vendorId?: string;
    orderNo?: string;
    startDate?: string;
    endDate?: string;
    sellerId?: string;
}

export class PurchaseReportData {
    vendorId?: string;
    orderNo?: string;
    startDate?: string;
    endDate?: string;
    sellerId?: string;
}