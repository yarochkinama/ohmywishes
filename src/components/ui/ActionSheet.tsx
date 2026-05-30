'use client'
import { useEffect } from 'react'

export interface SheetAction {
  label: string
  color?: 'green' | 'red' | 'default'
  onClick: () => void
}

interface ActionSheetProps {
  actions: SheetAction[]
  onClose: () => void
}

export function ActionSheet({ actions, onClose }: ActionSheetProps) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const colorMap = {
    green: '#6BA83A',
    red: '#FF3B30',
    default: '#111',
  }

  const mainActions = actions.slice(0, -1)
  const cancelAction = actions[actions.length - 1]

  return (
    <div className="absolute inset-0 z-40 fade-in" style={{ background: 'rgba(0,0,0,0.28)' }} onClick={onClose}>
      <div
        className="absolute bottom-0 left-0 right-0 px-[10px] pb-[10px] sheet-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Main group */}
        <div className="rounded-[14px] overflow-hidden mb-2" style={{ background: 'rgba(248,248,248,0.97)', backdropFilter: 'blur(20px)' }}>
          {mainActions.map((a, i) => (
            <div key={i}>
              {i > 0 && <div className="mx-0" style={{ height: 1, background: 'rgba(0,0,0,0.1)' }} />}
              <button
                onClick={() => { a.onClick(); onClose() }}
                className="w-full py-[17px] px-5 text-[17px] text-center bg-transparent border-none cursor-pointer"
                style={{ color: colorMap[a.color || 'default'], fontWeight: a.color === 'green' || a.color === 'red' ? 600 : 400 }}
              >
                {a.label}
              </button>
            </div>
          ))}
        </div>
        {/* Cancel */}
        <div className="rounded-[14px] overflow-hidden" style={{ background: 'rgba(248,248,248,0.97)', backdropFilter: 'blur(20px)' }}>
          <button
            onClick={() => { cancelAction.onClick(); onClose() }}
            className="w-full py-[17px] px-5 text-[17px] text-center bg-transparent border-none cursor-pointer text-[#111] font-medium"
          >
            {cancelAction.label}
          </button>
        </div>
      </div>
    </div>
  )
}
