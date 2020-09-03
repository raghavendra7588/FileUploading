USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[Mst_insertPurchaseOrderItem]    Script Date: 03-09-2020 11:24:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Mst_insertPurchaseOrderItem](
@PurchaseOrderId int,
@SellerId int,
@ProductId int,
@SubCategoryId int,
@BrandId int,
@BuyingPrice int,
@FinalPrice int,
@ReferenceId int,
@Discount int,
@Quantity VARCHAR(255),
@ProductVarientId int,
@PurchaseQuantity int,
@CategoryId varchar(50))
AS
BEGIN

	insert into Mst_PurchaseOrderItem(PurchaseOrderId,SellerId,ProductId,SubCategoryId,BrandId,BuyingPrice,FinalPrice,ReferenceId,Discount,Quantity,ProductVarientId,CreatedAt,PurchaseQuantity,CategoryId) VALUES
	(@PurchaseOrderId,@SellerId,@ProductId,@SubCategoryId,@BrandId,@BuyingPrice,
	@FinalPrice,@ReferenceId,@Discount,@Quantity,@ProductVarientId,GETDATE(),@PurchaseQuantity,@CategoryId)
END
GO
