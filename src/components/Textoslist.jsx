import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTextos } from '../api'; // ⬅️ Cambio: Se elimina la extensión '.js'
// import { fetchTextos } from '../api.js'; // Versión anterior

// Se elimina la importación del banner para evitar el error de resolución de assets.
// import bannerTextos from '../assets/banner-textos.jpeg'; 

// Función auxiliar para obtener las primeras 15 palabras del extracto
const truncarExtracto = (extracto) => {
    if (!extracto) return "";
    return extracto.split(' ').slice(0, 15).join(' ') + '...';
};

export default function TextosList() {
    // Definición de estado
    const [textos, setTextos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lógica para cargar los datos
    useEffect(() => {
        fetchTextos()
            .then(data => {
                setTextos(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar textos:", err);
                setLoading(false);
            });
    }, []);

    // Muestra un mensaje de carga mientras se obtienen los datos
    if (loading) return <div className="container" style={{paddingTop: '3rem'}}>Cargando textos…</div>;

    // URL de placeholder como alternativa al asset que da error
    const PLACEHOLDER_BANNER_URL = 'https://placehold.co/1200x200/4F46E5/ffffff?text=Seccion+Textos';

    return (
        <section className="textos">
            {/* Banner de la sección: Usamos la URL de placeholder en lugar del asset importado */}
            <div className="banner" style={{ backgroundImage: `url(${PLACEHOLDER_BANNER_URL})` }}>
                <div className="banner-overlay">
                    <h2>Textos</h2>
                </div>
            </div>

            <div className="container">
                <div className="list">
                    {/* Verificación si no hay textos */}
                    {textos.length === 0 && <p>No hay textos publicados.</p>}
                    
                    {/* Mapeo de los textos en tarjetas (Links) */}
                    {textos.map(t => (
                        <Link 
                            key={t.id} 
                            to={`/textos/${t.id}`} // Enlace dinámico a la URL de detalle
                            className="texto-card" // Estilos de tarjeta moderna
                        >
                            <h3>{t.titulo}</h3>
                            <p className="meta">{t.autor} — {new Date(t.fecha_evento).toLocaleDateString()}</p>
                            {/* Mostrar el extracto truncado */}
                            <p>{truncarExtracto(t.extracto)}</p> 
                            <span className="leer-mas">Leer texto completo &rarr;</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}