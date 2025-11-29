import React, { useEffect, useState } from 'react'; // Importa useEffect
import bannerGaleria from '../assets/banner-galeria.jpeg';
import { fetchFotos } from '../api'; // Importa la nueva función

export default function Gallery() {
  const [modal, setModal] = useState(null);
  const [fotos, setFotos] = useState([]); // Nuevo estado para fotos
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFotos()
      .then(data => {
        // La URL que devuelve el backend será '/uploads/nombre.jpg'
        // Necesitas que la URL de Axios apunte al puerto 5000.
        const API_BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '');
        
        const adjustedFotos = data.map(f => ({
            id: f.id,
            // Construye la URL completa con el host del backend
            src: `${API_BASE_URL}${f.url}`, 
            caption: f.caption || f.fecha || 'Foto del evento'
        }));

        setFotos(adjustedFotos);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar fotos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container">Cargando galería…</div>;
  if (fotos.length === 0) return <div className="container">Aún no hay fotos publicadas.</div>;
  
  return (
    <section className="gallery">
      {/* ... (Banner se mantiene igual) ... */}

      <div className="container">
        <div className="grid">
          {/* USAMOS EL ESTADO 'fotos' */}
          {fotos.map(img => (
            <figure key={img.id} className="thumb" onClick={() => setModal(img)}>
              <img src={img.src} alt={img.caption} />
              <figcaption>{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* ... (Modal se mantiene igual, usa modal.src y modal.caption) ... */}
    </section>
  );
}