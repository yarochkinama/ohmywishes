'use client'

const tabs = [
  { id: 'home',      label: 'Главная',   icon: (on: boolean) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill={on ? '#62B830' : 'none'} stroke={on ? '#62B830' : '#C0C0C0'} strokeWidth={on ? 2.2 : 1.8}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22" fill="none"/>
    </svg>
  )},
  { id: 'favorites', label: 'Избранное', icon: (on: boolean) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill={on ? '#62B830' : 'none'} stroke={on ? '#62B830' : '#C0C0C0'} strokeWidth={on ? 2.2 : 1.8}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )},
  { id: 'friends',   label: 'Друзья',    icon: (on: boolean) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={on ? '#62B830' : '#C0C0C0'} strokeWidth={on ? 2.2 : 1.8}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )},
  { id: 'profile',   label: 'Профиль',   icon: (on: boolean) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={on ? '#62B830' : '#C0C0C0'} strokeWidth={on ? 2.2 : 1.8}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )},
]

interface BottomNavProps {
  active: string
  onTab: (id: string) => void
}

export function BottomNav({ active, onTab }: BottomNavProps) {
  return (
    <nav style={{
      display: 'flex',
      background: '#FFFFFF',
      borderTop: '1px solid #F0F0F0',
      flexShrink: 0,
      height: 82,
      paddingBottom: 16,
    }}>
      {tabs.map(t => {
        const on = t.id === active
        return (
          <button
            key={t.id}
            onClick={() => onTab(t.id)}
            className="press"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              border: 'none',
              background: 'transparent',
              color: on ? '#62B830' : '#C0C0C0',
              padding: 0,
            }}
          >
            {t.icon(on)}
            <span style={{ fontSize: 10, fontWeight: 500, color: on ? '#62B830' : '#C0C0C0' }}>{t.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
