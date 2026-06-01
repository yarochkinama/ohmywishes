'use client'
import { useState } from 'react'
import { StatusBar } from '../ui/StatusBar'
import { Avatar } from '../ui/Avatar'
import { ME, formatPrice } from '@/lib/data'

interface AddGiftSearchProps {
  onBack: () => void
  onGiftFound: (gift: { name: string; price: number; shop: string }) => void
}

const SEARCH_RESULTS = [
  { name: 'Apple AirPods Pro 2 (USB-C)', price: 24990, shop: 'OZON', shopColor: '#005BFF' },
  { name: 'Sony WH-1000XM5', price: 34990, shop: 'WB', shopColor: '#CB11AB' },
  { name: 'Marshall Major IV', price: 11990, shop: 'Яндекс', shopColor: '#FC3F1D' },
  { name: 'JBL Tune 760NC', price: 7990, shop: 'Мегамаркет', shopColor: '#F76C1B' },
]

const MARKETPLACES = [
  { name: 'OZON', color: '#005BFF', short: 'O' },
  { name: 'WB', color: '#CB11AB', short: 'W' },
  { name: 'Яндекс Маркет', color: '#FC3F1D', short: 'Я' },
  { name: 'Мегамаркет', color: '#F76C1B', short: 'М' },
]

const CATEGORIES = [
  { emoji: '🎧', label: 'Электроника' },
  { emoji: '🏡', label: 'Для дома' },
  { emoji: '💄', label: 'Красота' },
  { emoji: '🎡', label: 'Хобби' },
]

export function AddGiftSearch({ onBack, onGiftFound }: AddGiftSearchProps) {
  const [query, setQuery] = useState('')

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px', height: 52 }}>
        <button onClick={onBack} className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#111' }}>Найти в приложении</span>
        <Avatar name={ME.name} initials={ME.initials} color={ME.color} size={32} />
      </div>

      <div className="scroll-y flex-1" style={{ padding: '8px 20px 24px' }}>
        {/* Search */}
        <div style={{ background: '#F5F5F5', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Поиск подарков"
            style={{ flex: 1, background: 'none', border: 'none', fontSize: 15, color: '#111', fontFamily: 'inherit' }}
          />
        </div>

        {query.trim() ? (
          <>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#111', marginBottom: 14 }}>Результаты поиска</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SEARCH_RESULTS.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, border: '1px solid #F0F0F0', background: 'white' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: '#F0F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>🎧</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>{formatPrice(r.price)}</span>
                      <span style={{ background: r.shopColor, color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>{r.shop}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onGiftFound({ name: r.name, price: r.price, shop: r.shop })}
                    className="press"
                    style={{ width: 32, height: 32, borderRadius: '50%', background: '#D9FA85', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A4A00', fontSize: 18, fontWeight: 700, flexShrink: 0 }}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Marketplaces */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>Маркетплейсы</span>
                <button className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111111', fontSize: 13 }}>Смотреть все</button>
              </div>
              <div className="scroll-x" style={{ display: 'flex', gap: 12 }}>
                {MARKETPLACES.map((mp, i) => (
                  <button key={i} className="press" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: mp.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18 }}>
                      {mp.short}
                    </div>
                    <span style={{ fontSize: 11, color: '#888', textAlign: 'center', maxWidth: 60 }}>{mp.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 12 }}>Категории</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {CATEGORIES.map((cat, i) => (
                  <button key={i} className="press" style={{ border: '1px solid #F0F0F0', borderRadius: 14, background: 'white', cursor: 'pointer', padding: '16px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 28 }}>{cat.emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#111' }}>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
