import { useEffect } from "react";
import "./styles.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Gallery from "./components/Gallery";
import TextosList from "./components/Textoslist";
import Footer from "./components/Footer";
import heroHome from "./assets/hero-home.jpeg";
import TextoDetail from "./components/TextoDetail";

export default function App() {

  // 🟢 PRECALENTAR BACKEND RENDER
  useEffect(() => {
    const API = import.meta.env.VITE_API_URL;

    if (!API) {
      console.error("❌ VITE_API_URL no está definida");
      return;
    }

    fetch(`${API}/textos`)
      .then(() => console.log("🔥 Backend precalentado"))
      .catch(() => console.log("😴 Backend dormido, intentando despertar…"));
  }, []);

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/textos" element={<TextosList />} />
          <Route path="/textos/:id" element={<TextoDetail />} />
          <Route path="/galeria" element={<Gallery />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function Home() {
  return (
    <section className="home-section">
      <div
        className="hero hero-full"
        style={{ backgroundImage: `url(${heroHome})` }}
      >
        <div className="hero-overlay center-content">
          <h1>Letra y Música</h1>
          <p>Recital de textos con música en vivo</p>
          <Link className="cta" to="/textos">
            Textos
          </Link>
        </div>
      </div>

      <section className="preview-sections fade-in-section container">
        <div className="preview-card">
          <h2>Galería</h2>
          <p>Fotos de eventos anteriores.</p>
          <Link className="preview-link" to="/galeria">
            Ver galería
          </Link>
        </div>

        <div className="preview-card">
          <h2>Textos</h2>
          <p>Textos leídos el sábado 29/11</p>
          <Link className="preview-link" to="/textos">
            Ver textos
          </Link>
        </div>
      </section>
    </section>
  );
}
