import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion' // Added motion import
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Works from './components/Works'
import Explorations from './components/Explorations'
import Members from './components/Members'
import Stats from './components/Stats'
import Contact from './components/Contact'
import Webteamroles from './Webteamroles.jsx'
import SigWebDevWindow from "./SigWebDevWindow.jsx";

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    if (isLoading) return
    const sectionIds = ['home', 'works', 'achievements', 'members', 'stats', 'contact']
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      const detectionY = scrollY + window.innerHeight * 0.4
      let current = 'home'
      
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const sectionTop = el.getBoundingClientRect().top + scrollY
        if (sectionTop <= detectionY) current = id
      }
      setActiveSection(current)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          // Wrapped in a motion component so AnimatePresence works
          <motion.div
            key="loading-wrapper"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar activeSection={activeSection} />
          <main>
            <Hero />
            <Works />
            <Explorations />
            <Members />
            {/* Fixed capitalization: SigWebDevWindow */}
            <SigWebDevWindow /> 
            {/* Fixed spacing: Webteamroles */}
            <Webteamroles />
            <Stats />
            <Contact />
          </main>
        </>
      )}
    </>
  )
}
