import React, { useState, useEffect } from 'react';
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

const App = () => {
  const [activeTab, setActiveTab] = useState('obra1');
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const content = {
    obra1: {
      title: "DEL POP AL KITSCH",
      images: [art1_1, art1_2, art1_3],
      bg: bg1,
      text: `Este zapato intervenido piensa el AMOR como una energía viva: desborda, mezcla, desordena y juega. No busca armonía ni corrección, sino libertad.

            El proceso se apoya en el juego, el azar y el collage. Los materiales encontrados, los colores intensos construyen una antiestética que cuestiona el orden y el “buen gusto” socialmente aceptado.

            Como el MAR, el AMOR no se deja contener. Fluidez, exceso y movimiento transforman al calzado en un objeto poético que provoca extrañamiento Kitch y una sonrisa Pop.`
    },
    obra2: {
      title: "DEL RIO AL MAR",
      images: [art2_1, art2_2, art2_3],
      bg: bg2,
      text: `Aquí irá el texto de la segunda serie cuando lo tengas. 
             
             Podés seguir el mismo formato de párrafos separados por un espacio.`
    }
  };

  const currentContent = content[activeTab];

  useEffect(() => {
    setCurrentImgIndex(0);
  }, [activeTab]);

  const handleNext = () => {
    setCurrentImgIndex((prev) => (prev + 1) % currentContent.images.length);
  };

  return (
    <div className="app-container" style={{ backgroundImage: `url(${currentContent.bg})` }}>
      <div className="bg-overlay"></div>
      
      <div className="content-wrapper">
        <header className="main-header">
          <nav className="tabs-header">
            {Object.keys(content).map((key) => (
              <button 
                key={key} 
                className={`tab-button ${activeTab === key ? 'active' : ''}`} 
                onClick={() => setActiveTab(key)}
              >
                {content[key].title}
              </button>
            ))}
          </nav>
        </header>

        <main className="artwork-display fade-in" key={activeTab}>
          <div className="artwork-title-container">
            <h2>{currentContent.title}</h2>
          </div>

          <div className="carousel-section">
            <div className="carousel-window" onClick={handleNext} title="Siguiente imagen">
              <div className="carousel-track" style={{ transform: `translateX(-${currentImgIndex * 100}%)` }}>
                {currentContent.images.map((img, index) => (
                  <div key={index} className="carousel-slide">
                    <img src={img} alt="Obra" className="carousel-img" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="artwork-text">
            <p>{currentContent.text}</p>
          </div>
        </main>

        <footer className="main-footer">
          <p className="artist-name">Gabriela Cristina Fernandez</p>
        </footer>
      </div>
    </div>
  );
};

export default App;