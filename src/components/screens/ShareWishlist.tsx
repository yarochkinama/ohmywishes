'use client'
import { StatusBar } from '../ui/StatusBar'
import { Avatar } from '../ui/Avatar'
import { ME, MyWishlist } from '@/lib/data'

interface ShareWishlistProps {
  wishlist: MyWishlist
  onBack: () => void
}

const shareOptions = [
  { icon: '🔗', label: 'Скопировать ссылку', sub: 'Ссылка на ваш вишлист' },
  { icon: '✈️', label: 'Telegram', sub: 'Отправить в Telegram', color: '#229ED9' },
  { icon: '💬', label: 'WhatsApp', sub: 'Отправить в WhatsApp', color: '#25D366' },
  { icon: '▣', label: 'QR-код', sub: 'Показать код для сканирования' },
]

export function ShareWishlist({ wishlist, onBack }: ShareWishlistProps) {
  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px', height: 52 }}>
        <button onClick={onBack} className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#111' }}>Поделиться вишлистом</span>
        <div style={{ width: 32 }} />
      </div>

      <div className="scroll-y flex-1" style={{ padding: '8px 20px 32px' }}>
        {/* Mini card */}
        <div style={{ border: '1px solid #F0F0F0', borderRadius: 16, padding: '14px 16px', marginBottom: 24, display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 14, background: wishlist.coverBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
            {wishlist.coverEmoji}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 3 }}>{wishlist.name}</div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>{wishlist.gifts.length} идей · обновлён сегодня</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar name={ME.name} initials={ME.initials} color={ME.color} size={20} />
              <span style={{ fontSize: 12, color: '#888' }}>{ME.name}</span>
            </div>
          </div>
        </div>

        {/* Share options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {shareOptions.map((opt, i) => (
            <button
              key={i}
              className="press"
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 14, border: '1px solid #F0F0F0', background: 'white', cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 12, background: (opt as { color?: string }).color ? (opt as { color: string }).color : '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, color: (opt as { color?: string }).color ? 'white' : '#111' }}>
                {opt.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>{opt.label}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{opt.sub}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          ))}
        </div>

        {/* Link section */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Ваша ссылка</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, background: '#F5F5F5' }}>
            <span style={{ flex: 1, fontSize: 13, color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              giftly.app/wishlist/masha-bday-2026
            </span>
            <button className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#62B830" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
        </div>

        {/* QR placeholder */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ width: 140, height: 140, border: '1.5px dashed #E0E0E0', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 48, color: '#C0C0C0' }}>▣</span>
            <span style={{ fontSize: 11, color: '#C0C0C0' }}>QR-код</span>
          </div>
        </div>

        {/* Copy button */}
        <button
          className="press"
          style={{ width: '100%', height: 54, borderRadius: 14, background: '#62B830', color: 'white', fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg>
          Скопировать ссылку
        </button>
      </div>
    </div>
  )
}
