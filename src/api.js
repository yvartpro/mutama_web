const API_BASE = import.meta.env.VITE_API_BASE || '/api'

async function request(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' }
  })
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

export function getImageUrl(item) {
  if (!item) return null
  const candidate = item.heroImage ?? item.image ?? (Array.isArray(item.images) ? item.images[0] : null)
  if (!candidate) return null
  return typeof candidate === 'string' ? candidate : candidate?.url ?? null
}

export async function getApartments() {
  return request('/appartment')
}

export async function getApartment(id) {
  return request(`/appartment/${id}`)
}

export async function getRooms() {
  return request('/room')
}

export async function getPosts() {
  return request('/post')
}

export async function getRoomsByApartment(apartmentId) {
  const rooms = await getRooms()
  return rooms.filter(room => String(room.appartmentId) === String(apartmentId))
}

export async function getPostsByApartment(apartmentId) {
  const posts = await getPosts()
  return posts.filter(post => String(post.appartmentId) === String(apartmentId))
}
