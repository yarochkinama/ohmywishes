'use client'
import { useState } from 'react'
import { StatusBar } from '../ui/StatusBar'
import { Avatar } from '../ui/Avatar'
import { ME } from '@/lib/data'
import { useStore } from '@/lib/store'

interface CreateWishlistProps {
  onBack: () => void
  onCreated: (id: string) => void
}

const EMOJI_OPTIONS = ['🎂', '🎁', '🎈', '✈️', '🏡', '🎄', '🛍️', '🎨', '🎵', '🏺']
const EVENT_OPTIONS = ['День рождения', 'Новый год', 'Для дома', 'Для себя', 'Путешествия', 'Свадьба', 'Другое']

const GRADIENTS: Record<string, string> = {
  '🎂': 'linear-gradient(135deg, #EAF4DF, #D0EBBA)',
  '🎁': 'linear-gradient(135deg, #FFF0F5, #FFD6E8)',
  '🎈': 'linear-gradient(135deg, #FFF8F0, #FFE8D0)',
  '✈️': 'linear-gradient(135deg, #F0F8FF, #D0E8FF)',
  '🏡': 'linear-gradient(135deg, #FFF8F0, #FFE8D0)',
  '🎄': 'linear-gradient(135deg, #EEF2FF, #DDE6FF)',
  '🛍️': 'linear-gradient(135deg, #FFF0F5, #FFD6E8)',
  '🎨': 'linear-gradient(135deg, #FFF0F5, #FFD6E8)',
  '🎵': 'linear-gradient(135deg, #EEF2FF, #DDE6FF)',
  '🏺': 'linear-gradient(135deg, #FFF8F0, #FFE8D0)',
}

export function CreateWishlist({ onBack, onCreated }: CreateWishlistProps) {
  const [name, setName] = useState('')
  const [event, setEvent] = useState('День рождения')
  const [date, setDate] = useState('15 мая 2026')
  const [selectedEmoji, setSelectedEmoji] = useState('🎂')
  const { createWishlist } = useStore()

  const handleCreate = () => {
    if (!name.trim()) return
    const id = createWishlist({
      name: name.trim(),
      event,
      date,
      coverEmoji: selectedEmoji,
      coverBg: GRADIENTS[selectedEmoji] || 'linear-gradient(135deg, #EAF4DF, #D0EBBA)',
    })
    onCreated(id)
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px', height: 52 }}>
        <button onClick={onBack} className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#111' }}>Новый вишлист</span>
        <Avatar name={ME.name} initials={ME.initials} color={ME.color} size={32} />
      </div>

      <div className="scroll-y flex-1" style={{ padding: '8px 20px 24px' }}>
        {/* Cover preview */}
        <div style={{ height: 140, borderRadius: 16, background: GRADIENTS[selectedEmoji] || '#EAF4DF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, position: 'relative', fontSize: 64 }}>
          {selectedEmoji}
          <button className="press" style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: 8, padding: '5px 10px', fontSize: 12, color: '#111', cursor: 'pointer' }}>
            Изменить
          </button>
        </div>

        {/* Emoji options */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 10 }}>Иконка / Обложка</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {EMOJI_OPTIONS.map(e => (
              <button
                key={e}
                onClick={() => setSelectedEmoji(e)}
                className="press"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  fontSize: 24,
                  border: selectedEmoji === e ? '2.5px solid #62B830' : '2px solid transparent',
                  background: selectedEmoji === e ? '#EAF4DF' : '#F5F5F5',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 6 }}>Название</div>
          <div style={{ border: '1px solid #E0E0E0', borderRadius: 12, padding: '14px', display: 'flex', alignItems: 'center' }}>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="День рождения 2026"
              style={{ flex: 1, border: 'none', fontSize: 16, color: '#111', background: 'none', fontFamily: 'inherit' }}
            />
            <span style={{ fontSize: 20 }}>🎂</span>
          </div>
        </div>

        {/* Event */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 6 }}>Событие</div>
          <div style={{ border: '1px solid #E0E0E0', borderRadius: 12, padding: '14px 14px', display: 'flex', alignItems: 'center' }}>
            <span style={{ flex: 1, fontSize: 16, color: '#111' }}>{event}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>

        {/* Date */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 6 }}>Дата события</div>
          <div style={{ border: '1px solid #E0E0E0', borderRadius: 12, padding: '14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span style={{ flex: 1, fontSize: 16, color: '#111' }}>{date}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

        {/* Privacy */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 6 }}>Приватность</div>
          <div style={{ border: '1px solid #E0E0E0', borderRadius: 12, padding: '14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, color: '#111' }}>Доступно друзьям</div>
              <div style={{ fontSize: 12, color: '#888' }}>Только ваши друзья видят вишлист</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

        {/* Create button */}
        <button
          onClick={handleCreate}
          disabled={!name.trim()}
          className="press"
          style={{
            width: '100%',
            height: 54,
            borderRadius: 14,
            background: name.trim() ? '#62B830' : '#C0C0C0',
            color: 'white',
            fontWeight: 600,
            fontSize: 16,
            border: 'none',
            cursor: name.trim() ? 'pointer' : 'default',
          }}
        >
          Создать вишлист
        </button>
      </div>
    </div>
  )
}
