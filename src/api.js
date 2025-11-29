import axios from 'axios'

// Si no existe VITE_API_URL toma este fallback (sin comillas extra)
const API_BASE = import.meta.env.VITE_API_URL || "https://letraymusica-backend.onrender.com/api";

export async function fetchTextos(){
  const res = await axios.get(`${API_BASE}/textos`)
  return res.data
}

export async function fetchTexto(id){
  const res = await axios.get(`${API_BASE}/textos/${id}`)
  return res.data
}

export async function postContacto(payload){
  const res = await axios.post(`${API_BASE}/contacto`, payload)
  return res.data
}

export async function fetchFotos(){
  const res = await axios.get(`${API_BASE}/fotos`)
  return res.data
}
