'use client'
import { StatusBar } from '../ui/StatusBar'
import { Avatar } from '../ui/Avatar'
import { Friend, formatPrice, priorityLabel } from '@/lib/data'

interface FriendProfileProps {
  friend: Friend
  onWishlist: (wishlistId: string) => void
  onBack: () => void
}

function PriorityBadge({ priority }: { priority: string }) {
  const high = priority === 'high'
  return (
    <span style={{
      background: high ? '#EAF4DF' : '#F5F5F5',
      color: high ? '#62B830' : '#888',
      fontSize: 11,
      fontWeight: 600,
      padding: '3px 10px',
      borderRadius: 100,
    }}>
      {priorityLabel(priority as 'high' | 'medium' | 'low')}
    </span>
  )
}

function ShopBadge({ shop }: { shop: string | null }) {
  if (!shop) return null
  if (shop === 'ozon') return <span style={{ background: '#005BFF', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>OZON</span>
  if (shop === 'wb') return <span style={{ background: '#CB11AB', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>WB</span>
  if (shop === 'ymarket') return <span style={{ background: '#FC3F1D', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>Яндекс</span>
  return null
}

export function FriendProfile({ friend, onWishlist, onBack }: FriendProfileProps) {
  const allGifts = friend.wishlists.flatMap(wl => wl.gifts)
  const highPriorityFree = allGifts.filter(g => g.priority === 'high' && g.status === 'free')
  const totalGifts = allGifts.length

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      {/* Navbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px', height: 52 }}>
        <button onClick={onBack} className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div />
        <button className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg>
        </button>
      </div>

      <div className="scroll-y flex-1">
        {/* Profile */}
        <div style={{ padding: '8px 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Avatar name={friend.name} initials={friend.initials} color={friend.color} size={64} />
          <div style={{ fontSize: 24, fontWeight: 700, color: '#111', marginTop: 12 }}>{friend.name}</div>
          <div style={{ fontSize: 14, color: '#888', marginTop: 4 }}>{friend.bio}</div>
          <div style={{ fontSize: 14, color: '#888', marginTop: 8 }}>
            {friend.wishlists.length} вишлист{friend.wishlists.length === 1 ? '' : 'ов'} · {totalGifts} идей подарков
          </div>
        </div>

        {/* Wishlists */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#111' }}>Списки {friend.name}</span>
            <button className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#62B830', fontSize: 13 }}>Смотреть все</button>
          </div>
          <div className="scroll-x" style={{ display: 'flex', gap: 10 }}>
            {friend.wishlists.map(wl => (
              <button
                key={wl.id}
                onClick={() => onWishlist(wl.id)}
                className="press"
                style={{ flexShrink: 0, width: 90, border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
              >
                <div style={{ width: 80, height: 80, borderRadius: 16, background: wl.coverBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                  {wl.coverEmoji}
                </div>
                <span style={{ fontSize: 11, color: '#111', fontWeight: 500, textAlign: 'center' }}>{wl.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* High priority gifts */}
        {highPriorityFree.length > 0 && (
          <div style={{ padding: '0 20px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: '#111' }}>Высокий приоритет</span>
            </div>
            {highPriorityFree.map(gift => (
              <div key={gift.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, border: '1px solid #F0F0F0', background: 'white', marginBottom: 8 }}>
                <div style={{ width: 56, height: 56, borderRadius: 12, background: gift.imageBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                  {gift.image}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{gift.name}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#62B830' }}>{formatPrice(gift.price)}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                  <PriorityBadge priority={gift.priority} />
                  <ShopBadge shop={gift.shop} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* See all button */}
        <div style={{ padding: '0 20px 32px' }}>
          <button
            onClick={() => friend.wishlists[0] && onWishlist(friend.wishlists[0].id)}
            className="press"
            style={{ width: '100%', height: 54, borderRadius: 14, border: '1.5px solid #62B830', background: 'white', color: '#62B830', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
          >
            Посмотреть все подарки {friend.name}
          </button>
        </div>
      </div>
    </div>
  )
}
