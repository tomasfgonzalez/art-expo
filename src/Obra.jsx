import { useState, useEffect } from 'react';

function Obra({ obra }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [obra.id]);

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % obra.images.length);
  };

  return (
    <div className="artwork-display">
      
      {/* --- EL TÍTULO AHORA VA ARRIBA --- */}
      <div className="artwork-title-container">
        <h2>{obra.title}</h2>
      </div>

      <div className="image-stack-container" onClick={handleImageClick}>
        {obra.images.map((imageSrc, index) => {
          let positionClass = 'card-hidden'; 
          
          if (index === currentImageIndex) {
            positionClass = 'card-active'; 
          } else if (index === (currentImageIndex + 1) % obra.images.length) {
            positionClass = 'card-next';   
          } else if (index === (currentImageIndex + 2) % obra.images.length) {
            positionClass = 'card-prev';   
          }

          return (
            <img 
              key={index}
              src={imageSrc} 
              alt={`${obra.title} - vista ${index + 1}`} 
              className={`artwork-image-card ${positionClass}`}
            />
          );
        })}
        
        <div className="image-counter">
          {currentImageIndex + 1} / {obra.images.length}
        </div>
      </div>

      {/* --- LA DESCRIPCIÓN QUEDA ABAJO --- */}
      <div className="artwork-text">
        <p>{obra.description}</p>
      </div>
    </div>
  );
}

export default Obra;