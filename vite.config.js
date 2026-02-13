import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const notesFilePath = path.resolve(__dirname, 'public/notes/notes.json')

const monthNames = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

const formatDate = (date) =>
  `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

const readRequestBody = (req) =>
  new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })

const parseNotes = async () => {
  try {
    const raw = await fs.readFile(notesFilePath, 'utf8')
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

const notesApiPlugin = () => {
  const handler = async (req, res) => {
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Allow', 'POST')
      res.end('Method Not Allowed')
      return
    }

    try {
      const rawBody = await readRequestBody(req)
      const payload = rawBody ? JSON.parse(rawBody) : {}
      const title = String(payload.title || '').trim()
      const text = String(payload.text || '').trim()
      const authorRaw = String(payload.author || '').trim()
      const author = authorRaw || 'visitor'

      if (!title || !text) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Title and note text are required.' }))
        return
      }

      const notes = await parseNotes()
      const maxId = notes.reduce((max, note) => {
        const id = Number(note.id)
        return Number.isFinite(id) && id > max ? id : max
      }, 0)

      const newNote = {
        id: maxId + 1,
        title,
        date: formatDate(new Date()),
        text,
        author,
      }

      const nextNotes = [...notes, newNote]
      await fs.writeFile(notesFilePath, JSON.stringify(nextNotes, null, 2))

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: true, note: newNote }))
    } catch (error) {
      console.error('Failed to save note', error)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Failed to save note.' }))
    }
  }

  return {
    name: 'notes-api',
    configureServer(server) {
      server.middlewares.use('/api/notes', handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/notes', handler)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), notesApiPlugin()],
})
