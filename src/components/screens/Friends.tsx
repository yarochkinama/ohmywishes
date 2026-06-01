'use client'
import { useState } from 'react'
import { StatusBar } from '../ui/StatusBar'
import { Avatar } from '../ui/Avatar'
import { FRIENDS, ME } from '@/lib/data'
import { useStore } from '@/lib/store'

type FTab = 'all' | 'online' | 'requests'

interface FriendsProps {
  onFriend: (id: string) => void
  onTab: (t: string) => void
}

export function Friends({ onFriend, onTab }: FriendsProps) {
  const [tab, setTab] = useState<FTab>('all')
  const [search, setSearch] = useState('')
  const { friends, friendRequests, acceptRequest, declineRequest } = useStore()

  const tabs: { id: FTab; label: string }[] = [
    { id: 'all', label: 'Все' },
    { id: 'online', label: 'Онлайн' },
    { id: 'requests', label: `Заявки${friendRequests.length ? ` (${friendRequests.length})` : ''}` },
  ]

  const displayFriends = friends.filter(f => {
    if (tab === 'online') return f.isOnline
    return true
  })

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      <div className="scroll-y flex-1">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 20px 12px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111' }}>Друзья</h1>
          <Avatar name={ME.name} initials={ME.initials} color={ME.color} size={36} />
        </div>

        {/* Search */}
        <div style={{ margin: '0 20px 12px', background: '#F5F5F5', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск друзей"
            style={{ flex: 1, background: 'none', border: 'none', fontSize: 15, color: '#111', fontFamily: 'inherit' }}
          />
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, padding: '0 20px 16px' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="press"
              style={{
                padding: '7px 16px',
                borderRadius: 100,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                background: tab === t.id ? '#D9FA85' : 'transparent',
                color: tab === t.id ? '#1A4A00' : '#888',
                fontWeight: tab === t.id ? 600 : 500,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Friend requests */}
        {(tab === 'all' || tab === 'requests') && friendRequests.length > 0 && (
          <div style={{ padding: '0 20px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>Заявки в друзья</span>
              <button className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111111', fontSize: 13 }}>Смотреть все</button>
            </div>
            {friendRequests.map(r => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, border: '1px solid #F0F0F0', background: 'white', marginBottom: 8 }}>
                <Avatar name={r.name} initials={r.initials} color={r.color} size={44} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{r.subtitle}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => acceptRequest(r.id)}
                    className="press"
                    style={{ width: 34, height: 34, borderRadius: '50%', background: '#EAF4DF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9FA85" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </button>
                  <button
                    onClick={() => declineRequest(r.id)}
                    className="press"
                    style={{ width: 34, height: 34, borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 16 }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All friends */}
        {(tab === 'all' || tab === 'online') && (
          <div style={{ padding: '0 20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>Все друзья</span>
              <button className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: 13 }}>Сортировка ∨</button>
            </div>
            {displayFriends.map(f => (
              <button
                key={f.id}
                onClick={() => onFriend(f.id)}
                className="press"
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, border: '1px solid #F0F0F0', background: 'white', marginBottom: 8, cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ position: 'relative' }}>
                  <Avatar name={f.name} initials={f.initials} color={f.color} size={44} />
                  {f.isOnline && (
                    <div style={{ position: 'absolute', bottom: 2, right: 2, width: 10, height: 10, borderRadius: '50%', background: '#D9FA85', border: '2px solid white' }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>{f.name}</div>
                  <div style={{ fontSize: 12, color: f.isOnline ? '#3E9A00' : '#888', marginTop: 2 }}>
                    {f.isOnline ? 'Онлайн' : f.bio}
                  </div>
                </div>
                {/* Mini wishlist squares */}
                <div style={{ display: 'flex', gap: 4 }}>
                  {f.wishlists.slice(0, 3).map(wl => (
                    <div key={wl.id} style={{ width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, background: '#F5F5F5' }}>
                      {wl.coverEmoji}
                    </div>
                  ))}
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
