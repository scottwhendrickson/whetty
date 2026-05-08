import MerchSection from '../components/MerchSection'

// Set to true when products are ready to go live
const SHOP_LIVE = false

export default function Shop() {
  if (!SHOP_LIVE) {
    return (
      <section className="shop-section">
        <h2 className="section-title">Shop</h2>
        <div className="coming-soon-block">
          <h3>Merch Store Coming Soon</h3>
          <p>Merch, vinyl, CDs, and digital bundles dropping soon.</p>
        </div>
      </section>
    )
  }

  return <MerchSection />
}
