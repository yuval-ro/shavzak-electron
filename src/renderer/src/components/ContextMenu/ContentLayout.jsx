import { useContext } from 'react'

import Context from './Context'

export default function ContentLayout({ label, icon }) {
  const { dir } = useContext(Context)

  return (
    <div style={{ direction: dir, display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          minWidth: icon ? '2rem' : 0,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {icon}
      </div>
      {label}
    </div>
  )
}
