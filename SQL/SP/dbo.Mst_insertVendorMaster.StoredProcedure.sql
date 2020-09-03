USE [inventory]
GO
/****** Object:  StoredProcedure [dbo].[Mst_insertVendorMaster]    Script Date: 03-09-2020 11:24:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_insertVendorMaster](
@code VARCHAR(255),
@name VARCHAR(255),
@underLedger VARCHAR(255),
@contactPerson VARCHAR(255),
@printName VARCHAR(255),
@category VARCHAR(255),
@subCategory VARCHAR(255),
@brand VARCHAR(255),
@fileUpload VARCHAR(255),
@gst VARCHAR(255),
@gstCategory VARCHAR(255),
@pan VARCHAR(255),
@registrationDate VARCHAR(255),
@distance VARCHAR(255),
@cin VARCHAR(255),
@priceCategory VARCHAR(255),
@agentBroker VARCHAR(255),
@transporter VARCHAR(255),
@creditLimit VARCHAR(255),
@ifscCode VARCHAR(255),
@accountNumber VARCHAR(255),
@bankName VARCHAR(255),
@branch VARCHAR(255),
@sellerId VARCHAR(50),
@address VARCHAR(255),
@city VARCHAR(255),
@pinCode VARCHAR(255),
@state VARCHAR(255),
@country VARCHAR(255),
@phone VARCHAR(255),
@email VARCHAR(255),
@accountName VARCHAR(255),
@accountType VARCHAR(255),
@creditLimitDays VARCHAR(255)) AS
BEGIN

INSERT INTO Mst_Vendor(code,name,underLedger,contactPerson,printName,category,subCategory,brand,fileUpload,gst,gstCategory,pan,registrationDate,distance,cin,priceCategory,agentBroker,transporter,creditLimit,ifscCode,accountNumber,bankName,branch,sellerId,address,city,pinCode,state,country,phone,email,accountName,accountType,creditLimitDays)
 VALUES(@code,@name,@underLedger,@contactPerson,@printName,@category,@subCategory,@brand,@fileUpload,@gst,@gstCategory,@pan,@registrationDate,@distance,@cin,@priceCategory,@agentBroker,@transporter,@creditLimit,@ifscCode,@accountNumber,@bankName,@branch,@sellerId,@address,@city,@pinCode,@state,@country,@phone,@email,@accountName,@accountType,@creditLimitDays);

END
GO
