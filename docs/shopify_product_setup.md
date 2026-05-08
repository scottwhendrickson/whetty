# Shopify Product Setup Guide

Reference for creating products in the Shopify Admin for the Whetty store.

**Store URL:** https://admin.shopify.com/store/whettys-store

---

## Product Fields

### Basic Info

| Field | Description | Example |
|-------|-------------|---------|
| **Title** | Product name | "POP¡ EP T-Shirt" |
| **Description** | Rich text product description | Details, sizing, materials |
| **Media** | Images, videos, or 3D models | Product photos (accepts drag & drop) |
| **Category** | Determines tax rates, improves search/filters | e.g., "Apparel & Accessories" |

### Pricing

| Field | Description | Example |
|-------|-------------|---------|
| **Price** | Selling price | $25.00 |
| **Compare-at** | Original price (shows strikethrough if higher than Price) | $30.00 |
| **Unit price** | Price per unit (optional) | — |
| **Charge tax** | Whether to charge tax | Yes |
| **Cost per item** | Your cost (for profit tracking) | $8.00 |

### Inventory

| Field | Description | Example |
|-------|-------------|---------|
| **Inventory tracked** | Whether to track stock levels | Yes |
| **Quantity** | Stock at each location | 50 |
| **Location** | Fulfillment location | 1 Spy Glass Lane |
| **SKU** | Stock Keeping Unit (internal ID) | WHETTY-TEE-BLK-M |
| **Barcode** | UPC/EAN barcode (optional) | — |
| **Sell when out of stock** | Allow orders when qty is 0 | Off |

### Shipping

| Field | Description | Example |
|-------|-------------|---------|
| **Physical product** | Whether it requires shipping | Yes |
| **Package** | Box dimensions & weight | Store default (8.6 × 5.4 × 1.6 in) |
| **Product weight** | Weight of product | 0.5 lb |
| **Weight unit** | lb, oz, kg, g | lb |
| **Country of origin** | Where product is made | US |
| **HS Code** | Harmonized System code (for international) | — |

### Variants

Use variants for products with multiple options (size, color, etc.)

| Option | Values |
|--------|--------|
| Size | S, M, L, XL, 2XL |
| Color | Black, White, Khaki |

### SEO (Search Engine Listing)

| Field | Description |
|-------|-------------|
| **Page title** | Title shown in Google results |
| **Meta description** | Description shown in Google results |
| **URL handle** | URL slug (e.g., `/products/pop-ep-tee`) |

### Publishing & Organization

| Field | Description | Value |
|-------|-------------|-------|
| **Status** | Active or Draft | Active |
| **Sales Channels** | Where product is available | Online Store, Buy Button |
| **Type** | Product type | Apparel |
| **Vendor** | Brand/vendor name | Whetty |
| **Collections** | Product groupings | Merch, New Arrivals |
| **Tags** | Searchable tags | tshirt, pop-ep, merch |
| **Theme template** | Display template | Default product |

---

## Products to Create

### Product 1: POP¡ EP T-Shirt

| Field | Value |
|-------|-------|
| Title | POP¡ EP T-Shirt |
| Description | TBD |
| Price | TBD |
| Variants | TBD (sizes, colors) |
| Media | TBD (product photos) |
| Category | Apparel & Accessories |
| Status | Active |
| Sales Channels | Online Store, Buy Button |

### Product 2: TBD

| Field | Value |
|-------|-------|
| Title | TBD |
| Description | TBD |
| Price | TBD |
| Variants | TBD |
| Media | TBD |
| Category | TBD |
| Status | Active |
| Sales Channels | Online Store, Buy Button |

---

## After Creating Products

1. Go to **Buy Button** sales channel in Shopify Admin
2. Click **Create a Buy Button**
3. Select the product
4. Customize appearance (use khaki `#c8b89a` to match site theme)
5. Copy the product ID from the generated code
6. Update `frontend/src/components/MerchSection.jsx` with the new product ID

---

## Notes

- Products must be published to the **Buy Button** sales channel to appear on whetty.com
- Shop page shows a countdown until May 8th, 2026 — after that date, products display automatically
- See `docs/shopify_go_live_checklist.md` for payment setup requirements
