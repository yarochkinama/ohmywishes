'use client'
import { StatusBar } from '../ui/StatusBar'
import { Avatar } from '../ui/Avatar'
import { ME } from '@/lib/data'
import { useStore } from '@/lib/store'

interface ProfileProps {
  onMyWishlists: () => void
}

export function Profile({ onMyWishlists }: ProfileProps) {
  const { myWishlists, friends } = useStore()

  const stats = [
    { label: 'Списков', value: ME.listsCount },
    { label: 'Друзей', value: ME.friendsCount },
    { label: 'Уведомлений', value: ME.notificationsCount },
  ]

  const menuItems = [
    { icon: '≡', label: 'Мои списки', sub: 'Ваши подборки', onPress: onMyWishlists },
    { icon: '👥', label: 'Друзья', sub: 'Ваши друзья и подписки', onPress: () => {} },
    { icon: '🔔', label: 'Уведомления', sub: 'Все важные события', onPress: () => {} },
    { icon: '⚙️', label: 'Настройки', sub: 'Аккаунт и приложение', onPress: () => {} },
  ]

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      <div className="scroll-y flex-1" style={{ padding: '4px 20px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111' }}>Профиль</h1>
          <button className="press" style={{ width: 36, height: 36, borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
        </div>

        {/* Profile card */}
        <div style={{ background: 'white', borderRadius: 20, padding: 20, marginBottom: 16, border: '1px solid #F0F0F0', textAlign: 'center' }}>
          <Avatar name={ME.name} initials={ME.initials} color={ME.color} size={64} />
          <div style={{ fontSize: 22, fontWeight: 700, color: '#111', marginTop: 12 }}>{ME.name}</div>
          <div style={{ fontSize: 14, color: '#888', marginTop: 4 }}>{ME.bio}</div>
          <button className="press" style={{ marginTop: 12, padding: '7px 20px', borderRadius: 100, border: '1px solid #E0E0E0', background: 'white', color: '#111', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            Редактировать профиль
          </button>

          {/* Stats */}
          <div style={{ display: 'flex', marginTop: 16, paddingTop: 16, borderTop: '1px solid #F0F0F0' }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{ flex: 1, textAlign: 'center', borderLeft: i > 0 ? '1px solid #F0F0F0' : 'none' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#111' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', overflow: 'hidden' }}>
          {menuItems.map((item, i) => (
            <div key={i}>
              {i > 0 && <div style={{ height: 1, background: '#F0F0F0', margin: '0 16px' }} />}
              <button
                onClick={item.onPress}
                className="press"
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: '#111' }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{item.sub}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#C0C0C0', marginTop: 24 }}>Ohmywishes v2.0 · Сделано с 💜</p>
      </div>
    </div>
  )
}
