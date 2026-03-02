import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate, Routes, Route } from 'react-router-dom';
import './App.css';

// Importación de imágenes
import art1_1 from './assets/art1-1.png';
import art1_2 from './assets/art1-2.png';
import art1_3 from './assets/art1-3.png';
import art2_1 from './assets/art2-1.png';
import art2_2 from './assets/art2-2.png';
import art2_3 from './assets/art2-3.png';
import bg1 from './assets/background1.png';
import bg2 from './assets/background2.png';

const content = {
  'pop-kitsch': {
    title: "DEL POP AL KITSCH",
    images: [art1_1, art1_2, art1_3],
    bg: bg1,
    text: `Este zapato intervenido piensa el AMOR como una energía viva: desborda, mezcla, desordena y juega. No busca armonía ni corrección, sino libertad.

          El proceso se apoya en el juego, el azar y el collage. Los materiales encontrados, los colores intensos construyen una antiestética que cuestiona el orden y el “buen gusto” socialmente aceptado.

          Como el MAR, el AMOR no se deja contener. Fluidez, exceso y movimiento transforman al calzado en un objeto poético que provoca extrañamiento Kitch y una sonrisa Pop.`
  },
  'rio-mar': {
    title: "DEL RIO AL MAR",
    images: [art2_1, art2_2, art2_3],
    bg: bg2,
    text: `Aquí irá el texto de la segunda serie cuando lo tengas. 
           
           Podés seguir el mismo formato de párrafos separados por un espacio.`
  }
};

const AppContent = () => {
  const { obraId } = useParams();
  const navigate = useNavigate();
  
  // Contenido de la obra actual
  const currentContent = content[obraId] || content['pop-kitsch'];
  const images = currentContent.images;
  
  // Creamos un array con clones para el loop infinito: [Ultima, 1, 2, 3, Primera]
  const slides = [images[images.length - 1], ...images, images[0]];
  
  // El índice inicial es 1 porque la posición 0 es el clon de la última
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Redirigir si el obraId no es válido
  if (!obraId || !content[obraId]) {
    return <Navigate to="/pop-kitsch" replace />;
  }

  useEffect(() => {
    setCurrentIndex(1);
    setIsTransitioning(false); // Reset sin animación al cambiar de obra
    setTimeout(() => setIsTransitioning(true), 50);
  }, [obraId]);

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    // Si llegamos al clon de la primera (al final)
    if (currentIndex === slides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
    // Si llegamos al clon de la última (al principio)
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(slides.length - 2);
    }
  };

  // Reactivar la transición después del salto instantáneo
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className="app-container" style={{ backgroundImage: `url(${currentContent.bg})` }}>
      <div className="bg-overlay"></div>
      
      <div className="content-wrapper">
        <header className="main-header">
          <nav className="tabs-header">
            {Object.keys(content).map((key) => (
              <button 
                key={key} 
                className={`tab-button ${obraId === key ? 'active' : ''}`} 
                onClick={() => navigate(`/${key}`)}
              >
                {content[key].title}
              </button>
            ))}
          </nav>
        </header>

        <main className="artwork-display fade-in" key={obraId}>
          <div className="artwork-title-container">
            <h2>{currentContent.title}</h2>
          </div>

          <div className="carousel-section">
            <div className="carousel-container-main">
              <div 
                className="carousel-nav-area left" 
                onClick={handlePrev} 
                title="Anterior"
              ></div>
              <div 
                className="carousel-nav-area right" 
                onClick={handleNext} 
                title="Siguiente"
              ></div>

              <div className="carousel-window">
                <div 
                  className="carousel-track" 
                  onTransitionEnd={handleTransitionEnd}
                  style={{ 
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
                  }}
                >
                  {slides.map((img, index) => (
                    <div 
                      key={index} 
                      className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
                    >
                      <img src={img} alt="Obra" className="carousel-img" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="artwork-text">
            <p>{currentContent.text}</p>
          </div>
        </main>

        <footer className="main-footer">
          <p className="artist-name">Gabriela Cristina Fernandez</p>
          <a 
            href="https://www.instagram.com/gabriela.fernandez.art" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="instagram-link"
          >
            @gabriela.fernandez.art
          </a>
        </footer>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/:obraId" element={<AppContent />} />
      <Route path="/" element={<Navigate to="/pop-kitsch" replace />} />
    </Routes>
  );
};

export default App;