'use client'
import { StatusBar } from '../ui/StatusBar'
import { Gift, FriendWishlist, Friend, formatPrice, priorityLabel } from '@/lib/data'

interface GiftCardProps {
  gift: Gift
  wishlist: FriendWishlist
  friend: Friend
  onBack: () => void
  onBook: () => void
  onCancel: () => void
}

function ShopBadge({ shop }: { shop: string | null }) {
  if (!shop) return null
  if (shop === 'ozon') return <span style={{ background: '#005BFF', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>OZON</span>
  if (shop === 'wb') return <span style={{ background: '#CB11AB', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>WB</span>
  if (shop === 'ymarket') return <span style={{ background: '#FC3F1D', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>Яндекс</span>
  return null
}

export function GiftCardNew({ gift, wishlist, friend, onBack, onBook, onCancel }: GiftCardProps) {
  const isFree = gift.status === 'free'

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      {/* Hero image */}
      <div style={{ position: 'relative', height: 260, background: gift.imageBg, flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
          <StatusBar />
        </div>
        {/* Back */}
        <button onClick={onBack} className="press" style={{ position: 'absolute', top: 56, left: 16, zIndex: 10, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        {/* Three dots */}
        <button className="press" style={{ position: 'absolute', top: 56, right: 16, zIndex: 10, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18, color: '#111' }}>
          •••
        </button>
        {/* Shop badge */}
        <div style={{ position: 'absolute', bottom: 12, left: 16, zIndex: 10 }}>
          <ShopBadge shop={gift.shop} />
        </div>
        {/* Status chip */}
        <div style={{ position: 'absolute', bottom: 12, right: 16, zIndex: 10 }}>
          <span style={{
            background: isFree ? '#EAF4DF' : '#F5F5F5',
            color: isFree ? '#D9FA85' : '#888',
            fontSize: 12,
            fontWeight: 600,
            padding: '5px 14px',
            borderRadius: 100,
          }}>
            {isFree ? 'Свободен' : 'Забронирован'}
          </span>
        </div>
        {/* Emoji */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 80 }}>{gift.image}</span>
        </div>
      </div>

      {/* Content */}
      <div className="scroll-y flex-1" style={{ padding: '20px 20px 0' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 10, lineHeight: 1.3 }}>{gift.name}</h1>

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#D9FA85' }}>{formatPrice(gift.price)}</span>
          <ShopBadge shop={gift.shop} />
          <span style={{
            background: gift.priority === 'high' ? '#EAF4DF' : '#F5F5F5',
            color: gift.priority === 'high' ? '#D9FA85' : '#888',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: 100,
          }}>
            {priorityLabel(gift.priority)}
          </span>
        </div>

        {/* Description */}
        {gift.description && (
          <p style={{ fontSize: 15, color: '#888', lineHeight: 1.6, marginBottom: 16 }}>{gift.description}</p>
        )}

        {/* Owner comment */}
        {gift.ownerComment && (
          <div style={{ marginBottom: 16, padding: '12px 14px', background: '#F9FFF5', borderRadius: 12, borderLeft: '3px solid #D9FA85' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#D9FA85', marginBottom: 6 }}>Комментарий {friend.name}</div>
            <p style={{ fontSize: 14, color: '#555', fontStyle: 'italic', lineHeight: 1.5 }}>"{gift.ownerComment}"</p>
          </div>
        )}

        {/* Action rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 24 }}>
          {isFree ? (
            <>
              {/* Book */}
              <button
                onClick={onBook}
                className="press"
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 14, background: '#D9FA85', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontSize: 22 }}>🔒</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#1A4A00' }}>Забронировать подарок</div>
                  <div style={{ fontSize: 12, color: '#3A7A00', marginTop: 2 }}>Скроем от {friend.name} и других</div>
                </div>
              </button>
              {/* Buy link */}
              <button
                className="press"
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 14, background: 'white', border: '1px solid #F0F0F0', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontSize: 22 }}>🛒</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>Купить по ссылке</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>Перейти в магазин</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
              {/* Already bought */}
              <button
                className="press"
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 14, background: 'white', border: '1px solid #F0F0F0', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontSize: 22 }}>✅</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>Уже купил</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>Отметить как купленный</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </>
          ) : (
            <>
              {/* Cancel */}
              <button
                onClick={onCancel}
                className="press"
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 14, background: 'white', border: '1px solid #FF3B30', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontSize: 22 }}>🔓</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#FF3B30' }}>Отменить бронь</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>Освободить подарок</div>
                </div>
              </button>
              {/* Buy link */}
              <button
                className="press"
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 14, background: 'white', border: '1px solid #F0F0F0', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontSize: 22 }}>🛒</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>Купить по ссылке</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>Перейти в магазин</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
