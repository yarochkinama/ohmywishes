'use client'
import { StatusBar } from '../ui/StatusBar'
import { Avatar } from '../ui/Avatar'
import { ME } from '@/lib/data'

interface AddGiftNewProps {
  wishlistId: string
  onBack: () => void
  onLink: () => void
  onSearch: () => void
  onManual: () => void
}

export function AddGiftNew({ wishlistId: _wishlistId, onBack, onLink, onSearch, onManual }: AddGiftNewProps) {
  const options = [
    {
      emoji: '🔗',
      label: 'Вставить ссылку',
      sub: 'Добавьте подарок по ссылке любого сайта',
      onPress: onLink,
    },
    {
      emoji: '🔍',
      label: 'Найти в приложении',
      sub: 'Ищите среди магазинов, категорий и подборок',
      onPress: onSearch,
    },
    {
      emoji: '✏️',
      label: 'Добавить вручную',
      sub: 'Заполните данные товара самостоятельно',
      onPress: onManual,
    },
  ]

  const categories = [
    { emoji: '🎧', label: 'Техника' },
    { emoji: '🏡', label: 'Для дома' },
    { emoji: '💄', label: 'Красота' },
    { emoji: '🎡', label: 'Впечатления' },
  ]

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px', height: 52 }}>
        <button onClick={onBack} className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#111' }}>Добавить подарок</span>
        <Avatar name={ME.name} initials={ME.initials} color={ME.color} size={32} />
      </div>

      <div className="scroll-y flex-1" style={{ padding: '8px 20px 24px' }}>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 20, lineHeight: 1.5 }}>
          Добавьте подарок любым удобным способом — мы сохраним его в ваш вишлист.
        </p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={opt.onPress}
              className="press"
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 16px', borderRadius: 14, border: '1px solid #F0F0F0', background: 'white', cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EAF4DF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                {opt.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 3 }}>{opt.label}</div>
                <div style={{ fontSize: 13, color: '#888' }}>{opt.sub}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          ))}
        </div>

        {/* Inspiration */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#111' }}>Идеи вдохновения</span>
            <button className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#62B830', fontSize: 13 }}>Смотреть все</button>
          </div>
          <div className="scroll-x" style={{ display: 'flex', gap: 10 }}>
            {categories.map((cat, i) => (
              <button key={i} className="press" style={{ flexShrink: 0, width: 80, height: 80, border: '1px solid #F0F0F0', borderRadius: 16, background: 'white', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <span style={{ fontSize: 28 }}>{cat.emoji}</span>
                <span style={{ fontSize: 10, color: '#888', textAlign: 'center' }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
