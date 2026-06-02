'use client'
import { useState, useEffect } from 'react'
import { StatusBar } from '../ui/StatusBar'
import { formatPrice } from '@/lib/data'

// ── Gift pool for quiz results ──────────────────────────────────────────────
const QUIZ_GIFTS = [
  {
    id: 'qg1', name: 'Аромасвеча «Свобода»', price: 2490,
    image: '/fav-candle.webp', imageBg: '#FFF8F0', shop: null,
    maxPrice: 5000, interests: ['cozy', 'beauty', 'creative'], who: ['girl', 'parent', 'colleague'],
  },
  {
    id: 'qg2', name: 'Набор для матча', price: 3490,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop&auto=format&q=80',
    imageBg: '#F0FFF5', shop: null,
    maxPrice: 6000, interests: ['cozy', 'beauty', 'creative'], who: ['girl', 'parent', 'colleague'],
  },
  {
    id: 'qg3', name: 'Мини-ваза для цветов', price: 1790,
    image: 'https://images.unsplash.com/photo-1612965607446-25e1332775ae?w=400&h=400&fit=crop&auto=format&q=80',
    imageBg: '#FFF8F0', shop: null,
    maxPrice: 4000, interests: ['cozy', 'creative'], who: ['girl', 'parent', 'colleague'],
  },
  {
    id: 'qg4', name: 'Серьги с жемчугом', price: 5990,
    image: 'https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=400&h=400&fit=crop&auto=format&q=80',
    imageBg: '#F5F0FF', shop: null,
    maxPrice: 10000, interests: ['beauty', 'creative'], who: ['girl'],
  },
  {
    id: 'qg5', name: 'Плед из мериноса', price: 8990,
    image: 'https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=400&h=400&fit=crop&auto=format&q=80',
    imageBg: '#FFF8F0', shop: 'wb',
    maxPrice: 15000, interests: ['cozy'], who: ['girl', 'parent', 'colleague'],
  },
  {
    id: 'qg6', name: 'Сертификат на керамику', price: 5000,
    image: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=400&h=400&fit=crop&auto=format&q=80',
    imageBg: '#FFF8F0', shop: null,
    maxPrice: 8000, interests: ['creative'], who: ['girl', 'parent', 'colleague'],
  },
  {
    id: 'qg7', name: 'Instax Mini 12', price: 7990,
    image: 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=400&h=400&fit=crop&auto=format&q=80',
    imageBg: '#FFF0F5', shop: 'ymarket',
    maxPrice: 12000, interests: ['creative', 'travel', 'active'], who: ['girl', 'guy', 'colleague'],
  },
  {
    id: 'qg8', name: 'Парфюм Byredo Bal d\'Afrique', price: 19500,
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=400&fit=crop&auto=format&q=80',
    imageBg: '#FFF0F5', shop: 'ozon',
    maxPrice: 30000, interests: ['beauty', 'cozy'], who: ['girl', 'parent'],
  },
  {
    id: 'qg9', name: 'Наушники Sony WH-1000XM5', price: 19990,
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=400&fit=crop&auto=format&q=80',
    imageBg: '#F0F7FF', shop: 'wb',
    maxPrice: 30000, interests: ['tech', 'active', 'travel'], who: ['guy', 'girl', 'colleague'],
  },
  {
    id: 'qg10', name: 'Apple AirPods Pro 2', price: 24990,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&auto=format&q=80',
    imageBg: '#F0F7FF', shop: 'ozon',
    maxPrice: 40000, interests: ['tech', 'active', 'travel'], who: ['guy', 'girl', 'colleague'],
  },
  {
    id: 'qg11', name: 'Apple Watch Series 9', price: 41990,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop&auto=format&q=80',
    imageBg: '#F5F5F5', shop: 'ozon',
    maxPrice: 60000, interests: ['tech', 'active'], who: ['guy', 'girl', 'parent'],
  },
  {
    id: 'qg12', name: 'Фотоаппарат Fujifilm X100VI', price: 149990,
    image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=400&fit=crop&auto=format&q=80',
    imageBg: '#F5F5F5', shop: 'ozon',
    maxPrice: 999999, interests: ['creative', 'travel', 'tech'], who: ['guy', 'girl'],
  },
]

// ── Types ────────────────────────────────────────────────────────────────────
type Step = 'q1' | 'q2' | 'q3' | 'q4' | 'loading' | 'results'
type Who = 'girl' | 'guy' | 'parent' | 'colleague' | 'child'
type Budget = 'low' | 'mid' | 'high' | 'premium'
type Interest = 'creative' | 'tech' | 'cozy' | 'active' | 'travel' | 'beauty' | 'books'

interface Answers {
  who: Who
  occasion: string
  budget: Budget
  interests: Interest[]
}

const BUDGET_MAX: Record<Budget, number> = {
  low: 3500,
  mid: 10000,
  high: 25000,
  premium: 999999,
}
const BUDGET_LABEL: Record<Budget, string> = {
  low: 'до 3 000 ₽',
  mid: '3 000–10 000 ₽',
  high: '10 000–25 000 ₽',
  premium: '25 000+ ₽',
}
const WHO_LABEL: Record<string, string> = {
  girl: 'Подруга / девушка', guy: 'Друг / парень',
  parent: 'Мама / папа', colleague: 'Коллега', child: 'Ребёнок',
}

// ── ShopBadge ────────────────────────────────────────────────────────────────
function ShopBadge({ shop }: { shop: string | null }) {
  if (!shop) return null
  if (shop === 'ozon') return <span style={{ background: '#005BFF', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 5 }}>OZON</span>
  if (shop === 'wb') return <span style={{ background: '#CB11AB', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 5 }}>WB</span>
  if (shop === 'ymarket') return <span style={{ background: '#FC3F1D', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 5 }}>Яндекс</span>
  return null
}

// ── Shared question option button ────────────────────────────────────────────
function OptionRow({ emoji, label, sub, onClick }: { emoji?: string; label: string; sub?: string; onClick: () => void }) {
  return (
    <button
      className="press"
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 16, border: '1.5px solid #F0F0F0', background: 'white', cursor: 'pointer', textAlign: 'left', width: '100%' }}
    >
      {emoji && <span style={{ fontSize: 26, lineHeight: 1, flexShrink: 0 }}>{emoji}</span>}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{sub}</div>}
      </div>
      <svg style={{ flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
    </button>
  )
}

// ── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  return (
    <div style={{ display: 'flex', gap: 5, padding: '4px 20px 20px' }}>
      {[0, 1, 2, 3].map(i => (
        <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < step ? '#111' : '#EBEBEB', transition: 'background 0.3s' }} />
      ))}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export function Quiz({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<Step>('q1')
  const [answers, setAnswers] = useState<Partial<Answers>>({})
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [barWidth, setBarWidth] = useState(0)

  // Loading auto-advance + progress bar animation
  useEffect(() => {
    if (step === 'loading') {
      const t1 = setTimeout(() => setBarWidth(90), 50)
      const t2 = setTimeout(() => setStep('results'), 2000)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    } else {
      setBarWidth(0)
    }
  }, [step])

  function getResults() {
    const maxPrice = BUDGET_MAX[answers.budget ?? 'mid']
    const interests = answers.interests ?? []
    const who = answers.who ?? 'girl'

    // soft filter: include items within 2x budget for more results
    const pool = QUIZ_GIFTS.filter(g => g.price <= maxPrice * 1.5)

    return pool
      .map(g => ({
        ...g,
        score:
          (g.price <= maxPrice ? 3 : 0) +
          (g.who.includes(who) ? 2 : 0) +
          g.interests.filter(i => interests.includes(i as Interest)).length,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
  }

  function toggleSave(id: string) {
    setSavedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // ── Q1: Кому? ───────────────────────────────────────────────────────────────
  if (step === 'q1') return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px 0' }}>
        <button onClick={onBack} className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>
      <ProgressBar step={1} />
      <div className="scroll-y flex-1" style={{ padding: '0 20px 32px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>Вопрос 1 из 4</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111', marginBottom: 22, lineHeight: 1.25 }}>Кому ищем подарок?</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <OptionRow emoji="👩" label="Подруге / девушке" onClick={() => { setAnswers(p => ({ ...p, who: 'girl' })); setStep('q2') }} />
          <OptionRow emoji="👨" label="Другу / парню" onClick={() => { setAnswers(p => ({ ...p, who: 'guy' })); setStep('q2') }} />
          <OptionRow emoji="👩‍👧" label="Маме / папе" onClick={() => { setAnswers(p => ({ ...p, who: 'parent' })); setStep('q2') }} />
          <OptionRow emoji="🧑‍💼" label="Коллеге" onClick={() => { setAnswers(p => ({ ...p, who: 'colleague' })); setStep('q2') }} />
          <OptionRow emoji="👶" label="Ребёнку" onClick={() => { setAnswers(p => ({ ...p, who: 'child' })); setStep('q2') }} />
        </div>
      </div>
    </div>
  )

  // ── Q2: Повод? ──────────────────────────────────────────────────────────────
  if (step === 'q2') return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px 0' }}>
        <button onClick={() => setStep('q1')} className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      </div>
      <ProgressBar step={2} />
      <div className="scroll-y flex-1" style={{ padding: '0 20px 32px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>Вопрос 2 из 4</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111', marginBottom: 22, lineHeight: 1.25 }}>Какой повод?</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <OptionRow emoji="🎂" label="День рождения" onClick={() => { setAnswers(p => ({ ...p, occasion: 'bday' })); setStep('q3') }} />
          <OptionRow emoji="💝" label="Просто так" onClick={() => { setAnswers(p => ({ ...p, occasion: 'justbecause' })); setStep('q3') }} />
          <OptionRow emoji="🎄" label="Новый год" onClick={() => { setAnswers(p => ({ ...p, occasion: 'newyear' })); setStep('q3') }} />
          <OptionRow emoji="💍" label="Свадьба / годовщина" onClick={() => { setAnswers(p => ({ ...p, occasion: 'wedding' })); setStep('q3') }} />
          <OptionRow emoji="🎓" label="Выпускной" onClick={() => { setAnswers(p => ({ ...p, occasion: 'graduation' })); setStep('q3') }} />
        </div>
      </div>
    </div>
  )

  // ── Q3: Бюджет? ─────────────────────────────────────────────────────────────
  if (step === 'q3') return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px 0' }}>
        <button onClick={() => setStep('q2')} className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      </div>
      <ProgressBar step={3} />
      <div className="scroll-y flex-1" style={{ padding: '0 20px 32px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>Вопрос 3 из 4</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111', marginBottom: 22, lineHeight: 1.25 }}>Сколько готов потратить?</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <OptionRow label="до 3 000 ₽" sub="Небольшой знак внимания" onClick={() => { setAnswers(p => ({ ...p, budget: 'low' })); setStep('q4') }} />
          <OptionRow label="3 000 — 10 000 ₽" sub="Приятный подарок" onClick={() => { setAnswers(p => ({ ...p, budget: 'mid' })); setStep('q4') }} />
          <OptionRow label="10 000 — 25 000 ₽" sub="Достойный подарок" onClick={() => { setAnswers(p => ({ ...p, budget: 'high' })); setStep('q4') }} />
          <OptionRow label="25 000+ ₽" sub="Щедрый подарок 🔥" onClick={() => { setAnswers(p => ({ ...p, budget: 'premium' })); setStep('q4') }} />
        </div>
      </div>
    </div>
  )

  // ── Q4: Интересы (мультивыбор) ──────────────────────────────────────────────
  if (step === 'q4') {
    const opts = [
      { id: 'creative', emoji: '🎨', label: 'Творческий' },
      { id: 'tech',     emoji: '💻', label: 'Технарь' },
      { id: 'cozy',     emoji: '🌿', label: 'Любит уют' },
      { id: 'active',   emoji: '🏃', label: 'Активный' },
      { id: 'travel',   emoji: '✈️', label: 'Путешественник' },
      { id: 'beauty',   emoji: '💅', label: 'Следит за собой' },
      { id: 'books',    emoji: '📚', label: 'Читает / учится' },
    ]
    const selected = answers.interests ?? []
    return (
      <div className="absolute inset-0 flex flex-col bg-white">
        <StatusBar />
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px 0' }}>
          <button onClick={() => setStep('q3')} className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
        </div>
        <ProgressBar step={4} />
        <div className="scroll-y flex-1" style={{ padding: '0 20px 24px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>Вопрос 4 из 4</p>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111', marginBottom: 4, lineHeight: 1.25 }}>Какой он / она?</h1>
          <p style={{ fontSize: 14, color: '#888', marginBottom: 20 }}>Выбери до 3 характеристик</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            {opts.map(opt => {
              const on = selected.includes(opt.id as Interest)
              return (
                <button
                  key={opt.id}
                  className="press"
                  onClick={() => {
                    setAnswers(p => ({
                      ...p,
                      interests: on
                        ? selected.filter(i => i !== opt.id)
                        : selected.length < 3 ? [...selected, opt.id as Interest] : selected,
                    }))
                  }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '16px 8px', borderRadius: 16, border: `1.5px solid ${on ? '#D9FA85' : '#F0F0F0'}`, background: on ? '#EAF4DF' : 'white', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: 26 }}>{opt.emoji}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: on ? '#1A4A00' : '#111', textAlign: 'center', lineHeight: 1.3 }}>{opt.label}</span>
                </button>
              )
            })}
          </div>
          <button
            className="press"
            onClick={() => setStep('loading')}
            style={{ width: '100%', height: 54, borderRadius: 14, background: '#D9FA85', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 600, color: '#111' }}
          >
            Подобрать подарки →
          </button>
        </div>
      </div>
    )
  }

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (step === 'loading') return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <style>{`@keyframes quizBounce { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-14px) scale(1.12)} }`}</style>
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 40px 40px' }}>
        <div style={{ fontSize: 72, animation: 'quizBounce 0.9s ease-in-out infinite', marginBottom: 28 }}>🎁</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#111', textAlign: 'center', lineHeight: 1.35, marginBottom: 32 }}>
          Подбираем идеи<br />специально для тебя…
        </div>
        <div style={{ width: '100%', height: 4, borderRadius: 2, background: '#F0F0F0', overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: 2, background: '#D9FA85', width: `${barWidth}%`, transition: 'width 1.7s ease-out' }} />
        </div>
      </div>
    </div>
  )

  // ── Results ──────────────────────────────────────────────────────────────────
  const results = getResults()
  const savedCount = savedIds.size

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      <div className="scroll-y flex-1">
        {/* Header */}
        <div style={{ padding: '8px 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <button onClick={onBack} className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
            {savedCount > 0 && (
              <span style={{ fontSize: 13, fontWeight: 600, background: '#EAF4DF', color: '#1A4A00', padding: '5px 12px', borderRadius: 100 }}>
                {savedCount} в избранном 💚
              </span>
            )}
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 10 }}>
            Нашли {results.length} идей 🎁
          </h1>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {answers.who && (
              <span style={{ fontSize: 12, fontWeight: 600, background: '#F5F5F5', color: '#555', padding: '4px 10px', borderRadius: 100 }}>
                {WHO_LABEL[answers.who]}
              </span>
            )}
            {answers.budget && (
              <span style={{ fontSize: 12, fontWeight: 600, background: '#F5F5F5', color: '#555', padding: '4px 10px', borderRadius: 100 }}>
                {BUDGET_LABEL[answers.budget]}
              </span>
            )}
          </div>
        </div>

        {/* Gift grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 20px 16px' }}>
          {results.map(gift => {
            const saved = savedIds.has(gift.id)
            return (
              <div key={gift.id} style={{ border: '1px solid #F0F0F0', borderRadius: 14, background: 'white', overflow: 'hidden' }}>
                {/* Image */}
                <div style={{ height: 130, background: gift.imageBg, position: 'relative', overflow: 'hidden' }}>
                  <img src={gift.image} alt={gift.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <button
                    className="press"
                    onClick={() => toggleSave(gift.id)}
                    style={{ position: 'absolute', top: 8, right: 8, background: 'white', border: 'none', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 6px rgba(0,0,0,0.12)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? '#D9FA85' : 'none'} stroke={saved ? '#D9FA85' : '#ccc'} strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
                {/* Info */}
                <div style={{ padding: '10px 10px 12px' }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#111', lineHeight: 1.4, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {gift.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{formatPrice(gift.price)}</span>
                    <ShopBadge shop={gift.shop} />
                  </div>
                  <button
                    className="press"
                    onClick={() => toggleSave(gift.id)}
                    style={{ width: '100%', height: 32, borderRadius: 10, background: saved ? '#EAF4DF' : '#D9FA85', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#1A4A00', transition: 'background 0.2s' }}
                  >
                    {saved ? '✓ В избранном' : '+ В избранное'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Redo */}
        <div style={{ padding: '0 20px 36px' }}>
          <button
            className="press"
            onClick={() => { setStep('q1'); setAnswers({}); setSavedIds(new Set()) }}
            style={{ width: '100%', height: 48, borderRadius: 14, background: 'white', border: '1.5px solid #EBEBEB', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#888' }}
          >
            Пройти ещё раз
          </button>
        </div>
      </div>
    </div>
  )
}
