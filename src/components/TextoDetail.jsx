import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTexto } from '../api';

export default function TextoDetail() {
  const { id } = useParams(); 
  const [texto, setTexto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contenido, setContenido] = useState("");
  const [creditos, setCreditos] = useState("");

  useEffect(() => {
    if (id) {
      fetchTexto(id)
        .then(data => {
          setTexto(data);
          procesarContenido(data.contenido_completo);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error al cargar el detalle:", err);
          setLoading(false);
        });
    }
  }, [id]);

  // EXTRAER CAPÍTULO Y CRÉDITOS AUTOMÁTICAMENTE
  const procesarContenido = (textoCompleto) => {
    const lineas = textoCompleto.split("\n");
    
    // Buscamos la primera línea que contenga "Autora:"
    const indexCreditos = lineas.findIndex(
      l => l.trim().toLowerCase().startsWith("autora:")
    );

    if (indexCreditos !== -1) {
      const contenidoPrincipal = lineas.slice(0, indexCreditos).join("\n");
      const creditos = lineas.slice(indexCreditos).join("\n");
      setContenido(contenidoPrincipal);
      setCreditos(creditos);
    } else {
      setContenido(textoCompleto);
      setCreditos("");
    }
  };

  if (loading) {
    return <div className="container" style={{paddingTop: '3rem'}}>Cargando texto completo...</div>;
  }
  
  if (!texto) {
    return <div className="container" style={{paddingTop: '3rem'}}>Texto no encontrado.</div>;
  }

  const fechaFormateada = new Date(texto.fecha_evento).toLocaleDateString();

  // Para capitular: tomar primera letra
  const primeraLetra = contenido.charAt(0);
  const restoTexto = contenido.substring(1);

  return (
    <section className="texto-detalle container" style={{ paddingTop: "2rem" }}>
      
      {/* TÍTULO */}
      <h1 
        style={{ 
          fontFamily: "'Merriweather', serif", 
          fontSize: "2.4rem", 
          fontWeight: "700",
          marginBottom: "0.4rem"
        }}
      >
        {texto.titulo}
      </h1> 
      
      {/* METADATOS */}
      <p 
        style={{ 
          fontFamily: "'Merriweather', serif", 
          fontSize: "1rem", 
          color: "#555",
          marginBottom: "1.2rem"
        }}
      >
        <strong>Autor:</strong> {texto.autor} | <strong>Fecha del Evento:</strong> {fechaFormateada}
      </p>
      
      <hr style={{ marginBottom: "2rem" }} />

      {/* CONTENIDO PRINCIPAL CON CAPITULAR */}
      <div
        style={{
          whiteSpace: "pre-line",
          textAlign: "justify",
          fontFamily: "'Merriweather', serif",
          fontSize: "1.2rem",
          lineHeight: "1.85",
          maxWidth: "850px",
          margin: "0 auto",
          color: "#222",
          position: "relative"
        }}
      >
        {/* LETRA CAPITULAR */}
        <span
          style={{
            float: "left",
            fontSize: "4.5rem",
            lineHeight: "0.9",
            paddingRight: "12px",
            paddingTop: "8px",
            fontWeight: "700",
            fontFamily: "'Merriweather', serif",
          }}
        >
          {primeraLetra}
        </span>

        {restoTexto}
      </div>

      {/* CRÉDITOS AUTOMÁTICOS AL FINAL */}
      {creditos && (
        <div 
          style={{
            marginTop: "3rem",
            padding: "1.5rem",
            fontFamily: "'Merriweather', serif",
            fontSize: "1rem",
            lineHeight: "1.7",
            color: "#444",
            backgroundColor: "#faf7f2",
            borderLeft: "5px solid #d0b894",
            maxWidth: "850px",
            margin: "3rem auto 0 auto",
            whiteSpace: "pre-line"
          }}
        >
          <strong style={{ fontSize: "1.1rem" }}>Créditos:</strong>
          <br />
          {creditos}
        </div>
      )}

    </section>
  );
}
