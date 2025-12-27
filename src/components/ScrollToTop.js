import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    // Prevent the browser from restoring scroll position between route changes
    try {
      if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    } catch {
      // no op
    }
  }, [])

  useLayoutEffect(() => {
    // Some browsers restore scroll after navigation
    // We reset a few common scroll containers to be safe
    try {
      window.scrollTo(0, 0)
    } catch {
      // no op
    }

    try {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    } catch {
      // no op
    }

    try {
      const main = document.querySelector('main')
      if (main) main.scrollTop = 0
    } catch {
      // no op
    }
  }, [location.pathname])

  return null
}


