USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[getPurchaseReportById]    Script Date: 03-09-2020 11:24:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[getPurchaseReportById](
	 @PurchaseOrderId int
) AS
BEGIN
select ProductId ,'DummyProductName' as ProductName,'DummyBrandName' as BrandName,'DummyName' as Name,BrandId,ProductVarientId,
ReferenceId,BuyingPrice,Discount,FinalPrice,PurchaseQuantity from Mst_PurchaseOrderItem where PurchaseOrderId=@PurchaseOrderId;
END 
GO
