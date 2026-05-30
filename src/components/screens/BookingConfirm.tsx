'use client'
import { Gift, Friend, formatPrice, priorityLabel } from '@/lib/data'

interface BookingConfirmProps {
  gift: Gift
  friend: Friend
  onDone: () => void
  onBuyLink: () => void
  onViewOthers: () => void
}

function ShopBadge({ shop }: { shop: string | null }) {
  if (!shop) return null
  if (shop === 'ozon') return <span style={{ background: '#005BFF', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>OZON</span>
  if (shop === 'wb') return <span style={{ background: '#CB11AB', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>WB</span>
  if (shop === 'ymarket') return <span style={{ background: '#FC3F1D', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>Яндекс</span>
  return null
}

export function BookingConfirm({ gift, friend, onDone, onBuyLink, onViewOthers }: BookingConfirmProps) {
  return (
    <div className="absolute inset-0 flex flex-col bg-white scale-in">
      {/* Decorative stars */}
      {[
        { top: 60, left: 40, emoji: '✨' },
        { top: 80, right: 50, emoji: '⭐' },
        { top: 140, left: 20, emoji: '✨' },
        { top: 40, right: 80, emoji: '⭐' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', top: s.top, left: (s as {left?: number}).left, right: (s as {right?: number}).right, fontSize: 16, opacity: 0.6, zIndex: 0 }}>
          {s.emoji}
        </div>
      ))}

      <div className="scroll-y flex-1" style={{ padding: '60px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
        {/* Checkmark */}
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#EAF4DF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="#6BA83A" strokeWidth="2.5" fill="none"/>
            <path d="M12 20l6 6 10-12" stroke="#6BA83A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111', textAlign: 'center', marginBottom: 8 }}>Подарок забронирован!</h1>
        <p style={{ fontSize: 15, color: '#888', textAlign: 'center', marginBottom: 24 }}>{gift.name}</p>

        {/* Gift card mini */}
        <div style={{ width: '100%', border: '1px solid #F0F0F0', borderRadius: 16, padding: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, background: gift.imageBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
              {gift.image}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 4 }}>{gift.name}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#6BA83A' }}>{formatPrice(gift.price)}</div>
              <div style={{ marginTop: 4 }}><ShopBadge shop={gift.shop} /></div>
            </div>
          </div>
          <span style={{
            background: gift.priority === 'high' ? '#EAF4DF' : '#F5F5F5',
            color: gift.priority === 'high' ? '#6BA83A' : '#888',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: 100,
          }}>
            {priorityLabel(gift.priority)}
          </span>
        </div>

        {/* Info rows */}
        {[
          { icon: '🔒', text: `${friend.name} не увидит, кто забронировал этот подарок.` },
          { icon: '👥', text: 'Другие дарители увидят, что подарок уже забронирован.' },
          { icon: '🛡️', text: 'Мы делаем это, чтобы два человека не купили одно и то же. 💜' },
        ].map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12, width: '100%' }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{row.icon}</span>
            <p style={{ fontSize: 13, color: '#888', lineHeight: 1.5 }}>{row.text}</p>
          </div>
        ))}

        {/* Buttons */}
        <div style={{ width: '100%', marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={onBuyLink}
            className="press"
            style={{ width: '100%', height: 62, borderRadius: 14, background: '#6BA83A', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px', textAlign: 'left' }}
          >
            <span style={{ fontSize: 22 }}>🛒</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Купить по ссылке</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Перейти в магазин</div>
            </div>
            <svg style={{ marginLeft: 'auto' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <button
            onClick={onViewOthers}
            className="press"
            style={{ width: '100%', height: 54, borderRadius: 14, background: 'white', color: '#111', fontWeight: 600, fontSize: 15, border: '1px solid #F0F0F0', cursor: 'pointer' }}
          >
            Посмотреть другие подарки
          </button>
        </div>

        <button
          onClick={onDone}
          className="press"
          style={{ marginTop: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: 15, fontWeight: 500 }}
        >
          Готово
        </button>
      </div>
    </div>
  )
}
