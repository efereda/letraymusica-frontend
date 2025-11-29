import React, { useState } from 'react';
import { postContacto } from '../api';

export default function ContactoForm(){
  const [form, setForm] = useState({ nombre:'', email:'', mensaje:'' });
  const [status, setStatus] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      await postContacto(form);
      setStatus('ok');
      setForm({ nombre:'', email:'', mensaje:'' });
    } catch(err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section className="contact container">
      <h2 className="section-title">Contacto</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Nombre
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Mensaje
          <textarea name="mensaje" value={form.mensaje} onChange={handleChange} required />
        </label>
        <button type="submit" className="btn-primary">Enviar</button>
        {status === 'sending' && <p className="status-msg">Enviando…</p>}
        {status === 'ok' && <p className="status-msg success">Gracias — tu mensaje fue recibido.</p>}
        {status === 'error' && <p className="status-msg error">Error al enviar. Intentá nuevamente.</p>}
      </form>
      <div className="contact-info">
        <p>Correo: <a href="mailto:contacto@letraymusica.com">contacto@letraymusica.com</a></p>
        <p>Instagram · Facebook: @letraymusica</p>
      </div>
    </section>
  );
}
