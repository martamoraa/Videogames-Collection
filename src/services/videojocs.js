import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

export async function getVideojocs() {
  const q = query(collection(db, 'videojocs'), orderBy('titol'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getVideojoc(id) {
  const snap = await getDoc(doc(db, 'videojocs', id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}
