import { useState } from 'react'
import { generateClient } from 'aws-amplify/data'

const client = generateClient()

export function useSubscribe() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function subscribe(email, source = 'home') {
    if (!email) return
    setStatus('loading')
    try {
      await client.models.Subscriber.create({
        email,
        source,
        subscribedAt: new Date().toISOString(),
      })
      setStatus('success')
    } catch (err) {
      console.error('Subscribe error:', err)
      setStatus('error')
    }
  }

  return { subscribe, status, setStatus }
}
