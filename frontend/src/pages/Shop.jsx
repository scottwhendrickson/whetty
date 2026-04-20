import MerchSection from '../components/MerchSection'

// Shop goes live May 8th, 2026
const SHOP_LAUNCH_DATE = new Date('2026-05-08T00:00:00')

function useCountdown() {
  const now = new Date()
  const diff = SHOP_LAUNCH_DATE - now

  if (diff <= 0) return null

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return { days, hours, minutes }
}

export default function Shop() {
  const countdown = useCountdown()

  if (countdown) {
    return (
      <section className="shop-section">
        <h2 className="section-title">Shop</h2>
        <div className="coming-soon-block">
          <h3>Shop Opens May 8th</h3>
          <p>Merch, vinyl, CDs, and digital bundles dropping with the POP¡ EP.</p>
          <div className="countdown">
            <div className="countdown-unit">
              <span className="countdown-number">{countdown.days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-unit">
              <span className="countdown-number">{countdown.hours}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-unit">
              <span className="countdown-number">{countdown.minutes}</span>
              <span className="countdown-label">Minutes</span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return <MerchSection />
}
