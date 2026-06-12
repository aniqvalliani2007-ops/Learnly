import { loadStripe } from '@stripe/stripe-js'

let stripePromise

export const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  }
  return stripePromise
}
