'use client'
import { useState } from 'react'
import { StatusBar } from '../ui/StatusBar'
import { Avatar } from '../ui/Avatar'
import { FAVORITES, ME, formatPrice } from '@/lib/data'

function ShopBadge({ shop }: { shop: string | null }) {
  if (!shop) return null
  if (shop === 'ozon') return <span style={{ background: '#005BFF', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>OZON</span>
  if (shop === 'wb') return <span style={{ background: '#CB11AB', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>WB</span>
  if (shop === 'ymarket') return <span style={{ background: '#FC3F1D', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>Яндекс</span>
  return null
}

export function Favorites() {
  const [toggle, setToggle] = useState<'self' | 'gift'>('self')
  const [filter, setFilter] = useState<'all' | 'feed' | 'friend'>('all')

  const filtered = FAVORITES.filter(f => filter === 'all' || f.sourceType === (filter === 'feed' ? 'feed' : 'friend'))

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      <div className="scroll-y flex-1">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 20px 16px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111' }}>Избранное</h1>
          <Avatar name={ME.name} initials={ME.initials} color={ME.color} size={36} />
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', gap: 4, background: '#F5F5F5', margin: '0 20px 16px', borderRadius: 12, padding: '4px' }}>
          {(['self', 'gift'] as const).map(t => (
            <button
              key={t}
              onClick={() => setToggle(t)}
              className="press"
              style={{
                flex: 1,
                height: 36,
                borderRadius: 9,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                background: toggle === t ? '#D9FA85' : 'transparent',
                color: toggle === t ? '#1A4A00' : '#888',
              }}
            >
              {t === 'self' ? 'Хочу себе' : 'Хочу подарить'}
            </button>
          ))}
        </div>

        {/* Filter chips */}
        <div className="scroll-x" style={{ display: 'flex', gap: 8, padding: '0 20px 16px' }}>
          {([
            ['all', '+ Все'],
            ['feed', 'Из ленты'],
            ['friend', 'Из вишлистов друзей'],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className="press"
              style={{
                flexShrink: 0,
                padding: '6px 14px',
                borderRadius: 100,
                border: '1px solid',
                borderColor: filter === id ? '#D9FA85' : '#E0E0E0',
                background: filter === id ? '#EAF4DF' : 'white',
                color: filter === id ? '#D9FA85' : '#888',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px 12px' }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#111' }}>Сохранённые идеи</span>
          <button className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D9FA85', fontSize: 13, fontWeight: 500 }}>Смотреть все</button>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 20px 24px' }}>
          {filtered.map(item => (
            <div key={item.id} style={{ border: '1px solid #F0F0F0', borderRadius: 14, background: 'white', overflow: 'hidden' }}>
              {/* Image */}
              <div style={{ height: 120, background: item.imageBg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <span style={{ fontSize: 36 }}>{item.image}</span>
                <button className="press" style={{ position: 'absolute', top: 8, right: 8, background: 'white', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#D9FA85" stroke="#D9FA85" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
              </div>
              {/* Info */}
              <div style={{ padding: '10px 10px 10px' }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#111', lineHeight: 1.4, marginBottom: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#D9FA85', marginBottom: 6 }}>{formatPrice(item.price)}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, color: '#888' }}>{item.source}</span>
                  {item.sourceType === 'friend' ? (
                    <button className="press" style={{ width: 28, height: 28, borderRadius: '50%', background: '#EAF4DF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D9FA85" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  ) : (
                    <button className="press" style={{ width: 28, height: 28, borderRadius: '50%', background: '#D9FA85', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16, fontWeight: 700 }}>+</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
