'use client'
import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  type?: 'green' | 'grey'
  onDone: () => void
}

export function Toast({ message, type = 'green', onDone }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 250)
    }, 2500)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      className={`absolute top-[62px] left-5 right-5 z-50 rounded-[13px] px-4 py-[13px] text-center text-[14px] font-semibold pointer-events-none transition-opacity duration-200 toast-pop`}
      style={{
        background: type === 'green' ? '#D9FA85' : '#888',
        color: type === 'green' ? '#1A4A00' : 'white',
        opacity: visible ? 1 : 0,
      }}
    >
      {message}
    </div>
  )
}
