'use client'
import { useState } from 'react'
import { StatusBar } from '../ui/StatusBar'
import { Avatar } from '../ui/Avatar'
import { ME } from '@/lib/data'
import { useStore } from '@/lib/store'

interface MyWishlistsProps {
  onWishlist: (id: string) => void
  onCreate: () => void
  onBack: () => void
}

export function MyWishlists({ onWishlist, onCreate, onBack }: MyWishlistsProps) {
  const [bannerVisible, setBannerVisible] = useState(true)
  const { myWishlists } = useStore()

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px', height: 52 }}>
        <button onClick={onBack} className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#111' }}>Мои вишлисты</span>
        <Avatar name={ME.name} initials={ME.initials} color={ME.color} size={32} />
      </div>

      <div className="scroll-y flex-1" style={{ padding: '0 20px 24px' }}>
        {/* Banner */}
        {bannerVisible && (
          <div style={{ background: '#EAF4DF', borderRadius: 14, padding: '14px 14px 14px', marginBottom: 16, position: 'relative' }}>
            <button onClick={() => setBannerVisible(false)} style={{ position: 'absolute', top: 10, right: 12, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#888' }}>✕</button>
            <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5, paddingRight: 20 }}>
              Разделяйте желания по событиям и поводам — так друзьям проще подарить именно то, что вы хотите.
            </p>
          </div>
        )}

        {/* Create button */}
        <button
          onClick={onCreate}
          className="press"
          style={{ width: '100%', height: 52, borderRadius: 14, border: 'none', background: '#D9FA85', color: '#111111', fontWeight: 600, fontSize: 16, cursor: 'pointer', marginBottom: 16 }}
        >
          + Создать вишлист
        </button>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {myWishlists.map(wl => {
            const bookedCount = wl.gifts.filter(g => g.status === 'booked').length
            const total = wl.gifts.length
            const pct = total > 0 ? (bookedCount / total) * 100 : 0

            return (
              <button
                key={wl.id}
                onClick={() => onWishlist(wl.id)}
                className="press"
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px', borderRadius: 14, border: '1px solid #F0F0F0', background: 'white', cursor: 'pointer', textAlign: 'left' }}
              >
                {/* Cover */}
                <div style={{ width: 64, height: 64, borderRadius: 14, background: wl.coverBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                  {wl.coverEmoji}
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#111', marginBottom: 3 }}>{wl.name}</div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>{total} подарков</div>
                  {total > 0 && (
                    <>
                      <div style={{ height: 4, borderRadius: 100, background: '#F0F0F0', overflow: 'hidden', marginBottom: 4 }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: '#D9FA85', borderRadius: 100 }} />
                      </div>
                      <div style={{ fontSize: 11, color: '#888' }}>{bookedCount} из {total} добавлено</div>
                    </>
                  )}
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
