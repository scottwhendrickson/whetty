import { useEffect, useRef } from 'react'

const SHOPIFY_DOMAIN = 'ij3skn-c0.myshopify.com'
const SHOPIFY_TOKEN = 'c4d2f7b4bb088369c890c99358d2edde'
const PRODUCT_ID = '9143740694740'

export default function MerchSection() {
  const productRef = useRef(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    function initShopify() {
      const client = window.ShopifyBuy.buildClient({
        domain: SHOPIFY_DOMAIN,
        storefrontAccessToken: SHOPIFY_TOKEN,
      })

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent('product', {
          id: PRODUCT_ID,
          node: productRef.current,
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            product: {
              styles: {
                product: {
                  'background-color': '#252525',
                  'border-radius': '16px',
                  padding: '24px',
                  color: '#ffffff',
                },
                title: {
                  'font-family': 'inherit',
                  'font-size': '1.4rem',
                  color: '#ffffff',
                },
                price: {
                  'font-family': 'inherit',
                  'font-size': '1.2rem',
                  color: '#1db954',
                },
                button: {
                  'font-family': 'inherit',
                  'font-size': '1rem',
                  'font-weight': '600',
                  'background-color': '#c8b89a',
                  color: '#ffffff',
                  'border-radius': '50px',
                  padding: '12px 32px',
                  ':hover': {
                    'background-color': '#d4c4aa',
                  },
                  ':focus': {
                    'background-color': '#d4c4aa',
                  },
                },
              },
              text: {
                button: 'Add to Cart',
              },
            },
            cart: {
              styles: {
                button: {
                  'font-family': 'inherit',
                  'font-size': '1rem',
                  'font-weight': '600',
                  'background-color': '#c8b89a',
                  color: '#ffffff',
                  'border-radius': '50px',
                  ':hover': {
                    'background-color': '#d4c4aa',
                  },
                },
              },
              text: {
                total: 'Subtotal',
                button: 'Checkout',
              },
            },
            toggle: {
              styles: {
                toggle: {
                  'background-color': '#c8b89a',
                  ':hover': {
                    'background-color': '#d4c4aa',
                  },
                  ':focus': {
                    'background-color': '#d4c4aa',
                  },
                },
              },
            },
          },
        })
      })
    }

    // Load Shopify Buy Button SDK if not already loaded
    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      initShopify()
    } else {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js'
      script.onload = initShopify
      document.head.appendChild(script)
    }
  }, [])

  return (
    <section className="merch-section">
      <h2 className="section-title">Merch Store</h2>
      <p className="section-subtitle">Rep the brand. Limited drops.</p>
      <div className="merch-grid">
        <div ref={productRef} className="shopify-product" />
      </div>
    </section>
  )
}
