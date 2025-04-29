import { Container, Panel, Grid, Row, Col, Button } from "rsuite";
import { FaMapMarkerAlt, FaPhone, FaClock, FaCar } from "react-icons/fa";
import React from 'react';

interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  horario: string;
  imagen: string;
}

const SucursalesSection: React.FC = () => {
  
  const sucursales: Sucursal[] = [
    {
      id: 1,
      nombre: "Sucursal Central",
      direccion: "Calle Thiawanaco y Nanawa, sobre Tawantinsuyo",
      telefono: "+591 65517570",
      horario: "Lunes a Viernes: 8:00 - 18:00\nSábados: 9:00 - 13:00",
      imagen: "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
    },
    {
      id: 2,
      nombre: "Sucursal Norte",
      direccion: "Av. América y libertador Edificio Univalle torre 2",
      telefono: "+591 65517571",
      horario: "Lunes a Viernes: 9:00 - 17:00\nSábados: 9:00 - 12:00",
      imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    },
    {
      id: 3,
      nombre: "Sucursal Sur",
      direccion: "Av. Circunvalación, Zona Obrajes ",
      telefono: "+591 65517572",
      horario: "Lunes a Viernes: 8:30 - 17:30\nSábados: 9:00 - 13:00",
      imagen: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
    }
  ];

  const handleComoLlegar = (direccion: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`);
  };

  return (
    <section id="sucursales" style={{ padding: '80px 20px', backgroundColor: '#ecebeb' }}>
      <Container>
        <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '36px' }}>Nuestras Sucursales</h2>
        <Grid fluid>
          <Row gutter={30}>
            {sucursales.map((sucursal: Sucursal) => (
              <Col key={sucursal.id} xs={24} md={12} lg={8} style={{ marginBottom: '30px' }}>
                <Panel shaded bordered bodyFill style={{ borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff' }}>
                  <div style={{ 
                    height: '200px', 
                    backgroundImage: `url(${sucursal.imagen})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                  
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '22px', marginBottom: '15px', color: '#333' }}>
                      <FaMapMarkerAlt style={{ marginRight: '10px', color: '#f08b33' }} />
                      {sucursal.nombre}
                    </h3>
                    
                    <p style={{ marginBottom: '15px', color: '#666' }}>
                      <strong>Dirección:</strong> {sucursal.direccion}
                    </p>
                    
                    <p style={{ marginBottom: '15px', color: '#666' }}>
                      <FaPhone style={{ marginRight: '10px', color: '#f08b33' }} />
                      <strong>Teléfono:</strong> {sucursal.telefono}
                    </p>
                    
                    <p style={{ marginBottom: '20px', color: '#666', whiteSpace: 'pre-line' }}>
                      <FaClock style={{ marginRight: '10px', color: '#f08b33' }} />
                      <strong>Horario:</strong> {sucursal.horario}
                    </p>
                    
                    <Button 
                      appearance="primary" 
                      block 
                      style={{ backgroundColor: '#f08b33' }}
                      onClick={() => handleComoLlegar(sucursal.direccion)}
                    >
                      <FaCar style={{ marginRight: '10px' }} />Cómo llegar
                    </Button>
                  </div>
                </Panel>
              </Col>
            ))}
          </Row>
        </Grid>
      </Container>
    </section>
  );
};

export default SucursalesSection;