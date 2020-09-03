USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[Mst_purchaseOrderMaster]    Script Date: 03-09-2020 11:24:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_purchaseOrderMaster](
	@PurchaseOrderId INT,
	@VendorId varchar(255) ,
	@OrderNo varchar(255) ,
	@OrderDate varchar(255) ,
	@DeliveryDate varchar(255) ,
	@ReferenceNo varchar(255) ,
	@BillingId varchar(255) ,
	@ShippingId varchar(255) ,
	@Remarks varchar(255) ,
	@ItemValue varchar(255) ,
	@TaxAmount varchar(255) ,
	@Taxable varchar(255) ,
	@CESSAmount varchar(255) ,
	@DocAmount varchar(255) ,
	@AdvanceAmount varchar(255) ,
	@AdvanceLedger varchar(255),
	@SellerId INT
) AS
BEGIN
UPDATE [dbo].[Mst_PurchaseOrder]
   SET [VendorId]=@VendorId,
	[OrderNo]=@OrderNo,
	[OrderDate]=@OrderDate,
	[DeliveryDate]=@DeliveryDate,
	[ReferenceNo]=@ReferenceNo,
	[BillingId]=@BillingId,
	[ShippingId]=@ShippingId,
	[Remarks]=@Remarks,
	[ItemValue]=@ItemValue,
	[Taxable]=@Taxable,
	[TaxAmount]=@TaxAmount,
	[CESSAmount]=@CESSAmount,
	[DocAmount]=@DocAmount,
	[AdvanceAmount]=@AdvanceAmount,
	[AdvanceLedger]=@AdvanceLedger,
	[SellerId]=@SellerId

 WHERE PurchaseOrderId=@PurchaseOrderId;

END 
GO
