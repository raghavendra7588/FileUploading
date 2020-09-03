USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[Mst_insertPriceListMaster]    Script Date: 03-09-2020 11:24:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Mst_insertPriceListMaster](
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
IF NOT EXISTS (SELECT ProductId FROM Mst_PriceList WHERE ProductId = @ProductId AND ProductVarientId=@ProductVarientId AND SubCategoryId=@SubCategoryId AND BrandId=@BrandId)
BEGIN
INSERT INTO Mst_PriceList(SellerId,ProductId,SubCategoryId,BrandId,BuyingPrice,FinalPrice,ReferenceId,Discount,ProductVarientId,AvailableQuantity,Quantity,CreatedAt) 
VALUES(@SellerId,@ProductId,@SubCategoryId,@BrandId,@BuyingPrice,@FinalPrice,@ReferenceId,@Discount,@ProductVarientId,@AvailableQuantity,@Quantity,GETDATE())
END
ELSE
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
 WHERE ProductId = @ProductId AND ProductVarientId=@ProductVarientId AND SubCategoryId=@SubCategoryId AND BrandId=@BrandId;
END

END
GO
