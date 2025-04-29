import { Grid, Row, Col, Image } from "rsuite";
import React from 'react';

// Definimos el tipo para los datos de las marcas
interface Marca {
  nombre: string;
  imagen: string;
}

const MarcasRepuestos: React.FC = () => {
  // Datos de las marcas
  const marcas: Marca[] = [
    { nombre: "GMC", imagen: "src/assets/brands/gmc.png" },
    { nombre: "INFINITI", imagen: "src/assets/brands/infiniti.png" },
    { nombre: "KIA", imagen: "src/assets/brands/kia.png" },
    { nombre: "SUZUKI", imagen: "src/assets/brands/suzuki.png" },
    { nombre: "Audi", imagen: "src/assets/brands/audi.png" },
    { nombre: "BMW", imagen: "src/assets/brands/BMW.png" },
    { nombre: "Chevrolet", imagen: "src/assets/brands/chevrolet.png" },
    { nombre: "Chrysler", imagen: "src/assets/brands/chrysler.png" },
    { nombre: "Dodge", imagen: "src/assets/brands/dodge.png" },
    { nombre: "Fiat", imagen: "src/assets/brands/fiat.png" },
    { nombre: "Ford", imagen: "src/assets/brands/ford.png" },
    { nombre: "Honda", imagen: "src/assets/brands/honda.png" },
    { nombre: "Hyundai", imagen: "src/assets/brands/hyundai.png" },
    { nombre: "Isuzu", imagen: "src/assets/brands/isuzu.png" },
    { nombre: "Jeep", imagen: "src/assets/brands/jeep.png" },
    { nombre: "Land Rover", imagen: "src/assets/brands/landRover.png" },
    { nombre: "Lexus", imagen: "src/assets/brands/lexus.png" },
    { nombre: "Mercedes Benz", imagen: "src/assets/brands/mercedesBenz.png" },
    { nombre: "Mitsubishi", imagen: "src/assets/brands/mitsubishi.png" },
    { nombre: "Nissan", imagen: "src/assets/brands/nissan.png" },
    { nombre: "Porsche", imagen: "src/assets/brands/porsche.png" },
    { nombre: "Renault", imagen: "src/assets/brands/renault.png" },
    { nombre: "Subaru", imagen: "src/assets/brands/subaru.png" },
    { nombre: "Volvo", imagen: "src/assets/brands/volvo.png" }
  ];

  return (
    <div style={{ padding: '0px 20px', textAlign: 'center' }}>
      <Grid fluid>
        <Row gutter={20} style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {marcas.map((marca, index) => (
            <Col 
              key={index} 
              xs={8} sm={6} md={4} lg={3} xl={2}
              style={{ 
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <div style={{
                width: '120px',
                height: '80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
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
  );
};

export default MarcasRepuestos;