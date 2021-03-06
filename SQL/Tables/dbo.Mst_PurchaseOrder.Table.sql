USE [inventory]
GO
/****** Object:  Table [dbo].[Mst_PurchaseOrder]    Script Date: 19-09-2020 01:49:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_PurchaseOrder](
	[PurchaseOrderId] [int] IDENTITY(1,1) NOT NULL,
	[VendorId] [int] NULL,
	[OrderNo] [varchar](255) NULL,
	[OrderDate] [varchar](255) NULL,
	[DeliveryDate] [varchar](255) NULL,
	[ReferenceNo] [varchar](255) NULL,
	[BillingId] [varchar](255) NULL,
	[ShippingId] [varchar](255) NULL,
	[Remarks] [varchar](255) NULL,
	[ItemValue] [varchar](255) NULL,
	[TaxAmount] [varchar](255) NULL,
	[Taxable] [varchar](255) NULL,
	[CESSAmount] [varchar](255) NULL,
	[DocAmount] [varchar](255) NULL,
	[AdvanceAmount] [varchar](255) NULL,
	[AdvanceLedger] [varchar](255) NULL,
	[SellerId] [int] NULL,
	[BatchNumber] [varchar](255) NULL,
	[paymentTerms] [varchar](255) NULL,
	[CreatedAt] [datetime] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
