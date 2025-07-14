import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    where,
} from "firebase/firestore/lite"

// Firebase API
const firebaseConfig = {
    apiKey: "AIzaSyAufOL3o7-f0M65DAx7GLIJ1t0a0TZXuDk",
    authDomain: "van-life-p.firebaseapp.com",
    projectId: "van-life-p",
    storageBucket: "van-life-p.firebasestorage.app",
    messagingSenderId: "995766591296",
    appId: "1:995766591296:web:b87d6446b504ccef4024a5",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)

    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)

    return { ...snapshot.data(), id: snapshot.id }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

// Mirage API
export async function getVansMirage(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status,
        }
    }
    const data = await res.json()
    return data.vans
}

export async function getHostVansMirage(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status,
        }
    }
    const data = await res.json()
    return data.vans
}

// Utility functions

// A function whose only purpose is to delay execution
// for the specified # of milliseconds when used w/ `await`
// e.g. inside an async function:
// await sleep(2000)  => pauses the function for 2 seconds before moving on
function sleep(ms) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms))
}

export async function loginUser(creds) {
    const res = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify(creds),
    })
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status,
        }
    }

    return data
}
