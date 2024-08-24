import { useState } from 'react'
import { ThemeProvider } from 'react-bootstrap'

import { StoreProvider } from '#src/store'
import { ContextMenu } from '#src/components'

export default function Providers({ children }) {
  const [dir, setDir] = useState('rtl')
  return (
    <div dir={dir}>
      <StoreProvider>
        <ThemeProvider dir={dir}>
          <ContextMenu.Provider dir={dir} width={200}>
            {children}
          </ContextMenu.Provider>
        </ThemeProvider>
      </StoreProvider>
    </div>
  )
}
