# Shopify Go-Live Checklist

This document outlines everything that must be completed in Shopify **before**:
- Adding real products and pricing
- Flipping the nameservers from Wix to AWS Route 53
- Launching whetty.com to the public

---

## 1. Configure Payments (REQUIRED FIRST)

Without this, customers cannot complete purchases.

### Shopify Payments (Recommended)
Go to **Settings → Payments → Shopify Payments → Complete account setup**

You will need:
- [ ] Bank account routing number
- [ ] Bank account number (for payouts)
- [ ] SSN or EIN (identity verification)
- [ ] Date of birth
- [ ] Business type (Individual is fine for an artist)
- [ ] Legal business name

**Transaction fees:** 2.9% + $0.30 per transaction (no additional Shopify fee)

**Payout schedule:** Typically 2 business days after a sale

### PayPal (Optional but recommended)
Go to **Settings → Payments → PayPal** and connect your PayPal account.
Gives customers an additional payment option at checkout.

---

## 2. Configure Shipping (REQUIRED)

Go to **Settings → Shipping and delivery**

- [ ] Set up at least one shipping zone (e.g. United States)
- [ ] Add shipping rates (flat rate, free shipping, or calculated)
- [ ] If using print-on-demand (Printful/Printify), connect their app - they handle fulfillment automatically
- [ ] Set up international shipping if selling outside the US

---

## 3. Configure Taxes (REQUIRED)

Go to **Settings → Taxes and duties**

- [ ] Verify US tax settings are enabled (Shopify auto-calculates most US taxes)
- [ ] Add your state tax registration number if required
- [ ] Review tax-exempt product settings if applicable

---

## 4. Add Real Products (REQUIRED)

Go to **Products → Add product**

For each product:
- [ ] High quality product photos
- [ ] Accurate product title and description
- [ ] Correct pricing (not test prices like $1.50)
- [ ] Variants set up (sizes, colors, etc.)
- [ ] Inventory quantities set
- [ ] Product made available to **Buy Button** sales channel
- [ ] SKU/barcode if applicable

### Print-on-Demand Option
If Whetty doesn't want to manage inventory, consider:
- **Printful** or **Printify** - connect to Shopify, they print and ship on demand
- No upfront inventory cost
- Lower margins but zero fulfillment work

---

## 5. Configure Checkout (RECOMMENDED)

Go to **Settings → Checkout**

- [ ] Set customer account requirements (guest checkout recommended)
- [ ] Add store policies (refund, privacy, terms of service)
- [ ] Customize checkout branding to match Whetty brand colors
- [ ] Set up order confirmation email

---

## 6. Test the Full Purchase Flow (REQUIRED)

Before going live, place a test order:

1. Go to **Settings → Payments → Shopify Payments**
2. Enable **Test mode**
3. Go to the site and add a product to cart
4. Use Shopify's test credit card: `4242 4242 4242 4242`
5. Complete the checkout
6. Verify order appears in Shopify admin
7. Disable test mode when done

---

## 7. Configure the Store Domain in Shopify (REQUIRED)

Go to **Settings → Domains**

- [ ] Add `whetty.com` as a custom domain in Shopify
- [ ] Note: Shopify will provide DNS records needed in Route 53

**Important:** This step and the nameserver flip must be coordinated together.

---

## 8. Update the Buy Button on the Website (REQUIRED)

Once real products are added:
- [ ] Generate new Buy Button codes in Shopify for each product
- [ ] Update `frontend/src/components/MerchSection.jsx` with real product IDs
- [ ] Test locally before pushing to Amplify
- [ ] Push to GitHub to trigger Amplify deployment

---

## 9. Flip Nameservers in Wix (FINAL STEP)

Only do this when everything above is complete and tested.

Go to Wix domain management and replace:
- ~~ns13.wixdns.net~~
- ~~ns12.wixdns.net~~

With AWS Route 53 nameservers:
- ns-1538.awsdns-00.co.uk
- ns-1381.awsdns-44.org
- ns-322.awsdns-40.com
- ns-898.awsdns-48.net

**After flipping:**
- DNS propagation takes up to 48 hours
- Add `whetty.com` custom domain in AWS Amplify Console
- Amplify will auto-provision SSL certificate via ACM
- Site will be live at whetty.com with HTTPS

---

## Go-Live Order of Operations Summary

```
1. Configure Shopify Payments (bank account + identity)
2. Configure shipping rates
3. Verify tax settings
4. Add real products with real pricing and photos
5. Connect print-on-demand if using (Printful/Printify)
6. Test full purchase flow with test credit card
7. Configure checkout branding and policies
8. Update Buy Button product IDs on the website
9. Test site end-to-end on Amplify URL
10. Add whetty.com domain in Amplify Console
11. Flip nameservers in Wix → AWS Route 53
12. Verify site loads on whetty.com with HTTPS
13. 🎉 Live!
```

---

## Current Status

| Item | Status |
|------|--------|
| Shopify store created | ✅ |
| Buy Button sales channel installed | ✅ |
| Test product added (Whetty Bear T-Shirt) | ✅ |
| Buy Button integrated into React site | ✅ |
| Shopify Payments configured | ⏳ Pending |
| Real products added | ⏳ Pending |
| Shipping configured | ⏳ Pending |
| Full purchase flow tested | ⏳ Pending |
| Nameservers flipped to AWS | ⏳ Pending |
| whetty.com live | ⏳ Pending |

---

## References

- [Shopify Payments Setup](https://help.shopify.com/en/manual/payments/shopify-payments/setting-up-shopify-payments)
- [Shopify Buy Button](https://help.shopify.com/en/manual/online-sales-channels/buy-button)
- [Printful + Shopify Integration](https://www.printful.com/integrations/shopify)
- [AWS Amplify Custom Domains](https://docs.amplify.aws/gen2/deploy-and-host/fullstack-branching/custom-domains/)
