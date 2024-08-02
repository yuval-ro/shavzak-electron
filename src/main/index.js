/**
 * @file /src/main/index.js
 */
import { app, shell, BrowserWindow, ipcMain, systemPreferences } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import PouchDB from 'pouchdb'

systemPreferences.getAnimationSettings() // NOTE Fixes prefers-reduced-motion bug

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    if (is.dev) {
      mainWindow.webContents.openDevTools({ mode: 'right' })
    }
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

const db = {
  people: new PouchDB('db/people'),
  vehicles: new PouchDB('db/vehicles'),
  campTasks: new PouchDB('db/campTasks')
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  ipcMain.handle('docs/read-all', async (event, { collection }) => {
    if (!collection) {
      throw new Error()
    }
    const pouch = db[collection]
    if (!pouch) {
      throw new Error()
    }
    const query = await pouch.allDocs({ include_docs: true })
    return query.rows.map((row) => row.doc)
  })
  ipcMain.handle('docs/put-one', async (event, { collection, document }) => {
    if (!(collection && document)) {
      throw new Error()
    }
    const pouch = db[collection]
    if (!pouch) {
      throw new Error()
    }
    if (!document._id) {
      document._id = crypto.randomUUID()
    }
    const { id } = await pouch.put(document)
    const dbDocument = await pouch.get(id)
    return dbDocument
  })
  ipcMain.handle('docs/remove-one', async (event, { collection, document }) => {
    if (!(collection && document)) {
      throw new Error()
    }
    const pouch = db[collection]
    if (!pouch) {
      throw new Error()
    }
    const { id } = await pouch.remove(document)
    return id
  })
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
