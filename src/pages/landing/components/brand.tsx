import { Grid, Row, Col, Image } from "rsuite";
import React, { useEffect, useRef, useState } from 'react';

interface Marca {
  nombre: string;
  imagen: string;
}

const MarcasRepuestos: React.FC = () => {
  // Datos de las marcas
  const marcas: Marca[] = [
    { nombre: "Audi", imagen: "src/assets/brands/audi.png" },
    { nombre: "BMW", imagen: "src/assets/brands/BMW.png" },
    { nombre: "Chevrolet", imagen: "src/assets/brands/chevrolet.png" },
    { nombre: "Chrysler", imagen: "src/assets/brands/chrysler.png" },
    { nombre: "Dodge", imagen: "src/assets/brands/dodge.png" },
    { nombre: "Fiat", imagen: "src/assets/brands/fiat.png" },
    { nombre: "Ford", imagen: "src/assets/brands/ford.png" },
    { nombre: "GMC", imagen: "src/assets/brands/gmc.png" },
    { nombre: "Honda", imagen: "src/assets/brands/honda.png" },
    { nombre: "Hyundai", imagen: "src/assets/brands/hyundai.png" },
    { nombre: "INFINITI", imagen: "src/assets/brands/infiniti.png" },
    { nombre: "Isuzu", imagen: "src/assets/brands/isuzu.png" },
    { nombre: "Jeep", imagen: "src/assets/brands/jeep.png" },
    { nombre: "KIA", imagen: "src/assets/brands/kia.png" },
    { nombre: "Land Rover", imagen: "src/assets/brands/landRover.png" },
    { nombre: "Lexus", imagen: "src/assets/brands/lexus.png" },
    { nombre: "Mercedes Benz", imagen: "src/assets/brands/mercedesBenz.png" },
    { nombre: "Mitsubishi", imagen: "src/assets/brands/mitsubishi.png" },
    { nombre: "Nissan", imagen: "src/assets/brands/nissan.png" },
    { nombre: "Porsche", imagen: "src/assets/brands/porsche.png" },
    { nombre: "Renault", imagen: "src/assets/brands/renault.png" },
    { nombre: "Subaru", imagen: "src/assets/brands/subaru.png" },
    { nombre: "SUZUKI", imagen: "src/assets/brands/suzuki.png" },
    { nombre: "Tesla", imagen: "src/assets/brands/tesla.png" },
    { nombre: "Toyota", imagen: "src/assets/brands/toyota.png" },
    { nombre: "Volkswagen", imagen: "src/assets/brands/volkswagen.png" },
    { nombre: "Volvo", imagen: "src/assets/brands/volvo.png" }
  ];

  const [currentGroup, setCurrentGroup] = useState(0);
  const totalGroups = Math.ceil(marcas.length / 12); // 12 marcas por grupo (6 columnas x 2 filas)
  
  // Referencia para el contenedor del carrusel
  const carouselRef = useRef<HTMLDivElement>(null);

  // Función para cambiar al siguiente grupo de marcas cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroup((prevGroup) => (prevGroup + 1) % totalGroups);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalGroups]);

  // Obtenemos las marcas actuales para mostrar (12 por página - 6 columnas x 2 filas)
  const currentBrands = marcas.slice(currentGroup * 9, (currentGroup + 1) * 9);

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
      }}>
        {/* Columna izquierda - Carrusel de marcas */}
        <div 
          ref={carouselRef}
          style={{ 
            flex: '1 1 50%',
            minWidth: '300px',
            padding: '10px',
          }}
        >
          <Grid fluid>
            <Row style={{ 
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {currentBrands.map((marca, index) => (
                <Col 
                  key={index} 
                  xs={6} sm={4} md={2} // 6 columnas en pantallas medianas y grandes
                  style={{ 
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{
                    width: '100px',
                    height: '70px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '8px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <Image 
                      src={marca.imagen} 
                      alt={marca.nombre}
                      style={{ 
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        opacity: 0.8,
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.style.transform = 'scale(1)';
                        }
                      }}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Grid>
        </div>
        
        {/* <div style={{ 
          flex: '1 1 50%',
          minWidth: '100%',
          display: 'flex',
          left:0,
          right:0,
          backgroundPosition: 'center',
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          
        </div> */}
      </div>
    </div>
  );
};

export default MarcasRepuestos;