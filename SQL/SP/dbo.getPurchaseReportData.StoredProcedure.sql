USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[getPurchaseReportData]    Script Date: 03-09-2020 11:24:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getPurchaseReportData](
	 @vendorId varchar(50),
	 @orderNo varchar(100),
	 @startDate varchar(50),
	 @endDate varchar(50),
	 @sellerId varchar(50)
) AS
BEGIN
IF(@vendorId='ALL' AND @orderNo='ALL' AND @startDate ='ALL' AND @endDate='ALL')
BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where Mst_PurchaseOrder.SellerId=@sellerId
	 AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId;
END

ELSE IF(@vendorId!='ALL' AND @orderNo='ALL' AND @startDate ='ALL' AND @endDate='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.vendorId=CAST(@vendorId as int);
END

ELSE IF(@vendorId!='ALL' AND @orderNo!='ALL' AND @startDate ='ALL' AND @endDate='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.vendorId=CAST(@vendorId as int)
	AND Mst_PurchaseOrder.orderNo=@orderNo;
END

ELSE IF(@vendorId!='ALL' AND @orderNo!='ALL' AND @startDate !='ALL' AND @endDate='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.vendorId=CAST(@vendorId as int)
	AND Mst_PurchaseOrder.orderNo=@orderNo
	AND Mst_PurchaseOrder.OrderDate>=@startDate;
END

ELSE IF(@vendorId!='ALL' AND @orderNo!='ALL' AND @startDate !='ALL' AND @endDate!='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.vendorId=CAST(@vendorId as int)
	AND Mst_PurchaseOrder.orderNo=@orderNo
	AND Mst_PurchaseOrder.OrderDate>=@startDate 
	AND Mst_PurchaseOrder.DeliveryDate<=@endDate;
END

ELSE IF(@vendorId!='ALL' AND @orderNo!='ALL' AND @startDate ='ALL' AND @endDate='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int)
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId 
	AND Mst_PurchaseOrder.vendorId=CAST(@vendorId as int)
	AND Mst_PurchaseOrder.orderNo=@orderNo;
END

ELSE IF(@vendorId!='ALL' AND @orderNo='ALL' AND @startDate !='ALL' AND @endDate='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.vendorId=CAST(@vendorId as int)
	AND Mst_PurchaseOrder.OrderDate>=@startDate;
END

ELSE IF(@vendorId!='ALL' AND @orderNo='ALL' AND @startDate ='ALL' AND @endDate!='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.vendorId=CAST(@vendorId as int)
	AND Mst_PurchaseOrder.DeliveryDate<=@endDate;
END

ELSE IF(@vendorId='ALL' AND @orderNo!='ALL' AND @startDate !='ALL' AND @endDate='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.orderNo=@orderNo
	AND Mst_PurchaseOrder.OrderDate>=@startDate;
END

ELSE IF(@vendorId='ALL' AND @orderNo!='ALL' AND @startDate ='ALL' AND @endDate!='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.orderNo=@orderNo
	AND Mst_PurchaseOrder.DeliveryDate<=@endDate;
END

ELSE IF(@vendorId='ALL' AND @orderNo='ALL' AND @startDate !='ALL' AND @endDate!='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.OrderDate>=@startDate
	AND Mst_PurchaseOrder.DeliveryDate<=@endDate;
END

ELSE
BEGIN
	select 'NODATA';
END

END 

GO
