'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Gift, MyWishlist, FriendRequest, MY_WISHLISTS, FRIEND_REQUESTS, FRIENDS } from './data'

interface AppStore {
  myWishlists: MyWishlist[]
  friends: typeof FRIENDS
  friendRequests: FriendRequest[]
  onboardingDone: boolean
  savedGiftIds: string[]

  setOnboardingDone: () => void
  bookGift: (wishlistId: string, giftId: string) => void
  cancelBooking: (wishlistId: string, giftId: string) => void
  acceptRequest: (id: string) => void
  declineRequest: (id: string) => void
  addGiftToWishlist: (wishlistId: string, gift: Omit<Gift, 'id' | 'status'>) => void
  createWishlist: (wl: Omit<MyWishlist, 'id' | 'gifts'>) => string
}

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      myWishlists: MY_WISHLISTS,
      friends: FRIENDS,
      friendRequests: FRIEND_REQUESTS,
      onboardingDone: false,
      savedGiftIds: [],

      setOnboardingDone: () => set({ onboardingDone: true }),

      bookGift: (wishlistId, giftId) =>
        set((state) => ({
          friends: state.friends.map(f => ({
            ...f,
            wishlists: f.wishlists.map(wl =>
              wl.id === wishlistId
                ? { ...wl, gifts: wl.gifts.map(g => g.id === giftId ? { ...g, status: 'booked' as const } : g) }
                : wl
            )
          }))
        })),

      cancelBooking: (wishlistId, giftId) =>
        set((state) => ({
          friends: state.friends.map(f => ({
            ...f,
            wishlists: f.wishlists.map(wl =>
              wl.id === wishlistId
                ? { ...wl, gifts: wl.gifts.map(g => g.id === giftId ? { ...g, status: 'free' as const } : g) }
                : wl
            )
          }))
        })),

      acceptRequest: (id) =>
        set((state) => ({ friendRequests: state.friendRequests.filter(r => r.id !== id) })),

      declineRequest: (id) =>
        set((state) => ({ friendRequests: state.friendRequests.filter(r => r.id !== id) })),

      addGiftToWishlist: (wishlistId, gift) =>
        set((state) => ({
          myWishlists: state.myWishlists.map(wl =>
            wl.id === wishlistId
              ? { ...wl, gifts: [...wl.gifts, { ...gift, id: 'g-' + Date.now(), status: 'free' as const }] }
              : wl
          )
        })),

      createWishlist: (wlData) => {
        const id = 'mwl-' + Date.now()
        set((state) => ({
          myWishlists: [...state.myWishlists, { ...wlData, id, gifts: [] }]
        }))
        return id
      },
    }),
    { name: 'ohmywishes-store-v2' }
  )
)
