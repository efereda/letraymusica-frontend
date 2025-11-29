import React, { useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    fecha_evento: '', // Formato YYYY-MM-DD
    extracto: '',
    contenido_completo: ''
  });
  const [mensaje, setMensaje] = useState('');

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/textos`, form);
      setMensaje('¡Texto subido con éxito!');
      setForm({ titulo: '', autor: '', fecha_evento: '', extracto: '', contenido_completo: '' });
    } catch (error) {
      console.error(error);
      setMensaje('Hubo un error al subir el texto.');
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>Panel de Administración - Subir Texto</h2>
      {mensaje && <p style={{ fontWeight: 'bold', color: mensaje.includes('error') ? 'red' : 'green' }}>{mensaje}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
        <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
        <input name="autor" placeholder="Autor" value={form.autor} onChange={handleChange} required />
        <input name="fecha_evento" type="date" value={form.fecha_evento} onChange={handleChange} required />
        <textarea name="extracto" placeholder="Extracto corto (para la lista)" value={form.extracto} onChange={handleChange} required rows="3" />
        <textarea name="contenido_completo" placeholder="Contenido completo (opcional)" value={form.contenido_completo} onChange={handleChange} rows="6" />
        <button type="submit" className="btn-primary">Publicar Texto</button>
      </form>
    </div>
  );
}