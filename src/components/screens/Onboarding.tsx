'use client'
import { useState } from 'react'
import { StatusBar } from '../ui/StatusBar'

type Stage = 'splash' | 'ob1' | 'ob2' | 'ob3' | 'auth'

const onboardingSlides = [
  {
    stage: 'ob1' as Stage,
    illustration: (
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ob1glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C4EE88" stopOpacity="0.45"/>
            <stop offset="100%" stopColor="#C4EE88" stopOpacity="0"/>
          </radialGradient>
          <filter id="ob1sh" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="8" stdDeviation="14" floodOpacity="0.09"/>
          </filter>
          <filter id="ob1ba" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.14"/>
          </filter>
        </defs>
        <ellipse cx="140" cy="138" rx="110" ry="108" fill="url(#ob1glow)"/>
        {/* clip */}
        <rect x="108" y="44" width="64" height="30" rx="9" fill="#C0C0C0"/>
        <rect x="118" y="48" width="44" height="22" rx="7" fill="#ADADAD"/>
        <rect x="127" y="52" width="26" height="14" rx="4" fill="#9E9E9E"/>
        {/* body */}
        <rect x="62" y="58" width="162" height="180" rx="16" fill="white" filter="url(#ob1sh)"/>
        {/* row 1 checked */}
        <rect x="94" y="106" width="98" height="14" rx="7" fill="#F3F3F3"/>
        <circle cx="82" cy="113" r="10" fill="rgba(98,184,48,0.15)"/>
        <path d="M76 113 L80.5 117.5 L89 106" stroke="#62B830" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
        {/* row 2 checked */}
        <rect x="94" y="133" width="86" height="14" rx="7" fill="#F3F3F3"/>
        <circle cx="82" cy="140" r="10" fill="rgba(98,184,48,0.15)"/>
        <path d="M76 140 L80.5 144.5 L89 133" stroke="#62B830" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
        {/* row 3 empty */}
        <rect x="94" y="160" width="92" height="14" rx="7" fill="#F3F3F3"/>
        <circle cx="82" cy="167" r="10" stroke="#E0E0E0" strokeWidth="1.5" fill="none"/>
        {/* green heart badge */}
        <rect x="52" y="196" width="64" height="64" rx="20" fill="#62B830" filter="url(#ob1ba)"/>
        <path d="M84 231 C84 231 67 220 67 210 C67 205.4 70.8 201.6 75.4 201.6 C78.2 201.6 80.7 203.2 84 206 C87.3 203.2 89.8 201.6 92.6 201.6 C97.2 201.6 101 205.4 101 210 C101 220 84 231 84 231Z" fill="white"/>
        {/* sparkle top-right */}
        <g transform="translate(202,74)" opacity="0.88">
          <line x1="0" y1="-13" x2="0" y2="13" stroke="#9ED838" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="-13" y1="0" x2="13" y2="0" stroke="#9ED838" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="-8" y1="-8" x2="8" y2="8" stroke="#9ED838" strokeWidth="1" strokeLinecap="round"/>
          <line x1="8" y1="-8" x2="-8" y2="8" stroke="#9ED838" strokeWidth="1" strokeLinecap="round"/>
        </g>
        {/* sparkle left */}
        <g transform="translate(46,130)" opacity="0.62">
          <line x1="0" y1="-9" x2="0" y2="9" stroke="#9ED838" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="-9" y1="0" x2="9" y2="0" stroke="#9ED838" strokeWidth="1.8" strokeLinecap="round"/>
        </g>
        {/* sparkle bottom-right */}
        <g transform="translate(214,202)" opacity="0.72">
          <line x1="0" y1="-9" x2="0" y2="9" stroke="#AEDC44" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="-9" y1="0" x2="9" y2="0" stroke="#AEDC44" strokeWidth="1.8" strokeLinecap="round"/>
        </g>
      </svg>
    ),
    title: 'Создавайте списки\nжеланий',
    desc: 'Добавляйте всё, что хотите получить на день рождения, Новый год или любой другой повод.',
  },
  {
    stage: 'ob2' as Stage,
    illustration: (
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ob2glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C4EE88" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#C4EE88" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="gBg" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#7DD89A"/>
            <stop offset="100%" stopColor="#48A86E"/>
          </radialGradient>
          <radialGradient id="bBg" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#7ABFE8"/>
            <stop offset="100%" stopColor="#4892C2"/>
          </radialGradient>
          <filter id="ob2card" x="-35%" y="-35%" width="170%" height="170%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodOpacity="0.11"/>
          </filter>
        </defs>
        <ellipse cx="140" cy="140" rx="110" ry="108" fill="url(#ob2glow)"/>
        {/* girl circle */}
        <circle cx="98" cy="120" r="62" fill="url(#gBg)"/>
        <circle cx="98" cy="113" r="29" fill="#F7CAAA"/>
        <path d="M70 101 Q98 77 126 101 Q126 88 98 79 Q70 88 70 101Z" fill="#4A2E1A"/>
        <path d="M70 101 Q64 118 68 130" stroke="#4A2E1A" strokeWidth="11" fill="none" strokeLinecap="round"/>
        <path d="M126 101 Q132 118 128 130" stroke="#4A2E1A" strokeWidth="11" fill="none" strokeLinecap="round"/>
        <ellipse cx="90" cy="115" rx="3.5" ry="4" fill="#2A1810"/>
        <ellipse cx="106" cy="115" rx="3.5" ry="4" fill="#2A1810"/>
        <path d="M90 126 Q98 132 106 126" stroke="#D4906A" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* boy circle */}
        <circle cx="182" cy="168" r="62" fill="url(#bBg)"/>
        <circle cx="182" cy="160" r="29" fill="#F7CAAA"/>
        <path d="M154 149 Q182 127 210 149 Q210 138 182 130 Q154 138 154 149Z" fill="#5A3820"/>
        <ellipse cx="174" cy="163" rx="3.5" ry="4" fill="#2A1810"/>
        <ellipse cx="190" cy="163" rx="3.5" ry="4" fill="#2A1810"/>
        <path d="M174 173 Q182 179 190 173" stroke="#D4906A" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* white card with link */}
        <rect x="116" y="128" width="66" height="66" rx="19" fill="white" filter="url(#ob2card)"/>
        {/* Chain link — two interlocked oval rings */}
        <ellipse cx="143" cy="153" rx="13" ry="8" transform="rotate(-45 143 153)" stroke="#62B830" strokeWidth="2.8" fill="none"/>
        <ellipse cx="156" cy="168" rx="13" ry="8" transform="rotate(-45 156 168)" stroke="#62B830" strokeWidth="2.8" fill="none"/>
        {/* green heart */}
        <path d="M88 214 C88 214 73 204 73 194 C73 189.6 76.6 186 81 186 C83.7 186 86.1 187.5 88 190 C89.9 187.5 92.3 186 95 186 C99.4 186 103 189.6 103 194 C103 204 88 214 88 214Z" fill="#62B830"/>
        {/* sparkles */}
        <g transform="translate(50,72)" opacity="0.72">
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#9ED838" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#9ED838" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="-7" y1="-7" x2="7" y2="7" stroke="#9ED838" strokeWidth="1" strokeLinecap="round"/>
          <line x1="7" y1="-7" x2="-7" y2="7" stroke="#9ED838" strokeWidth="1" strokeLinecap="round"/>
        </g>
        <g transform="translate(218,96)" opacity="0.62">
          <line x1="0" y1="-9" x2="0" y2="9" stroke="#AEDC44" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="-9" y1="0" x2="9" y2="0" stroke="#AEDC44" strokeWidth="1.8" strokeLinecap="round"/>
        </g>
        <g transform="translate(170,232)" opacity="0.65">
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#9ED838" strokeWidth="1.6" strokeLinecap="round"/>
          <line x1="-8" y1="0" x2="8" y2="0" stroke="#9ED838" strokeWidth="1.6" strokeLinecap="round"/>
        </g>
      </svg>
    ),
    title: 'Делитесь с близкими',
    desc: 'Отправляйте список друзьям и семье, чтобы они знали, что подарить.',
  },
  {
    stage: 'ob3' as Stage,
    illustration: (
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ob3glow" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#C4EE88" stopOpacity="0.48"/>
            <stop offset="100%" stopColor="#C4EE88" stopOpacity="0"/>
          </radialGradient>
          <filter id="ob3box" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="10" stdDeviation="18" floodOpacity="0.10"/>
          </filter>
          <filter id="ob3lid" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="5" stdDeviation="10" floodOpacity="0.09"/>
          </filter>
        </defs>
        <ellipse cx="140" cy="152" rx="110" ry="102" fill="url(#ob3glow)"/>
        {/* box body */}
        <rect x="68" y="160" width="148" height="98" rx="12" fill="white" filter="url(#ob3box)"/>
        {/* vertical ribbon on body */}
        <rect x="127" y="160" width="26" height="98" fill="#62B830" opacity="0.9"/>
        <rect x="68" y="160" width="12" height="98" fill="white"/>
        <rect x="204" y="160" width="12" height="98" fill="white"/>
        <rect x="68" y="246" width="148" height="14" rx="12" fill="white"/>
        {/* lid */}
        <rect x="60" y="132" width="160" height="40" rx="12" fill="white" filter="url(#ob3lid)"/>
        {/* horizontal ribbon on lid */}
        <rect x="60" y="145" width="160" height="14" fill="#62B830" opacity="0.9"/>
        <rect x="60" y="132" width="160" height="14" rx="12" fill="white"/>
        <rect x="60" y="160" width="160" height="12" fill="white"/>
        {/* bow left loop */}
        <path d="M106 132 C96 118 90 102 101 95 C108 90 117 95 122 106 C127 116 130 124 140 132" fill="#62B830"/>
        {/* bow right loop */}
        <path d="M174 132 C184 118 190 102 179 95 C172 90 163 95 158 106 C153 116 150 124 140 132" fill="#62B830"/>
        {/* bow knot */}
        <ellipse cx="140" cy="132" rx="11" ry="10" fill="#4CA024"/>
        {/* floating heart */}
        <path d="M140 96 C140 96 121 84 121 72 C121 66.2 125.7 61.5 131.5 61.5 C135 61.5 138.1 63.5 140 67 C141.9 63.5 145 61.5 148.5 61.5 C154.3 61.5 159 66.2 159 72 C159 84 140 96 140 96Z" fill="#62B830"/>
        {/* sparkles */}
        <g transform="translate(63,122)" opacity="0.76">
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#9ED838" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#9ED838" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="-7" y1="-7" x2="7" y2="7" stroke="#9ED838" strokeWidth="1" strokeLinecap="round"/>
          <line x1="7" y1="-7" x2="-7" y2="7" stroke="#9ED838" strokeWidth="1" strokeLinecap="round"/>
        </g>
        <g transform="translate(216,140)" opacity="0.72">
          <line x1="0" y1="-11" x2="0" y2="11" stroke="#AEDC44" strokeWidth="2.1" strokeLinecap="round"/>
          <line x1="-11" y1="0" x2="11" y2="0" stroke="#AEDC44" strokeWidth="2.1" strokeLinecap="round"/>
          <line x1="-6" y1="-6" x2="6" y2="6" stroke="#AEDC44" strokeWidth="1" strokeLinecap="round"/>
          <line x1="6" y1="-6" x2="-6" y2="6" stroke="#AEDC44" strokeWidth="1" strokeLinecap="round"/>
        </g>
        <g transform="translate(100,58)" opacity="0.62">
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#9ED838" strokeWidth="1.6" strokeLinecap="round"/>
          <line x1="-8" y1="0" x2="8" y2="0" stroke="#9ED838" strokeWidth="1.6" strokeLinecap="round"/>
        </g>
      </svg>
    ),
    title: 'Получайте то,\nчто хотите',
    desc: 'Больше никаких неудачных подарков — только то, что действительно радует.',
  },
]

const STARS = [
  { top: '9%',  left: '14%',  size: 16, opacity: 0.55 },
  { top: '17%', right: '11%', size: 11, opacity: 0.35 },
  { top: '28%', left: '7%',   size: 9,  opacity: 0.28 },
  { top: '40%', right: '6%',  size: 13, opacity: 0.40 },
  { top: '55%', left: '10%',  size: 10, opacity: 0.30 },
  { top: '63%', right: '18%', size: 9,  opacity: 0.32 },
  { top: '72%', left: '22%',  size: 12, opacity: 0.42 },
  { top: '80%', right: '10%', size: 15, opacity: 0.38 },
  { top: '87%', left: '8%',   size: 8,  opacity: 0.25 },
  { top: '91%', right: '28%', size: 11, opacity: 0.33 },
]

function SplashScreen({ onNext }: { onNext: () => void }) {
  return (
    <div
      style={{ position: 'absolute', inset: 0, background: '#0C0C0C', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      onClick={onNext}
    >
      {STARS.map((s, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: s.top,
            left: (s as { left?: string }).left,
            right: (s as { right?: string }).right,
            fontSize: s.size,
            opacity: s.opacity,
            color: '#D8EE78',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          ✦
        </span>
      ))}

      {/* Logo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{
          width: 96,
          height: 96,
          borderRadius: 26,
          background: '#CDEF60',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <path
              d="M25 41S9 29.5 9 18.5C9 13.2 13.2 9 18.5 9C21.5 9 24.2 10.5 25 12C25.8 10.5 28.5 9 31.5 9C36.8 9 41 13.2 41 18.5C41 29.5 25 41 25 41Z"
              stroke="#111111"
              strokeWidth="2.5"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'white', fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>Wishlist</div>
          <div style={{ color: '#666', fontSize: 14, marginTop: 8, lineHeight: 1.5 }}>
            Списки желаний для важных моментов
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 52, color: '#444', fontSize: 13 }}>
        Нажмите, чтобы начать
      </div>
    </div>
  )
}

function OnboardingSlide({
  slide,
  index,
  total,
  onNext,
  onSkip,
}: {
  slide: typeof onboardingSlides[0]
  index: number
  total: number
  onNext: () => void
  onSkip: () => void
}) {
  const isLast = index === total - 1
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <StatusBar />

      {/* Skip chip */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 20px 0' }}>
        <button
          onClick={onSkip}
          className="press"
          style={{
            color: '#333',
            fontSize: 13,
            fontWeight: 500,
            background: '#F0F0F0',
            border: 'none',
            borderRadius: 100,
            cursor: 'pointer',
            padding: '6px 14px',
          }}
        >
          Пропустить
        </button>
      </div>

      {/* Illustration — top half */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {slide.illustration}
      </div>

      {/* Bottom section */}
      <div style={{ padding: '0 28px 44px' }}>
        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 24 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: i === index ? '#111' : '#D8D8D8',
                transition: 'background 0.2s',
              }}
            />
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#111', textAlign: 'center', marginBottom: 12, lineHeight: 1.25, whiteSpace: 'pre-line' }}>
          {slide.title}
        </h2>
        <p style={{ fontSize: 15, color: '#888', textAlign: 'center', lineHeight: 1.6, marginBottom: 28 }}>
          {slide.desc}
        </p>

        <button
          onClick={onNext}
          className="press"
          style={{
            width: '100%',
            height: 56,
            borderRadius: 16,
            background: isLast ? '#62B830' : '#111111',
            color: 'white',
            fontWeight: 600,
            fontSize: 17,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {isLast ? <>Начать <span style={{ fontSize: 20 }}>→</span></> : 'Далее'}
        </button>
      </div>
    </div>
  )
}

function AuthScreen({ onDone }: { onDone: () => void }) {
  const authOptions = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M21.6 11.2c0-.8-.07-1.57-.2-2.3H11v4.35h5.96a5.1 5.1 0 0 1-2.2 3.34v2.78h3.56c2.08-1.92 3.28-4.74 3.28-8.17z" fill="#4285F4"/>
          <path d="M11 22c2.97 0 5.46-1 7.28-2.63l-3.56-2.78c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.28-1.93-6.15-4.53H1.17v2.87A11 11 0 0 0 11 22z" fill="#34A853"/>
          <path d="M4.85 13.12A6.63 6.63 0 0 1 4.5 11c0-.73.13-1.44.35-2.12V6H1.17A11 11 0 0 0 0 11c0 1.77.43 3.45 1.17 4.99l3.68-2.87z" fill="#FBBC05"/>
          <path d="M11 4.36c1.61 0 3.06.55 4.2 1.64l3.15-3.15A11 11 0 0 0 11 0 11 11 0 0 0 1.17 6.01L4.85 8.88C5.72 6.28 8.14 4.36 11 4.36z" fill="#EA4335"/>
        </svg>
      ),
      label: 'Продолжить с Google',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M16.1 1.7c.9-1.1 1.5-2.7 1.3-4.2-1.3.1-2.9.9-3.8 2C12.8.6 12.3 2 12.4 3.4c1.4.1 2.8-.7 3.7-1.7zM17.3 4c-2.1-.1-3.9 1.2-4.9 1.2S10 4.1 8.3 4.1C5.7 4.2 3.3 5.8 2 8.3c-2.6 4.6-.7 11.4 1.9 15.1 1.2 1.8 2.7 3.8 4.6 3.7 1.8-.1 2.5-1.2 4.7-1.2s2.8 1.2 4.7 1.2c2 0 3.2-1.8 4.4-3.6 1.4-2 1.9-4 2-4.1-.1 0-3.8-1.5-3.9-5.9-.1-3.7 3-5.5 3.1-5.6C21.8 5.3 19.5 4 17.3 4z" fill="#111111"/>
        </svg>
      ),
      label: 'Продолжить с Apple',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="11" fill="#229ED9"/>
          <path d="M5 6.5l6.5 2.5L17 5l-2 9-4-2.5L9 13.5l-.5-4L5 6.5z" fill="white"/>
        </svg>
      ),
      label: 'Продолжить с Telegram',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="1" y="3" width="20" height="16" rx="3" stroke="#888" strokeWidth="1.5" fill="none"/>
          <path d="M1 7l10 6 10-6" stroke="#888" strokeWidth="1.5" fill="none"/>
        </svg>
      ),
      label: 'Войти с email',
    },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <StatusBar />
      <div style={{ padding: '8px 20px 0' }}>
        <button
          onClick={() => {}}
          className="press"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', color: '#111' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      </div>

      <div className="scroll-y flex-1" style={{ padding: '20px 20px 32px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111', marginBottom: 10, lineHeight: 1.2 }}>
          Добро пожаловать в Wishlist 💚
        </h1>
        <p style={{ fontSize: 15, color: '#888', marginBottom: 32, lineHeight: 1.5 }}>
          Войдите или создайте аккаунт, чтобы сохранять свои желания
        </p>

        {authOptions.map((opt, i) => (
          <button
            key={i}
            onClick={onDone}
            className="press"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '0 16px',
              height: 56,
              borderRadius: 14,
              border: '1px solid #E0E0E0',
              background: 'white',
              cursor: 'pointer',
              marginBottom: 12,
              fontSize: 16,
              fontWeight: 500,
              color: '#111',
            }}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}

        <div style={{ marginTop: 8 }}>
          <button
            onClick={onDone}
            className="press"
            style={{
              width: '100%',
              height: 54,
              borderRadius: 14,
              background: '#111111',
              color: 'white',
              fontWeight: 600,
              fontSize: 16,
              border: 'none',
              cursor: 'pointer',
              marginBottom: 12,
            }}
          >
            Войти
          </button>
          <button
            onClick={onDone}
            className="press"
            style={{
              width: '100%',
              height: 44,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#888',
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            Создать аккаунт
          </button>
        </div>

        <p style={{ fontSize: 11, color: '#C0C0C0', textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
          Продолжая, вы соглашаетесь с Пользовательским соглашением и Политикой конфиденциальности
        </p>
      </div>
    </div>
  )
}

export function Onboarding({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<Stage>('splash')

  const obIndex = stage === 'ob1' ? 0 : stage === 'ob2' ? 1 : stage === 'ob3' ? 2 : -1

  const goNext = () => {
    if (stage === 'splash') setStage('ob1')
    else if (stage === 'ob1') setStage('ob2')
    else if (stage === 'ob2') setStage('ob3')
    else if (stage === 'ob3') setStage('auth')
    else if (stage === 'auth') onDone()
  }

  if (stage === 'splash') return <SplashScreen onNext={goNext} />
  if (stage === 'auth') return <AuthScreen onDone={onDone} />

  const slide = onboardingSlides[obIndex]
  if (!slide) return null

  return (
    <OnboardingSlide
      slide={slide}
      index={obIndex}
      total={3}
      onNext={goNext}
      onSkip={() => setStage('auth')}
    />
  )
}
