import { useEffect, useState } from 'react'
import Countdown from './components/Countdown'
import InfoSection from './components/InfoSection'
import QuoteRotator from './components/QuoteRotator'
import TimezoneCalculator from './components/TimezoneCalculator'

type Theme = 'dark' | 'light'

const THEME_KEY = 'fable5-theme'

function initialTheme(): Theme {
  return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  return (
    <main>
      <header className="site-header">
        <span className="wordmark">fable5.info</span>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-label="Toggle theme"
        >
          ◐
        </button>
      </header>
      <Countdown />
      <QuoteRotator />
      <TimezoneCalculator />
      <InfoSection />
      <footer>
        Not affiliated with Anthropic. Web port of a{' '}
        <a href="https://github.com/Samdifer/Fable5info" target="_blank" rel="noreferrer">
          desktop sticky-note app
        </a>
        .
      </footer>
    </main>
  )
}
