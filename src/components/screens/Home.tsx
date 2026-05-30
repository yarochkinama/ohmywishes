'use client'
import { StatusBar } from '../ui/StatusBar'
import { Avatar } from '../ui/Avatar'
import { FRIENDS, HOME_IDEAS, ME, formatPrice } from '@/lib/data'

interface HomeProps {
  onFriendWishlist: (friendId: string, wishlistId: string) => void
}

const categories = [
  { emoji: '💐', label: 'для неё' },
  { emoji: '🎮', label: 'для него' },
  { emoji: '🎂', label: 'день рождения' },
  { emoji: '🎡', label: 'впечатления' },
]

const quickActions = [
  { emoji: '🎁', label: 'Подобрать подарок', sub: 'Идти по парам шагов' },
  { emoji: '💚', label: 'Вишлист друга', sub: 'Выбрать из вишлиста' },
  { emoji: '👤', label: 'Квиз получателя', sub: 'Угадать, что хочет' },
  { emoji: '🔧', label: 'Фильтры и поводы', sub: 'Уточнить выбор' },
]

function ShopBadge({ shop }: { shop: string | null }) {
  if (!shop) return null
  if (shop === 'ozon') return <span style={{ background: '#005BFF', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>OZON</span>
  if (shop === 'wb') return <span style={{ background: '#CB11AB', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>WB</span>
  if (shop === 'ymarket') return <span style={{ background: '#FC3F1D', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>Яндекс</span>
  return null
}

export function Home({ onFriendWishlist }: HomeProps) {
  const slava = FRIENDS.find(f => f.id === 'slava')

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar />
      <div className="scroll-y flex-1">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 20px 16px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111', margin: 0 }}>Идеи подарков</h1>
          <Avatar name={ME.name} initials={ME.initials} color={ME.color} size={36} />
        </div>

        {/* Hero card */}
        <div style={{ margin: '0 20px 20px', borderRadius: 16, background: 'linear-gradient(135deg, #EAF4DF, #D0EBBA)', padding: '16px 16px 12px', position: 'relative', overflow: 'hidden', minHeight: 110 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#111', lineHeight: 1.2, marginBottom: 6 }}>
                Подобрать<br />подарок
              </div>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>Быстрый квиз подберёт идеи за 1 минуту</div>
              <button
                className="press"
                style={{ background: '#6BA83A', color: 'white', fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 100, border: 'none', cursor: 'pointer' }}
              >
                Пройти квиз →
              </button>
            </div>
            <span style={{ fontSize: 50, marginLeft: 12 }}>🎁</span>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 20px 20px' }}>
          {quickActions.map((qa, i) => (
            <button
              key={i}
              className="press"
              onClick={() => {
                if (i === 1 && slava && slava.wishlists[0]) {
                  onFriendWishlist(slava.id, slava.wishlists[0].id)
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 12px',
                borderRadius: 16,
                border: '1px solid #F0F0F0',
                background: 'white',
                cursor: 'pointer',
                textAlign: 'left',
                minHeight: 70,
              }}
            >
              <span style={{ fontSize: 22 }}>{qa.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#111', lineHeight: 1.3 }}>{qa.label}</div>
                <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{qa.sub}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          ))}
        </div>

        {/* Categories */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#111' }}>Популярные категории</span>
            <button className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6BA83A', fontSize: 13, fontWeight: 500 }}>Смотреть все</button>
          </div>
          <div className="scroll-x" style={{ display: 'flex', gap: 10 }}>
            {categories.map((cat, i) => (
              <button key={i} className="press" style={{ flexShrink: 0, width: 80, border: '1px solid #F0F0F0', borderRadius: 16, background: 'white', cursor: 'pointer', padding: '12px 8px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 28 }}>{cat.emoji}</span>
                <span style={{ fontSize: 10, color: '#888', textAlign: 'center', lineHeight: 1.3 }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Ideas grid */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#111' }}>Идеи для вас</span>
            <button className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6BA83A', fontSize: 13, fontWeight: 500 }}>Ещё идеи</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {HOME_IDEAS.map(idea => (
              <div key={idea.id} style={{ border: '1px solid #F0F0F0', borderRadius: 14, background: 'white', overflow: 'hidden' }}>
                <div style={{ height: 120, background: idea.imageBg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontSize: 40 }}>{idea.image}</span>
                  <button className="press" style={{ position: 'absolute', top: 8, right: 8, background: 'white', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                </div>
                <div style={{ padding: '10px 10px 10px' }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#111', lineHeight: 1.4, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{idea.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#6BA83A' }}>{formatPrice(idea.price)}</span>
                    <button className="press" style={{ width: 28, height: 28, borderRadius: '50%', background: '#6BA83A', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16, fontWeight: 700 }}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Friend wishlists */}
        <div style={{ padding: '0 20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#111' }}>Вишлисты друзей</span>
            <button className="press" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6BA83A', fontSize: 13, fontWeight: 500 }}>Смотреть все</button>
          </div>
          <div className="scroll-x" style={{ display: 'flex', gap: 10 }}>
            {FRIENDS.slice(0, 4).map(friend => (
              <button
                key={friend.id}
                className="press"
                onClick={() => {
                  if (friend.wishlists.length > 0) {
                    onFriendWishlist(friend.id, friend.wishlists[0].id)
                  }
                }}
                style={{ flexShrink: 0, width: 110, border: '1px solid #F0F0F0', borderRadius: 16, background: 'white', cursor: 'pointer', padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
              >
                <Avatar name={friend.name} initials={friend.initials} color={friend.color} size={40} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#111' }}>{friend.name}</span>
                <span style={{ fontSize: 11, color: '#888' }}>{friend.wishlists.length} вишлист{friend.wishlists.length === 1 ? '' : 'ов'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
