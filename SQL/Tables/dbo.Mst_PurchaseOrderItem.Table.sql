USE [inventory]
GO
/****** Object:  Table [dbo].[Mst_PurchaseOrderItem]    Script Date: 03-09-2020 11:24:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_PurchaseOrderItem](
	[PurchaseOrderItemId] [int] IDENTITY(1,1) NOT NULL,
	[SellerId] [int] NULL,
	[ProductId] [int] NULL,
	[SubCategoryId] [int] NULL,
	[BrandId] [int] NULL,
	[BuyingPrice] [int] NULL,
	[FinalPrice] [int] NULL,
	[ReferenceId] [int] NULL,
	[Discount] [int] NULL,
	[Quantity] [varchar](255) NULL,
	[ProductVarientId] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[PurchaseQuantity] [int] NULL,
	[PurchaseOrderId] [int] NULL,
	[CategoryId] [int] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
