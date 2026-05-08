import { useEffect, useRef } from 'react'

const SHOPIFY_DOMAIN = 'ij3skn-c0.myshopify.com'
const SHOPIFY_TOKEN = 'c4d2f7b4bb088369c890c99358d2edde'

const PRODUCTS = [
  { id: '9161920741588', name: "Men's Tee" },
  { id: '9163249713364', name: "Women's Tee" },
]

export default function MerchSection() {
  const initialized = useRef(false)
  const productRefs = useRef([])

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    function initShopify() {
      const client = window.ShopifyBuy.buildClient({
        domain: SHOPIFY_DOMAIN,
        storefrontAccessToken: SHOPIFY_TOKEN,
      })

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        PRODUCTS.forEach((product, index) => {
          if (!productRefs.current[index]) return
          ui.createComponent('product', {
            id: product.id,
            node: productRefs.current[index],
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: {
              product: {
                styles: {
                  product: {
                    '@media (min-width: 601px)': {
                      'max-width': '100%',
                      'margin-left': '0px',
                      'margin-bottom': '50px',
                    },
                  },
                },
                text: {
                  button: 'Add to cart',
                },
              },
              productSet: {
                styles: {
                  products: {
                    '@media (min-width: 601px)': {
                      'margin-left': '-20px',
                    },
                  },
                },
              },
              modalProduct: {
                contents: {
                  img: false,
                  imgWithCarousel: true,
                  button: false,
                  buttonWithQuantity: true,
                },
                styles: {
                  product: {
                    '@media (min-width: 601px)': {
                      'max-width': '100%',
                      'margin-left': '0px',
                      'margin-bottom': '0px',
                    },
                  },
                },
                text: {
                  button: 'Add to cart',
                },
              },
              option: {},
              cart: {
                text: {
                  total: 'Subtotal',
                  button: 'Checkout',
                },
              },
              toggle: {},
            },
          })
        })
      })
    }

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
      <p className="section-subtitle">Hand-dyed. One of a kind. Limited run.</p>
      <div className="merch-grid">
        {PRODUCTS.map((product, index) => (
          <div
            key={product.id}
            ref={(el) => (productRefs.current[index] = el)}
            className="shopify-product"
          />
        ))}
      </div>
    </section>
  )
}
