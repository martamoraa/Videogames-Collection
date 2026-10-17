import { readFileSync } from 'node:fs'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'))
const games = JSON.parse(readFileSync('./data/videojocs.json', 'utf8'))

initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore()

const batch = db.batch()
for (const game of games) {
  batch.set(db.collection('videojocs').doc(), game)
}
await batch.commit()

console.log(`${games.length} videojocs afegits a la col·lecció "videojocs".`)
