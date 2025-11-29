import { useState } from "react";
import "./styles.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import TextosList from "./components/Textoslist";
import ContactoForm from "./components/ContactoForm";
import Footer from "./components/Footer";
import heroHome from "./assets/hero-home.jpeg";
import TextoDetail from "./components/TextoDetail";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/textos" element={<TextosList />} />
          <Route path="/textos/:id" element={<TextoDetail />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/contacto" element={<ContactoForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function Home() {
  return (
    <section className="home-section">
      <div className="hero hero-full"
        style={{ backgroundImage: `url(${heroHome})` }}
      >
        <div className="hero-overlay center-content">
          <h1>Letra y Música</h1>
          <p>
            Recital de textos con música en vivo
          </p>
          <a className="cta" href="/textos">
            Textos
          </a>
        </div>
      </div>

      <section className="preview-sections fade-in-section container">
        <div className="preview-card">
          <h2>Galería</h2>
          <p>Fotos de eventos anteriores.</p>
          <a className="preview-link" href="/galeria">
            Ver galería
          </a>
        </div>
        <div className="preview-card">
          <h2>Textos</h2>
          <p>Textos que se leen en nuestros encuentros.</p>
          <a className="preview-link" href="/textos">
            Ver textos
          </a>
        </div>
      </section>
    </section>
  );
}
