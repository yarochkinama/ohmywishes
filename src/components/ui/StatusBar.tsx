'use client'

export function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? '#fff' : '#111'
  return (
    <div style={{
      height: 50,
      paddingTop: 14,
      paddingLeft: 24,
      paddingRight: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'transparent',
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: c, letterSpacing: -0.3 }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Signal bars */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill={c}>
          <rect x="0" y="7" width="3" height="4" rx="1"/>
          <rect x="4.5" y="5" width="3" height="6" rx="1"/>
          <rect x="9" y="2.5" width="3" height="8.5" rx="1"/>
          <rect x="13.5" y="0" width="3" height="11" rx="1"/>
        </svg>
        {/* WiFi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill={c}>
          <path d="M8 1.4C5.6 1.4 3.3 2.4 1.6 4L0 2.5C2.1.9 4.9 0 8 0s5.9.9 8 2.5L14.4 4C12.7 2.4 10.4 1.4 8 1.4zm0 4.2c-1.6 0-3 .6-4 1.6L2.5 5.7C3.8 4.3 5.8 3.4 8 3.4s4.2.9 5.5 2.3L12 7.2c-1-.9-2.4-1.6-4-1.6zm0 4.2c-.8 0-1.5-.3-2-.8L8 7.4l2 1.6c-.5.5-1.2.8-2 .8z"/>
        </svg>
        {/* Battery */}
        <svg width="26" height="11" viewBox="0 0 26 11" fill="none">
          <rect x=".5" y=".5" width="22" height="10" rx="3" stroke={c} strokeOpacity=".35"/>
          <rect x="2" y="2" width="17" height="7" rx="1.5" fill={c}/>
          <path d="M24 3.5v4c1.1-.6 1.1-3.4 0-4z" fill={c} fillOpacity=".35"/>
        </svg>
      </div>
    </div>
  )
}
