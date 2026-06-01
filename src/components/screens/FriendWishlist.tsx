'use client'
import { useState } from 'react'
import { StatusBar } from '../ui/StatusBar'
import { Avatar } from '../ui/Avatar'
import { Friend, FriendWishlist as FriendWishlistType, formatPrice, priorityLabel } from '@/lib/data'

interface FriendWishlistProps {
  friend: Friend
  wishlist: FriendWishlistType
  onBack: () => void
  onGift: (giftId: string) => void
}

type FilterType = 'all' | 'free' | 'booked'

function PriorityBadge({ priority }: { priority: string }) {
  const high = priority === 'high'
  return (
    <span style={{
      background: high ? '#EAF4DF' : '#F5F5F5',
      color: high ? '#1A4A00' : '#888',
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

export function FriendWishlist({ friend, wishlist, onBack, onGift }: FriendWishlistProps) {
  const [filter, setFilter] = useState<FilterType>('all')

  const gifts = wishlist.gifts
  const bookedCount = gifts.filter(g => g.status === 'booked').length
  const freeCount = gifts.filter(g => g.status === 'free').length
  const total = gifts.length
  const pct = total > 0 ? (bookedCount / total) * 100 : 0

  const filtered = filter === 'free' ? gifts.filter(g => g.status === 'free') :
    filter === 'booked' ? gifts.filter(g => g.status === 'booked') : gifts

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      {/* Navbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px', height: 52 }}>
        <button onClick={onBack} className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span style={{ background: '#EAF4DF', color: '#1A4A00', padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600 }}>
          Чужой вишлист
        </span>
        <button className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg>
        </button>
      </div>

      <div className="scroll-y flex-1">
        {/* Profile header */}
        <div style={{ padding: '8px 20px 16px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <Avatar name={friend.name} initials={friend.initials} color={friend.color} size={56} />
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#111' }}>{friend.name}</div>
            <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
              {wishlist.event}{wishlist.coverEmoji ? ` ${wishlist.coverEmoji}` : ''}{wishlist.date ? ` · ${wishlist.date}` : ''}
            </div>
            <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{friend.bio}</div>
          </div>
        </div>

        {/* Progress card */}
        <div style={{ margin: '0 20px 16px', padding: '14px 16px', borderRadius: 14, border: '1px solid #F0F0F0', background: 'white', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EAF4DF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🎁</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 8 }}>{bookedCount} из {total} подарков забронировано</div>
            <div style={{ height: 4, borderRadius: 100, background: '#F0F0F0', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: '#D9FA85', borderRadius: 100 }} />
            </div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 6 }}>Осталось {freeCount} свободных</div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="scroll-x" style={{ display: 'flex', gap: 8, padding: '0 20px 16px' }}>
          {([
            ['all', `Все подарки ${total}`],
            ['free', `Свободные ${freeCount}`],
            ['booked', `Забронированные ${bookedCount}`],
          ] as [FilterType, string][]).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className="press"
              style={{
                padding: '6px 12px',
                borderRadius: 100,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: filter === id ? 600 : 400,
                background: filter === id ? '#EAF4DF' : '#F5F5F5',
                color: filter === id ? '#1A4A00' : '#888',
                flexShrink: 0,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Gifts list */}
        <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(gift => {
            const isFree = gift.status === 'free'
            return (
              <button
                key={gift.id}
                onClick={() => onGift(gift.id)}
                className="press"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 14,
                  border: '1px solid #F0F0F0',
                  background: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {/* Image */}
                <div style={{ width: 56, height: 56, borderRadius: 12, background: gift.imageBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                  {gift.image}
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{gift.name}</div>
                  <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>{formatPrice(gift.price)}</div>
                  <ShopBadge shop={gift.shop} />
                </div>
                {/* Right side */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                  <PriorityBadge priority={gift.priority} />
                  <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: isFree ? '#1A4A00' : '#888',
                    padding: '3px 10px',
                    borderRadius: 100,
                    background: isFree ? '#EAF4DF' : '#F5F5F5',
                  }}>
                    {isFree ? 'Свободен' : 'Забронирован'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
