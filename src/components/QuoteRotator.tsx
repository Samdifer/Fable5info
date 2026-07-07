import { useEffect, useState } from 'react'
import { DEADLINE } from '../lib/deadline'
import { EXPIRED_QUOTE, QUOTES } from '../lib/quotes'

const ROTATE_MS = 10_000
const FADE_MS = 350

export default function QuoteRotator() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * QUOTES.length))
  const [visible, setVisible] = useState(true)
  const [expired, setExpired] = useState(() => DEADLINE.getTime() <= Date.now())

  useEffect(() => {
    if (expired) return
    const id = setInterval(() => {
      if (DEADLINE.getTime() <= Date.now()) {
        setExpired(true)
        return
      }
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % QUOTES.length)
        setVisible(true)
      }, FADE_MS)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [expired])

  const quote = expired ? EXPIRED_QUOTE : QUOTES[index]

  return (
    <p className={`quote${visible || expired ? '' : ' quote-hidden'}`}>
      &ldquo;{quote}&rdquo;
    </p>
  )
}
