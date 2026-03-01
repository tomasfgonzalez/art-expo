import { useEffect } from 'react';
import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import Obra from './Obra';
import './App.css';

// --- IMÁGENES DE LAS OBRAS ---
import art1_1 from './assets/art1-1.png';
import art1_2 from './assets/art1-2.png';
import art1_3 from './assets/art1-3.png';

import art2_1 from './assets/art2-1.png';
import art2_2 from './assets/art2-2.png';
import art2_3 from './assets/art2-3.png';

// --- IMÁGENES DE FONDO ---
import bg1 from './assets/background1.png';
import bg2 from './assets/background2.png';

function App() {
  const location = useLocation();

  useEffect(() => {
    const link = document.createElement('link');
    // Agregamos pesos más finos (300) para lograr esa sutileza
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const obras = {
    "/obra1": {
      id: 0,
      title: "Obra 1",
      path: "/obra1",
      images: [art1_1, art1_2, art1_3], 
      description: "Este zapato intervenido piensa el AMOR como una energía viva: desborda, mezcla, desordena y juega. No busca armonía ni corrección, sino libertad.\n\nEl proceso se apoya en el juego, el azar y el collage. Los materiales encontrados, los colores intensos construyen una antiestética que cuestiona el orden y el “buen gusto” socialmente aceptado.\n\nComo el MAR, el AMOR no se deja contener. Fluidez, exceso y movimiento transforman al calzado en un objeto poético que provoca extrañamiento Kitch y una sonrisa Pop.",
      theme: {
        backgroundImage: `url(${bg1})`, // Nuevo fondo
        background: "#fff5f8", // Color de respaldo por si tarda en cargar
        primary: "#ff007f",    
        accent: "#ccff00",     
        text: "#2a0413"        
      }
    },
    "/obra2": {
      id: 1,
      title: "Obra 2",
      path: "/obra2",
      images: [art2_1, art2_2, art2_3], 
      description: "Una inmersión profunda en la abstracción geométrica y el color minimalista. Esta obra utiliza la repetición y la variación sutil para invitar a la contemplación, creando una sensación de calma y orden en el espectador.",
      theme: {
        backgroundImage: `url(${bg2})`, // Nuevo fondo
        background: "#f0f8ff", 
        primary: "#007fff",    
        accent: "#ffbf00",     
        text: "#001a33"        
      }
    }
  };

  const currentObra = obras[location.pathname] || obras["/obra1"];
  const currentTheme = currentObra.theme;

  return (
    <div 
      className="app-container"
      style={{
        '--bg-image': currentTheme.backgroundImage,
        '--bg-color': currentTheme.background,
        '--primary-color': currentTheme.primary,
        '--accent-color': currentTheme.accent,
        '--text-color': currentTheme.text,
      }}
    >
      {/* Capa para suavizar el fondo y asegurar que el texto se lea bien */}
      <div className="bg-overlay"></div>

      <div className="content-wrapper">
        <header className="tabs-header">
          {Object.values(obras).map((obra) => (
            <NavLink 
              key={obra.id}
              to={obra.path}
              className={({ isActive }) => `tab-button ${isActive ? 'active' : ''}`}
            >
              {obra.title}
            </NavLink>
          ))}
        </header>

        <main key={location.pathname} className="tab-content smooth-entry">
          <Routes>
            <Route path="/" element={<Navigate to="/obra1" replace />} />
            {Object.values(obras).map((obra) => (
              <Route 
                key={obra.id} 
                path={obra.path} 
                element={<Obra obra={obra} />} 
              />
            ))}
          </Routes>
        </main>

        <footer className="main-footer">
          <p className="artist-name">
            Gabriela Cristina Fernandez — <a href="https://www.instagram.com/TU_USUARIO" target="_blank" rel="noopener noreferrer" className="instagram-link">@instagram</a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;