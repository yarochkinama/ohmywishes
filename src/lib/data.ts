export type Priority = 'high' | 'medium' | 'low'
export type GiftStatus = 'free' | 'booked'
export type Shop = 'ozon' | 'wb' | 'ymarket' | 'megamarket' | null

export interface Gift {
  id: string
  name: string
  description: string
  price: number
  image: string        // emoji
  imageBg: string      // hex color for bg
  shop: Shop
  priority: Priority
  status: GiftStatus
  ownerComment?: string
}

export interface MyWishlist {
  id: string
  name: string
  event: string        // 'День рождения', 'Новый год', etc.
  date: string         // '15 мая 2026'
  coverEmoji: string
  coverBg: string      // gradient or color
  gifts: Gift[]
}

export interface FriendWishlist {
  id: string
  name: string
  event: string
  date: string
  coverEmoji: string
  coverBg: string
  gifts: Gift[]
}

export interface Friend {
  id: string
  name: string
  bio: string
  initials: string
  color: string
  isOnline: boolean
  lastSeen?: string
  wishlists: FriendWishlist[]
}

export interface FriendRequest {
  id: string
  name: string
  initials: string
  color: string
  subtitle: string
}

export interface FavoriteItem {
  id: string
  name: string
  price: number
  image: string
  imageBg: string
  shop: Shop
  source: string   // 'Из ленты', 'Из вишлиста Маши', etc.
  sourceType: 'feed' | 'friend'  // friend: show arrow → button; feed: show + button
}

export const ME = {
  id: 'me',
  name: 'Маша',
  bio: 'Люблю смотреть вдвоём 💜',
  initials: 'МА',
  color: '#C4856A',
  listsCount: 4,
  friendsCount: 7,
  notificationsCount: 3,
}

export const FRIEND_REQUESTS: FriendRequest[] = [
  { id: 'req1', name: 'Катя Смирнова',  initials: 'КС', color: '#4BBFB5', subtitle: 'Хочет добавить вас' },
  { id: 'req2', name: 'Михаил Иванов',  initials: 'МИ', color: '#5B9BD4', subtitle: 'Хочет добавить вас' },
]

// Slava's gifts (main demo wishlist)
const slavaGifts: Gift[] = [
  { id: 'sg1', name: 'Apple AirPods Pro 2 (USB-C)', description: 'Активное шумоподавление, адаптивный звук и ещё более удобная посадка. Идеальны для музыки и работы.', price: 24990, image: '🎧', imageBg: '#F0F7FF', shop: 'ozon', priority: 'high', status: 'free', ownerComment: 'Хочу слушать любимую музыку в дороге и на тренировках. Буду очень рада! 💜' },
  { id: 'sg2', name: 'Парфюм Byredo Bal d\'Afrique', description: 'Пленительный парфюм с нотами африканских цветов.', price: 19500, image: '🌸', imageBg: '#FFF0F5', shop: 'ozon', priority: 'medium', status: 'booked' },
  { id: 'sg3', name: 'Плед из шерсти мериноса', description: 'Мягкий и тёплый плед из натуральной шерсти мериноса.', price: 8990, image: '🧣', imageBg: '#FFF8F0', shop: 'wb', priority: 'medium', status: 'free' },
  { id: 'sg4', name: 'Фотоаппарат Fujifilm X100VI', description: 'Компактный фотоаппарат с ретро-дизайном и современными технологиями.', price: 149990, image: '📷', imageBg: '#F5F5F5', shop: 'ozon', priority: 'high', status: 'booked' },
  { id: 'sg5', name: 'Сертификат на керамику', description: 'Мастер-класс по лепке керамики в студии.', price: 5000, image: '🏺', imageBg: '#FFF8F0', shop: null, priority: 'low', status: 'booked' },
  { id: 'sg6', name: 'Instax Mini 12', description: 'Милый фотоаппарат моментальной печати.', price: 7990, image: '📸', imageBg: '#FFF0F5', shop: 'ymarket', priority: 'high', status: 'free' },
]

export const FRIENDS: Friend[] = [
  {
    id: 'slava', name: 'Слава', bio: 'Любит музыку, технику и путешествия', initials: 'СЛ', color: '#7A9E74', isOnline: true,
    wishlists: [
      { id: 'wl-slava-bday', name: 'День рождения', event: 'День рождения', date: '12 марта 2026', coverEmoji: '🎂', coverBg: 'linear-gradient(135deg, #EAF4DF, #D0EBBA)', gifts: slavaGifts },
      { id: 'wl-slava-tech', name: 'Техника', event: 'Для себя', date: '', coverEmoji: '🎧', coverBg: 'linear-gradient(135deg, #EEF2FF, #DDE6FF)', gifts: [] },
      { id: 'wl-slava-home', name: 'Для дома', event: 'Для дома', date: '', coverEmoji: '🏡', coverBg: 'linear-gradient(135deg, #FFF8F0, #FFE8D0)', gifts: [] },
      { id: 'wl-slava-travel', name: 'Путешествия', event: 'Путешествия', date: '', coverEmoji: '✈️', coverBg: 'linear-gradient(135deg, #F0F8FF, #D0E8FF)', gifts: [] },
    ]
  },
  { id: 'masha',  name: 'Маша',   bio: 'Кофе и минимализм',           initials: 'МА', color: '#C4856A', isOnline: true,  wishlists: [] },
  { id: 'artem',  name: 'Артём',  bio: '12 вишлистов',                 initials: 'АР', color: '#9B7CC0', isOnline: false, wishlists: [] },
  { id: 'alina',  name: 'Алина',  bio: 'Была недавно',                 initials: 'АЛ', color: '#5B9BD4', isOnline: false, wishlists: [] },
  { id: 'dasha',  name: 'Даша',   bio: 'День рождения в мае',          initials: 'ДА', color: '#D46F9B', isOnline: false, wishlists: [] },
  { id: 'egor',   name: 'Егор',   bio: '6 вишлистов',                  initials: 'ЕГ', color: '#D4943A', isOnline: false, wishlists: [] },
  { id: 'sofia',  name: 'София',  bio: 'Онлайн',                       initials: 'СО', color: '#4BBFB5', isOnline: true,  wishlists: [] },
]

export const MY_WISHLISTS: MyWishlist[] = [
  {
    id: 'mwl-bday', name: 'День рождения 2026', event: 'День рождения', date: '15 мая 2026', coverEmoji: '🎂', coverBg: 'linear-gradient(135deg, #EAF4DF, #D0EBBA)',
    gifts: [
      { id: 'mwl-g1', name: 'Apple AirPods Pro 2', description: '', price: 24990, image: '🎧', imageBg: '#F0F7FF', shop: 'ozon', priority: 'high', status: 'free' },
      { id: 'mwl-g2', name: 'Умные часы Apple Watch Series 9', description: '', price: 41990, image: '⌚', imageBg: '#F5F5F5', shop: 'ozon', priority: 'medium', status: 'booked' },
      { id: 'mwl-g3', name: 'Парфюм Maison Francis Kurkdjian', description: '', price: 18500, image: '🌸', imageBg: '#FFF0F5', shop: null, priority: 'low', status: 'booked' },
      { id: 'mwl-g4', name: 'Instax Mini 12', description: '', price: 7990, image: '📸', imageBg: '#FFF5F0', shop: 'wb', priority: 'medium', status: 'free' },
      { id: 'mwl-g5', name: 'Плед из мериноса', description: '', price: 8990, image: '🧣', imageBg: '#FFF8F0', shop: 'wb', priority: 'low', status: 'booked' },
    ]
  },
  {
    id: 'mwl-ny', name: 'Новый год', event: 'Новый год', date: '1 января 2027', coverEmoji: '🎄', coverBg: 'linear-gradient(135deg, #EEF2FF, #DDE6FF)',
    gifts: []
  },
  {
    id: 'mwl-home', name: 'Для дома', event: 'Для дома', date: '', coverEmoji: '🏡', coverBg: 'linear-gradient(135deg, #FFF8F0, #FFE8D0)',
    gifts: []
  },
  {
    id: 'mwl-self', name: 'Хочу купить себе', event: 'Для себя', date: '', coverEmoji: '🛍️', coverBg: 'linear-gradient(135deg, #FFF0F5, #FFD6E8)',
    gifts: []
  },
]

export const FAVORITES: FavoriteItem[] = [
  { id: 'fav1', name: 'Аромасвеча', price: 2490, image: '🕯️', imageBg: '#FFF8F0', shop: null, source: 'Из ленты', sourceType: 'feed' },
  { id: 'fav2', name: 'Серьги с жемчугом', price: 5990, image: '💎', imageBg: '#F5F0FF', shop: null, source: 'Из вишлиста Маши', sourceType: 'friend' },
  { id: 'fav3', name: 'Наушники Sony WH-1000XM5', price: 19990, image: '🎧', imageBg: '#F0F7FF', shop: 'wb', source: 'Из ленты', sourceType: 'feed' },
  { id: 'fav4', name: 'Плед из шерсти', price: 7990, image: '🧣', imageBg: '#FFF8F0', shop: null, source: 'Для себя', sourceType: 'feed' },
  { id: 'fav5', name: 'Набор для матча', price: 3490, image: '🍵', imageBg: '#F0FFF5', shop: null, source: 'Из вишлиста Славы', sourceType: 'friend' },
  { id: 'fav6', name: 'Мини-ваза', price: 1790, image: '🏺', imageBg: '#FFF8F0', shop: null, source: 'Из ленты', sourceType: 'feed' },
]

// Home feed ideas
export const HOME_IDEAS = [
  { id: 'hi1', name: 'Сертификат на мастер-класс', price: 3990, image: '🎨', imageBg: '#FFF0F5', shop: null },
  { id: 'hi2', name: 'Аромонабор для дома', price: 2490, image: '🌿', imageBg: '#F0FFF5', shop: null },
  { id: 'hi3', name: 'Набор для матча', price: 3490, image: '🍵', imageBg: '#F0FFF5', shop: 'ozon' as Shop },
  { id: 'hi4', name: 'Кожаный кошелёк', price: 4990, image: '👛', imageBg: '#FFF8F0', shop: 'wb' as Shop },
]

export function formatPrice(p: number) {
  return p.toLocaleString('ru-RU') + ' ₽'
}

export function priorityLabel(p: Priority): string {
  return p === 'high' ? 'Высокий' : p === 'medium' ? 'Средний' : 'Низкий'
}
