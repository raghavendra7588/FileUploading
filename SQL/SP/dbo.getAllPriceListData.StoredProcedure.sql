USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[getAllPriceListData]    Script Date: 03-09-2020 11:24:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getAllPriceListData](@SellerId int) AS
BEGIN
Select * from Mst_PriceList where SellerId=@SellerId;
END 
GO
