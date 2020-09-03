USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[Mst_updatePriceListMaster]    Script Date: 03-09-2020 11:24:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Mst_updatePriceListMaster](
@PriceListId int,
@SellerId int,
@ProductId int,
@SubCategoryId int,
@BrandId int,
@BuyingPrice int,
@FinalPrice int,
@ReferenceId int,
@Discount int,
@ProductVarientId int,
@AvailableQuantity varchar(255),
@Quantity varchar(255)
) AS
BEGIN
UPDATE [dbo].[Mst_PriceList]
   SET
      [SellerId] = @SellerId,
      [ProductId] = @ProductId,
      [SubCategoryId] = @SubCategoryId,
      [BrandId] = @BrandId,
      [BuyingPrice] = @BuyingPrice,
      [FinalPrice] = @FinalPrice,
      [ReferenceId] = @ReferenceId,
      [Discount] = @Discount,
	  [ProductVarientId]=@ProductVarientId,
      [AvailableQuantity] = @AvailableQuantity,
      [Quantity] = @Quantity
 WHERE PriceListId=@PriceListId;

END 
GO
