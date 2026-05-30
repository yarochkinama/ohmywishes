'use client'

interface AvatarProps {
  name: string
  initials: string
  color: string
  size?: number
  className?: string
}

export function Avatar({ initials, color, size = 40, className = '' }: AvatarProps) {
  const fontSize = Math.round(size * 0.38)
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 700,
        fontSize: fontSize,
        flexShrink: 0,
        letterSpacing: 0.5,
      }}
    >
      {initials.slice(0, 2)}
    </div>
  )
}
