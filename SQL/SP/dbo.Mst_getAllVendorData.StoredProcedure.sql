USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[Mst_getAllVendorData]    Script Date: 03-09-2020 11:24:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_getAllVendorData] (@SellerId varchar(55)) AS
BEGIN
Select * from Mst_Vendor where SellerId=@SellerId;
END 
GO
