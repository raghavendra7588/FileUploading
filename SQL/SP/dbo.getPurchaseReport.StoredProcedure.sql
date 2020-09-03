USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[getPurchaseReport]    Script Date: 03-09-2020 11:24:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getPurchaseReport](
	 @vendorId varchar(50),
	 @orderNo varchar(100),
	 @startDate varchar(50),
	 @endDate varchar(50)
) AS
BEGIN
	SELECT * 
 	FROM Mst_Vendor
	WHERE vendorId = @vendorId;
END 

GO
