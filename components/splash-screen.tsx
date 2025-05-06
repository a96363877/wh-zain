"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, CheckCircle, Wifi, Signal, Smartphone } from 'lucide-react'
import GeometricShapes from "./geometric-shapes"
import AwardTrophy from "./award-trophy"
import ZainLogo from "./zain-logo"

export default function SplashScreen() {
  const [loading, setLoading] = useState(0)
  const [currentDot, setCurrentDot] = useState(0)
  const [showAwards, setShowAwards] = useState(false)
  const [showText, setShowText] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [glowIndex, setGlowIndex] = useState(-1)
  const [progressBarWidth, setProgressBarWidth] = useState(0)

  useEffect(() => {
    // Start showing elements in sequence with improved timing
    const timer1 = setTimeout(() => setShowAwards(true), 600)
    const timer2 = setTimeout(() => setShowText(true), 1400)
    const timer3 = setTimeout(() => setShowLogo(true), 2000)

    // Handle loading progress with smoother increments
    const loadingInterval = setInterval(() => {
      setLoading((prev) => {
        if (prev >= 100) {
          clearInterval(loadingInterval)
          return 100
        }
        return prev + 0.8
      })
    }, 30)

    // Animate progress bar width with easing
    const progressInterval = setInterval(() => {
      setProgressBarWidth((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 0.4
      })
    }, 25)

    // Animate dots with improved timing
    const dotInterval = setInterval(() => {
      setCurrentDot((prev) => (prev + 1) % 3)
    }, 600)

    // Animate award glow with better timing
    const glowInterval = setInterval(() => {
      setGlowIndex((prev) => (prev + 1) % 5)
    }, 1200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearInterval(loadingInterval)
      clearInterval(dotInterval)
      clearInterval(glowInterval)
      clearInterval(progressInterval)
    }
  }, [])

  const awardTitles = [
    "FASTEST MOBILE NETWORK",
    "FASTEST FIXED NETWORK",
    "BEST VIDEO EXPERIENCE",
    "BEST WIFI EXPERIENCE",
    "BEST 5G MOBILE EXPERIENCE",
  ]

  const awardIcons = [
    <Smartphone key="mobile" className="w-5 h-5" />,
    <Signal key="fixed" className="w-5 h-5" />,
    <CheckCircle key="video" className="w-5 h-5" />,
    <Wifi key="wifi" className="w-5 h-5" />,
    <Award key="5g" className="w-5 h-5" />,
  ]

  return (
    <div className="fixed top-0 right-0 h-screen w-full bg-gradient-to-b from-[#490066] to-[#0f1b7a] overflow-hidden font-sans">
      {/* Animated background gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-[#490066]/80 to-[#2a3dc3]/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Geometric background shapes with enhanced animation */}
      <div className="absolute inset-0 overflow-hidden">
        <GeometricShapes />
      </div>

      {/* Glowing circle behind awards */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-white/5 filter blur-xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: showAwards ? 1 : 0, opacity: showAwards ? 0.2 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Awards with enhanced layout */}
      <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
        <AnimatePresence>
          {showAwards && (
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    y: index === 1 ? -15 : 0 // Middle trophy slightly higher
                  }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.2 * index,
                    ease: "easeOut" 
                  }}
                >
                  <AwardTrophy 
                    title={awardTitles[index]} 
                    isGlowing={glowIndex === index} 
                    icon={awardIcons[index]} 
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative elements */}
      <AnimatePresence>
        {showText && (
          <>
            {/* White line under awards with enhanced animation */}
            <motion.div
              className="absolute top-[58%] inset-x-0 mx-auto w-[80%] h-0.5 bg-gradient-to-r from-white/30 via-white to-white/30"
              initial={{ width: "0%", opacity: 0, x: "-50%" }}
              animate={{ width: "80%", opacity: 1, x: "0%" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
              style={{ left: "10%" }}
            />
            
            {/* Decorative dots */}
            <motion.div 
              className="absolute top-[58%] left-[10%] w-2 h-2 rounded-full bg-white"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            />
            <motion.div 
              className="absolute top-[58%] right-[10%] w-2 h-2 rounded-full bg-white"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Text content with enhanced animations */}
      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute top-[62%] inset-x-0 mx-auto px-4 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          >
            <motion.div
              className="text-white text-3xl font-bold mb-2 w-full text-center"
              dir="rtl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              الشبكة الأسرع في الكويت
            </motion.div>
            
            <motion.div
              className="text-white text-2xl font-bold w-full text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Kuwait&apos;s Fastest Network
            </motion.div>
            
            {/* Logo with enhanced animation */}
            <motion.div
              className="text-white my-6 flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
            >
              <ZainLogo />
            </motion.div>
            
            <motion.div
              className="text-white text-sm rtl font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              القادم فيه كل جميل
            </motion.div>
            
            {/* Animated dots with improved styling */}
            <motion.div 
              className="flex justify-center mt-6 space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className={`h-2.5 w-2.5 rounded-full ${
                    currentDot === dot 
                      ? "bg-white" 
                      : "bg-white/40"
                  }`}
                  animate={{
                    scale: currentDot === dot ? 1.2 : 1,
                    opacity: currentDot === dot ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced progress bar */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[85%] flex flex-col items-center">
        <motion.div 
          className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-white/80 to-white"
            style={{ width: `${progressBarWidth}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>
        
        {/* Loading percentage */}
        <motion.div 
          className="text-white/80 text-xs mt-2 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {Math.round(loading)}%
        </motion.div>
      </div>
    </div>
  )
}
