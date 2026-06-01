'use client'
import { useState } from 'react'
import { StatusBar } from '../ui/StatusBar'
import { Avatar } from '../ui/Avatar'
import { ME } from '@/lib/data'
import type { Priority } from '@/lib/data'
import { useStore } from '@/lib/store'

interface AddGiftManualProps {
  wishlistId: string
  onBack: () => void
  onSaved: () => void
}

export function AddGiftManual({ wishlistId, onBack, onSaved }: AddGiftManualProps) {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [link, setLink] = useState('')
  const [priority, setPriority] = useState<Priority>('high')
  const { addGiftToWishlist } = useStore()

  const handleSave = () => {
    if (!name.trim()) return
    addGiftToWishlist(wishlistId, {
      name: name.trim(),
      description: desc.trim(),
      price: parseInt(price.replace(/\D/g, '')) || 0,
      image: '🎁',
      imageBg: '#F5F5F5',
      shop: null,
      priority,
      ownerComment: undefined,
    })
    onSaved()
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px', height: 52 }}>
        <button onClick={onBack} className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#111' }}>Добавить вручную</span>
        <Avatar name={ME.name} initials={ME.initials} color={ME.color} size={32} />
      </div>

      <div className="scroll-y flex-1" style={{ padding: '8px 20px 24px' }}>
        {/* Name */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 6 }}>Название</div>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Введите название подарка"
            style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: 12, padding: '14px', fontSize: 16, color: '#111', background: 'white', fontFamily: 'inherit' }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 6 }}>Описание</div>
          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Расскажите подробнее о подарке"
            rows={3}
            style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: 12, padding: '14px', fontSize: 15, color: '#111', background: 'white', fontFamily: 'inherit', resize: 'none', height: 80 }}
          />
        </div>

        {/* Photo */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 6 }}>Фото</div>
          <div style={{ border: '1.5px dashed #E0E0E0', borderRadius: 12, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 28, color: '#C0C0C0' }}>+</span>
            <span style={{ fontSize: 13, color: '#C0C0C0', textAlign: 'center' }}>Загрузить фото или перетащите сюда</span>
          </div>
        </div>

        {/* Price */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 6 }}>Цена</div>
          <input
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Например: 5 500 ₽"
            style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: 12, padding: '14px', fontSize: 16, color: '#111', background: 'white', fontFamily: 'inherit' }}
          />
        </div>

        {/* Link */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 6 }}>Ссылка</div>
          <input
            value={link}
            onChange={e => setLink(e.target.value)}
            placeholder="Ссылка на товар или магазин"
            style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: 12, padding: '14px', fontSize: 16, color: '#111', background: 'white', fontFamily: 'inherit' }}
          />
        </div>

        {/* Priority */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 10 }}>Приоритет</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['high', 'medium', 'low'] as Priority[]).map(p => {
              const labels: Record<Priority, string> = { high: 'Высокий', medium: 'Средний', low: 'Низкий' }
              return (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className="press"
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    borderRadius: 100,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                    background: priority === p ? '#D9FA85' : '#F5F5F5',
                    color: priority === p ? '#1A4A00' : '#888',
                  }}
                >
                  {labels[p]}
                </button>
              )
            })}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="press"
          style={{
            width: '100%',
            height: 54,
            borderRadius: 14,
            background: name.trim() ? '#D9FA85' : '#C0C0C0',
            color: name.trim() ? '#1A4A00' : 'white',
            fontWeight: 600,
            fontSize: 16,
            border: 'none',
            cursor: name.trim() ? 'pointer' : 'default',
          }}
        >
          Добавить в вишлист
        </button>
      </div>
    </div>
  )
}
