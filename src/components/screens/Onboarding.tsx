'use client'
import { useState } from 'react'
import { StatusBar } from '../ui/StatusBar'
import { useStore } from '@/lib/store'

type Stage = 'splash' | 'ob1' | 'ob2' | 'ob3' | 'auth'

const onboardingSlides = [
  {
    stage: 'ob1' as Stage,
    illustration: (
      <div style={{ position: 'relative', width: 220, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, #EAF4DF 0%, rgba(234,244,223,0) 70%)' }} />
        <span style={{ fontSize: 130, lineHeight: 1, filter: 'drop-shadow(0 8px 24px rgba(107,168,58,0.25))' }}>📋</span>
        <span style={{ position: 'absolute', bottom: 20, left: 10, fontSize: 36 }}>🩵</span>
        <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 20, opacity: 0.7 }}>✦</span>
        <span style={{ position: 'absolute', bottom: 30, right: 16, fontSize: 14, opacity: 0.5 }}>✦</span>
      </div>
    ),
    title: 'Создавайте списки\nжеланий',
    desc: 'Добавляйте всё, что хотите получить на день рождения, Новый год или любой другой повод.',
  },
  {
    stage: 'ob2' as Stage,
    illustration: (
      <div style={{ position: 'relative', width: 220, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, #EAF4DF 0%, rgba(234,244,223,0) 70%)' }} />
        <span style={{ fontSize: 110, lineHeight: 1, filter: 'drop-shadow(0 8px 24px rgba(107,168,58,0.2))' }}>🔗</span>
        <span style={{ position: 'absolute', top: 20, left: 12, fontSize: 60 }}>👧</span>
        <span style={{ position: 'absolute', bottom: 20, right: 8, fontSize: 60 }}>👦</span>
        <span style={{ position: 'absolute', bottom: 50, left: 22, fontSize: 22 }}>💚</span>
      </div>
    ),
    title: 'Делитесь с близкими',
    desc: 'Отправляйте список друзьям и семье, чтобы они знали, что подарить.',
  },
  {
    stage: 'ob3' as Stage,
    illustration: (
      <div style={{ position: 'relative', width: 220, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, #EAF4DF 0%, rgba(234,244,223,0) 70%)' }} />
        <span style={{ fontSize: 130, lineHeight: 1, filter: 'drop-shadow(0 8px 28px rgba(107,168,58,0.3))' }}>🎁</span>
        <span style={{ position: 'absolute', top: 16, right: 14, fontSize: 28 }}>💚</span>
        <span style={{ position: 'absolute', bottom: 22, left: 14, fontSize: 22 }}>🩶</span>
        <span style={{ position: 'absolute', top: 28, left: 18, fontSize: 18, opacity: 0.6 }}>✦</span>
        <span style={{ position: 'absolute', bottom: 16, right: 20, fontSize: 14, opacity: 0.5 }}>✦</span>
      </div>
    ),
    title: 'Получайте то,\nчто хотите',
    desc: 'Больше никаких неудачных подарков — только то, что действительно радует.',
  },
]

function SplashScreen({ onNext }: { onNext: () => void }) {
  return (
    <div
      style={{ position: 'absolute', inset: 0, background: '#0D0D0D', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      onClick={onNext}
    >
      {/* Decorative stars */}
      {[
        { top: '12%', left: '18%', size: 6, opacity: 0.6 },
        { top: '20%', right: '14%', size: 4, opacity: 0.4 },
        { top: '35%', left: '8%', size: 3, opacity: 0.3 },
        { top: '70%', right: '10%', size: 5, opacity: 0.5 },
        { top: '75%', left: '20%', size: 3, opacity: 0.35 },
        { top: '85%', right: '25%', size: 4, opacity: 0.4 },
      ].map((star, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: star.top,
            left: (star as { left?: string }).left,
            right: (star as { right?: string }).right,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            background: '#6BA83A',
            opacity: star.opacity,
          }}
        />
      ))}

      {/* Logo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 100,
          height: 100,
          borderRadius: 28,
          background: '#6BA83A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <path d="M26 10C26 10 18 18 18 26C18 30.4 21.6 34 26 34C30.4 34 34 30.4 34 26C34 18 26 10 26 10Z" fill="white" opacity="0.9"/>
            <path d="M15 20C15 20 10 25 10 30C10 33.3 12.7 36 16 36C19.3 36 22 33.3 22 30C22 25 15 20 15 20Z" fill="white" opacity="0.6"/>
            <path d="M37 20C37 20 42 25 42 30C42 33.3 39.3 36 36 36C32.7 36 30 33.3 30 30C30 25 37 20 37 20Z" fill="white" opacity="0.6"/>
          </svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'white', fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>Wishlist</div>
          <div style={{ color: '#888', fontSize: 14, marginTop: 6 }}>Списки желаний для важных моментов</div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 50, color: '#555', fontSize: 13 }}>
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
            background: isLast ? '#6BA83A' : '#111111',
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

export function Onboarding() {
  const [stage, setStage] = useState<Stage>('splash')
  const { setOnboardingDone } = useStore()

  const obIndex = stage === 'ob1' ? 0 : stage === 'ob2' ? 1 : stage === 'ob3' ? 2 : -1

  const goNext = () => {
    if (stage === 'splash') setStage('ob1')
    else if (stage === 'ob1') setStage('ob2')
    else if (stage === 'ob2') setStage('ob3')
    else if (stage === 'ob3') setStage('auth')
    else if (stage === 'auth') setOnboardingDone()
  }

  if (stage === 'splash') return <SplashScreen onNext={goNext} />
  if (stage === 'auth') return <AuthScreen onDone={setOnboardingDone} />

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
