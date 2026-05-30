'use client'
import { useState } from 'react'
import { StatusBar } from '../ui/StatusBar'
import { useStore } from '@/lib/store'

const EMOJIS = ['🎧','🌿','📚','🕯️','🧣','💄','🚁','⌨️','📖','👟','🧥','🎨','🎮','⌚','👜','🌸','🍾','🎵','🏋️','🧴']

interface AddGiftProps {
  onBack: () => void
  onSaved: () => void
  wishlistId?: string
}

export function AddGift({ onBack, onSaved, wishlistId = 'mwl-bday' }: AddGiftProps) {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [emoji, setEmoji] = useState('🎁')

  const { addGiftToWishlist } = useStore()

  const handleSave = () => {
    if (!name.trim()) return
    addGiftToWishlist(wishlistId, {
      name: name.trim(),
      description: desc.trim() || 'Описание не добавлено',
      price: parseInt(price.replace(/\D/g, '')) || 0,
      image: emoji,
      imageBg: '#F5F5F5',
      shop: null,
      priority: 'medium',
    })
    onSaved()
  }

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#F5F2EC' }}>
      <StatusBar />

      <div className="flex items-center justify-between px-5 h-[52px] flex-shrink-0">
        <button onClick={onBack} className="flex items-center text-[#111] bg-transparent border-none cursor-pointer press p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <span className="text-[17px] font-semibold text-[#111]">Новый подарок</span>
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="text-[16px] font-bold border-none bg-transparent cursor-pointer press"
          style={{ color: name.trim() ? '#6BA83A' : '#C8C8C8' }}
        >
          Готово
        </button>
      </div>

      <div className="scroll-y flex-1 px-5">
        {/* Emoji picker */}
        <div className="bg-white rounded-[18px] p-4 mb-4">
          <p className="text-[13px] font-semibold text-[#AAA] mb-3">Выбери иконку</p>
          <div className="grid grid-cols-5 gap-2">
            {EMOJIS.map(e => (
              <button
                key={e}
                onClick={() => setEmoji(e)}
                className="h-[48px] rounded-[12px] flex items-center justify-center text-[24px] border-2 transition-all press"
                style={{
                  background: emoji === e ? '#EAF4DF' : '#F8F8F6',
                  borderColor: emoji === e ? '#6BA83A' : 'transparent',
                }}
              >
                {e}
              </button>
            ))}
          </div>
          <div className="mt-3 flex justify-center">
            <div className="text-[60px]" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}>
              {emoji}
            </div>
          </div>
        </div>

        {/* Fields */}
        <div className="bg-white rounded-[18px] overflow-hidden mb-4">
          <div className="px-4 py-[14px] border-b" style={{ borderColor: '#F0F0F0' }}>
            <p className="text-[11px] font-semibold text-[#AAA] mb-1">НАЗВАНИЕ *</p>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Например: AirPods Pro"
              className="w-full text-[16px] text-[#111] bg-transparent border-none outline-none"
              style={{ fontFamily: 'inherit' }}
            />
          </div>
          <div className="px-4 py-[14px] border-b" style={{ borderColor: '#F0F0F0' }}>
            <p className="text-[11px] font-semibold text-[#AAA] mb-1">ОПИСАНИЕ</p>
            <input
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Расскажи подробнее"
              className="w-full text-[16px] text-[#111] bg-transparent border-none outline-none"
              style={{ fontFamily: 'inherit' }}
            />
          </div>
          <div className="px-4 py-[14px] border-b" style={{ borderColor: '#F0F0F0' }}>
            <p className="text-[11px] font-semibold text-[#AAA] mb-1">ЦЕНА (₽)</p>
            <input
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="24 990"
              type="number"
              className="w-full text-[16px] text-[#111] bg-transparent border-none outline-none"
              style={{ fontFamily: 'inherit' }}
            />
          </div>
          <div className="px-4 py-[14px]">
            <p className="text-[11px] font-semibold text-[#AAA] mb-1">ССЫЛКА</p>
            <input
              placeholder="https://..."
              className="w-full text-[16px] text-[#111] bg-transparent border-none outline-none"
              style={{ fontFamily: 'inherit' }}
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="w-full py-[17px] rounded-[18px] text-white font-bold text-[16px] press transition-opacity"
          style={{
            background: '#6BA83A',
            opacity: name.trim() ? 1 : 0.4,
          }}
        >
          Добавить подарок
        </button>
        <div className="h-8" />
      </div>
    </div>
  )
}
