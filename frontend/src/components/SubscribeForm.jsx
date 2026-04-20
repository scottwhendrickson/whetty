import { useState } from 'react'
import { useSubscribe } from '../hooks/useSubscribe'

export default function SubscribeForm({ source = 'home', buttonText = 'Subscribe' }) {
  const [email, setEmail] = useState('')
  const { subscribe, status } = useSubscribe()

  async function handleSubmit(e) {
    e.preventDefault()
    await subscribe(email, source)
  }

  if (status === 'success') {
    return (
      <div className="subscribe-success">
        <span>✓</span> You're on the list!
      </div>
    )
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        className="email-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        className="cta-btn primary"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Saving...' : buttonText}
      </button>
      {status === 'error' && (
        <p className="subscribe-error">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
