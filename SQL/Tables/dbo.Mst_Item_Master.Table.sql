USE [inventory]
GO
/****** Object:  Table [dbo].[Mst_Item_Master]    Script Date: 19-09-2020 01:49:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_Item_Master](
	[ItemMasterId] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [varchar](255) NULL,
	[UnderGroup] [varchar](255) NULL,
	[BarCode] [varchar](255) NULL,
	[CategoryId] [varchar](255) NULL,
	[SubCategoryId] [varchar](255) NULL,
	[BrandId] [varchar](255) NULL,
	[GstClassification] [varchar](255) NULL,
	[ActiveStatus] [varchar](255) NULL,
	[PurchaseDescription] [varchar](255) NULL,
	[PurchaseMeasurementUnit] [varchar](255) NULL,
	[PurchaseVarient] [varchar](255) NULL,
	[SellingDescription] [varchar](255) NULL,
	[SellingMeasurementUnit] [varchar](255) NULL,
	[SellingVarient] [varchar](255) NULL,
	[ItemType] [varchar](255) NULL,
	[MinimumLevel] [varchar](255) NULL,
	[SerialTracking] [varchar](255) NULL,
	[SellerId] [varchar](255) NULL,
	[PurchasePrice] [money] NULL,
	[PurchaseDiscount] [money] NULL,
	[FinalPurchasePrice] [money] NULL,
	[SellingPrice] [money] NULL,
	[SellingDiscount] [money] NULL,
	[FinalSellingPrice] [money] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
