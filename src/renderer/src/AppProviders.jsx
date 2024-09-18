import { useState } from 'react'
import { ThemeProvider } from 'react-bootstrap'

import { Provider as StoreProvider } from '#src/store'
import { ContextMenu, Modal } from '#src/components'

export default function AppProviders({ children }) {
  const [dir, setDir] = useState('rtl')
  return (
    <div dir={dir}>
      <StoreProvider>
        <ThemeProvider dir={dir}>
          <ContextMenu.Provider dir={dir} width={180}>
            <Modal.Provider>{children}</Modal.Provider>
          </ContextMenu.Provider>
        </ThemeProvider>
      </StoreProvider>
    </div>
  )
}
