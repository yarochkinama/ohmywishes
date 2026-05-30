'use client'
import { useState, useCallback } from 'react'
import { useStore } from '@/lib/store'
import { Onboarding } from './screens/Onboarding'
import { Home } from './screens/Home'
import { Favorites } from './screens/Favorites'
import { Friends } from './screens/Friends'
import { FriendProfile } from './screens/FriendProfile'
import { FriendWishlist } from './screens/FriendWishlist'
import { GiftCardNew } from './screens/GiftCardNew'
import { BookingConfirm } from './screens/BookingConfirm'
import { MyWishlists } from './screens/MyWishlists'
import { MyWishlistDetail } from './screens/MyWishlistDetail'
import { CreateWishlist } from './screens/CreateWishlist'
import { AddGiftNew } from './screens/AddGiftNew'
import { AddGiftManual } from './screens/AddGiftManual'
import { AddGiftSearch } from './screens/AddGiftSearch'
import { ShareWishlist } from './screens/ShareWishlist'
import { Profile } from './screens/Profile'
import { BottomNav } from './ui/BottomNav'

type Screen =
  | { id: 'home' }
  | { id: 'favorites' }
  | { id: 'friends' }
  | { id: 'profile' }
  | { id: 'friendProfile'; friendId: string }
  | { id: 'friendWishlist'; friendId: string; wishlistId: string }
  | { id: 'giftCard'; friendId: string; wishlistId: string; giftId: string }
  | { id: 'bookingConfirm'; friendId: string; wishlistId: string; giftId: string }
  | { id: 'myWishlists' }
  | { id: 'myWishlistDetail'; wishlistId: string }
  | { id: 'createWishlist' }
  | { id: 'addGift'; wishlistId: string }
  | { id: 'addGiftManual'; wishlistId: string }
  | { id: 'addGiftSearch'; wishlistId: string }
  | { id: 'shareWishlist'; wishlistId: string }

const BOTTOM_NAV_SCREENS = ['home', 'favorites', 'friends', 'profile']

export function App() {
  const { onboardingDone, friends, myWishlists, bookGift, cancelBooking } = useStore()
  const [screen, setScreen] = useState<Screen>({ id: 'home' })
  const [activeTab, setActiveTab] = useState('home')
  const [dir, setDir] = useState<'fwd' | 'back'>('fwd')

  function navigate(s: Screen, direction: 'fwd' | 'back' = 'fwd') {
    setDir(direction)
    setScreen(s)
  }

  function handleTab(tab: string) {
    setActiveTab(tab)
    if (tab === 'home') navigate({ id: 'home' })
    if (tab === 'favorites') navigate({ id: 'favorites' })
    if (tab === 'friends') navigate({ id: 'friends' })
    if (tab === 'profile') navigate({ id: 'profile' })
  }

  const animClass = dir === 'fwd' ? 'slide-in-right' : 'slide-in-left'
  const showBottomNav = BOTTOM_NAV_SCREENS.includes(screen.id)

  if (!onboardingDone) {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <Onboarding />
      </div>
    )
  }

  // Helper lookups
  function getFriend(friendId: string) {
    return friends.find(f => f.id === friendId) ?? null
  }
  function getFriendWishlist(friendId: string, wishlistId: string) {
    const friend = getFriend(friendId)
    return friend?.wishlists.find(w => w.id === wishlistId) ?? null
  }
  function getGift(friendId: string, wishlistId: string, giftId: string) {
    return getFriendWishlist(friendId, wishlistId)?.gifts.find(g => g.id === giftId) ?? null
  }
  function getMyWishlist(wishlistId: string) {
    return myWishlists.find(w => w.id === wishlistId) ?? null
  }

  function renderScreen() {
    const s = screen

    if (s.id === 'home') {
      return (
        <Home
          onFriendWishlist={(friendId, wishlistId) => {
            setActiveTab('friends')
            navigate({ id: 'friendWishlist', friendId, wishlistId })
          }}
        />
      )
    }

    if (s.id === 'favorites') {
      return <Favorites />
    }

    if (s.id === 'friends') {
      return (
        <Friends
          onFriend={(friendId) => navigate({ id: 'friendProfile', friendId })}
          onTab={handleTab}
        />
      )
    }

    if (s.id === 'profile') {
      return (
        <Profile
          onMyWishlists={() => navigate({ id: 'myWishlists' })}
        />
      )
    }

    if (s.id === 'friendProfile') {
      const friend = getFriend(s.friendId)
      if (!friend) return null
      return (
        <FriendProfile
          friend={friend}
          onWishlist={(wishlistId) => navigate({ id: 'friendWishlist', friendId: s.friendId, wishlistId })}
          onBack={() => navigate({ id: 'friends' }, 'back')}
        />
      )
    }

    if (s.id === 'friendWishlist') {
      const friend = getFriend(s.friendId)
      const wishlist = getFriendWishlist(s.friendId, s.wishlistId)
      if (!friend || !wishlist) return null
      return (
        <FriendWishlist
          friend={friend}
          wishlist={wishlist}
          onBack={() => navigate({ id: 'friendProfile', friendId: s.friendId }, 'back')}
          onGift={(giftId) => navigate({ id: 'giftCard', friendId: s.friendId, wishlistId: s.wishlistId, giftId })}
        />
      )
    }

    if (s.id === 'giftCard') {
      const friend = getFriend(s.friendId)
      const wishlist = getFriendWishlist(s.friendId, s.wishlistId)
      const gift = getGift(s.friendId, s.wishlistId, s.giftId)
      if (!friend || !wishlist || !gift) return null
      return (
        <GiftCardNew
          gift={gift}
          wishlist={wishlist}
          friend={friend}
          onBack={() => navigate({ id: 'friendWishlist', friendId: s.friendId, wishlistId: s.wishlistId }, 'back')}
          onBook={() => {
            bookGift(s.wishlistId, s.giftId)
            navigate({ id: 'bookingConfirm', friendId: s.friendId, wishlistId: s.wishlistId, giftId: s.giftId })
          }}
          onCancel={() => {
            cancelBooking(s.wishlistId, s.giftId)
            navigate({ id: 'friendWishlist', friendId: s.friendId, wishlistId: s.wishlistId }, 'back')
          }}
        />
      )
    }

    if (s.id === 'bookingConfirm') {
      const friend = getFriend(s.friendId)
      // Gift comes from store after booking
      const wishlist = getFriendWishlist(s.friendId, s.wishlistId)
      const gift = getGift(s.friendId, s.wishlistId, s.giftId)
      if (!friend || !gift) return null
      return (
        <BookingConfirm
          gift={gift}
          friend={friend}
          onDone={() => navigate({ id: 'friendWishlist', friendId: s.friendId, wishlistId: s.wishlistId }, 'back')}
          onBuyLink={() => {}}
          onViewOthers={() => navigate({ id: 'friendWishlist', friendId: s.friendId, wishlistId: s.wishlistId }, 'back')}
        />
      )
    }

    if (s.id === 'myWishlists') {
      return (
        <MyWishlists
          onWishlist={(wishlistId) => navigate({ id: 'myWishlistDetail', wishlistId })}
          onCreate={() => navigate({ id: 'createWishlist' })}
          onBack={() => navigate({ id: 'profile' }, 'back')}
        />
      )
    }

    if (s.id === 'myWishlistDetail') {
      const wishlist = getMyWishlist(s.wishlistId)
      if (!wishlist) return null
      return (
        <MyWishlistDetail
          wishlist={wishlist}
          onBack={() => navigate({ id: 'myWishlists' }, 'back')}
          onAdd={() => navigate({ id: 'addGift', wishlistId: s.wishlistId })}
          onShare={() => navigate({ id: 'shareWishlist', wishlistId: s.wishlistId })}
          onEdit={() => {}}
        />
      )
    }

    if (s.id === 'createWishlist') {
      return (
        <CreateWishlist
          onBack={() => navigate({ id: 'myWishlists' }, 'back')}
          onCreated={(id) => navigate({ id: 'myWishlistDetail', wishlistId: id })}
        />
      )
    }

    if (s.id === 'addGift') {
      return (
        <AddGiftNew
          wishlistId={s.wishlistId}
          onBack={() => navigate({ id: 'myWishlistDetail', wishlistId: s.wishlistId }, 'back')}
          onLink={() => {}}
          onSearch={() => navigate({ id: 'addGiftSearch', wishlistId: s.wishlistId })}
          onManual={() => navigate({ id: 'addGiftManual', wishlistId: s.wishlistId })}
        />
      )
    }

    if (s.id === 'addGiftManual') {
      return (
        <AddGiftManual
          wishlistId={s.wishlistId}
          onBack={() => navigate({ id: 'addGift', wishlistId: s.wishlistId }, 'back')}
          onSaved={() => navigate({ id: 'myWishlistDetail', wishlistId: s.wishlistId }, 'back')}
        />
      )
    }

    if (s.id === 'addGiftSearch') {
      return (
        <AddGiftSearch
          onBack={() => navigate({ id: 'addGift', wishlistId: s.wishlistId }, 'back')}
          onGiftFound={() => navigate({ id: 'addGift', wishlistId: s.wishlistId }, 'back')}
        />
      )
    }

    if (s.id === 'shareWishlist') {
      const wishlist = getMyWishlist(s.wishlistId)
      if (!wishlist) return null
      return (
        <ShareWishlist
          wishlist={wishlist}
          onBack={() => navigate({ id: 'myWishlistDetail', wishlistId: s.wishlistId }, 'back')}
        />
      )
    }

    return null
  }

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-white">
      <div key={screen.id + JSON.stringify(screen)} className={`absolute inset-0 flex flex-col ${animClass}`}>
        <div className="flex-1 relative overflow-hidden">
          {renderScreen()}
        </div>
        {showBottomNav && (
          <BottomNav active={activeTab} onTab={handleTab} />
        )}
      </div>
    </div>
  )
}
