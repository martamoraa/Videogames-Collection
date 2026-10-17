import { ref } from 'vue'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth'
import { auth } from '../firebase'

const DOMINI = '@videojocs.local'
const PATRO_USUARI = /^[a-z0-9._-]{3,20}$/

export const usuari = ref(null)

onAuthStateChanged(auth, (u) => {
  usuari.value = u
})

const correu = (nom) => nom.trim().toLowerCase() + DOMINI

function comprovaNom(nom) {
  if (!PATRO_USUARI.test(nom.trim().toLowerCase())) {
    const e = new Error('nom-invalid')
    e.code = 'app/nom-invalid'
    throw e
  }
}

export function iniciarSessio(nom, contrasenya) {
  comprovaNom(nom)
  return signInWithEmailAndPassword(auth, correu(nom), contrasenya)
}

export async function registrar(nom, contrasenya) {
  comprovaNom(nom)
  const cred = await createUserWithEmailAndPassword(auth, correu(nom), contrasenya)
  await updateProfile(cred.user, { displayName: nom.trim() })
  return cred
}

export const sortir = () => signOut(auth)

export function missatgeError(e) {
  switch (e?.code) {
    case 'app/nom-invalid':
      return "L'usuari ha de tenir entre 3 i 20 caràcters: lletres, números, punts, guions o guions baixos."
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Usuari o contrasenya incorrectes.'
    case 'auth/email-already-in-use':
      return 'Aquest usuari ja existeix.'
    case 'auth/weak-password':
      return 'La contrasenya ha de tenir almenys 6 caràcters.'
    case 'auth/operation-not-allowed':
      return "El registre no està activat a Firebase (Authentication > Mètode d'inici de sessió > Correu electrònic i contrasenya)."
    case 'auth/too-many-requests':
      return 'Massa intents. Espera una estona i torna-ho a provar.'
    default:
      return "No s'ha pogut completar l'operació. Torna-ho a provar."
  }
}
