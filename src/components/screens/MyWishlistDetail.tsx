'use client'
import { StatusBar } from '../ui/StatusBar'
import { MyWishlist, formatPrice, priorityLabel } from '@/lib/data'

interface MyWishlistDetailProps {
  wishlist: MyWishlist
  onBack: () => void
  onAdd: () => void
  onShare: () => void
  onEdit: () => void
}

export function MyWishlistDetail({ wishlist, onBack, onAdd, onShare, onEdit }: MyWishlistDetailProps) {
  const bookedCount = wishlist.gifts.filter(g => g.status === 'booked').length
  const total = wishlist.gifts.length

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      {/* Navbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px', height: 52 }}>
        <button onClick={onBack} className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div />
        <button className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#111', padding: 4 }}>•••</button>
      </div>

      {/* Cover */}
      <div style={{ height: 180, background: wishlist.coverBg, position: 'relative', flexShrink: 0, display: 'flex', alignItems: 'flex-end', padding: '0 20px 16px' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', fontSize: 56 }}>
          {wishlist.coverEmoji}
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111', position: 'relative', zIndex: 1, textShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>{wishlist.name}</h1>
      </div>

      <div className="scroll-y flex-1">
        {/* Info row */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #F0F0F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: '#888' }}>{wishlist.event}</span>
            {wishlist.date && <span style={{ fontSize: 13, color: '#888' }}>· {wishlist.date}</span>}
          </div>
          {total > 0 && (
            <div style={{ fontSize: 13, color: '#888' }}>{bookedCount} из {total} подарков добавлено</div>
          )}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button
              onClick={onShare}
              className="press"
              style={{ padding: '7px 16px', borderRadius: 100, border: '1px solid #D9FA85', background: 'white', color: '#111111', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
            >
              Поделиться
            </button>
            <button
              onClick={onEdit}
              className="press"
              style={{ padding: '7px 16px', borderRadius: 100, border: '1px solid #E0E0E0', background: 'white', color: '#888', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
            >
              Редактировать
            </button>
          </div>
        </div>

        {/* Add button */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #F0F0F0' }}>
          <button
            onClick={onAdd}
            className="press"
            style={{ width: '100%', height: 54, borderRadius: 14, background: '#D9FA85', color: '#111111', fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}
          >
            + Добавить подарок
          </button>
        </div>

        {/* Gifts list */}
        <div style={{ padding: '14px 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {wishlist.gifts.map(gift => (
            <div key={gift.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, border: '1px solid #F0F0F0', background: 'white' }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: gift.imageBg, overflow: 'hidden', flexShrink: 0 }}>
                {gift.image.startsWith('http') ? (
                  <img src={gift.image} alt={gift.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{gift.image}</div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 4 }}>{gift.name}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>{formatPrice(gift.price)}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <span style={{
                  background: gift.priority === 'high' ? '#EAF4DF' : '#F5F5F5',
                  color: gift.priority === 'high' ? '#1A4A00' : '#888',
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '3px 10px',
                  borderRadius: 100,
                }}>
                  {priorityLabel(gift.priority)}
                </span>
                <button className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#C0C0C0' }}>•••</button>
              </div>
            </div>
          ))}
          {wishlist.gifts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#888', fontSize: 15 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎁</div>
              Добавьте первый подарок в вишлист
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
