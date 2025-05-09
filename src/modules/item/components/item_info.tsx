import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import { FaExpand } from "react-icons/fa6";
import { Badge, Button, Carousel, Col, Divider, Grid, IconButton, Modal, Panel, Row, Tabs, Toggle } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";

interface ModalInfoItemProps {
    open: boolean,
    hiddeModal: () => void,
}

const imageList = [
    "src/assets/LogoJavier.jpg",
    "src/assets/LogoJavier.jpg",
    "src/assets/iconImportJavierito.png",
    "src/assets/iconImportJavierito.png",
    "src/assets/LogoJavier.jpg",
]

export default function ItemInformation({ open, hiddeModal }: ModalInfoItemProps){
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [zoom, setZoom] = useState(false);

    const handlePrevImage = () => {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1));
    };

    const handleNextImage = () => {
        setSelectedIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0));
    };

    const handleGalleryPrev = () => {
        setGalleryIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1));
    };

    const handleGalleryNext = () => {
        setGalleryIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0));
    };

    const openGallery = () => {
        setGalleryIndex(selectedIndex);
        setGalleryOpen(true);
    };

    useEffect(() => {
        if (open) {
            setSelectedIndex(0);
            setGalleryOpen(false);
            setZoom(false);
        }
    }, [open]);

    return(
        <>
            <Modal open={open} onClose={hiddeModal} size={'lg'}>
                <ModalHeader>
                    <ModalTitle style={{ fontWeight:"bold" }}>Información del Repuesto</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Grid fluid>
                        <Row>
                            <Col xs={15}>
                                <div style={{ position:'relative',  display: "flex", justifyContent:'center', alignItems:'center', height:'500px', background: "#f8f8f8", borderRadius:7, marginBottom:10}}>
                                    <img src={imageList[selectedIndex]} style={{ maxWidth: "90%", maxHeight: "90%", objectFit:'contain', borderRadius:5 }} onClick={() => setZoom(!zoom)} alt="Product main image" />
                                    <IconButton icon={<FaChevronLeft />} circle size="sm" style={{ position: "absolute", left: 10, top: "50%", fontSize:'1.3em', transform: "translateY(-50%)", background: "rgba(255,255,255,0.7)" }} onClick={handlePrevImage} />
                                        <IconButton icon={<FaChevronRight />} circle size="sm" style={{  position: "absolute", right: 10,  top: "50%", fontSize:'1.3em', transform: "translateY(-50%)", background: "rgba(255,255,255,0.7)" }} onClick={handleNextImage} />
                                        <IconButton icon={<FaExpand />} size="sm" style={{ position: "absolute", top: 10, right: 10, fontSize:'1.3em', }} title="Ver en pantalla completa" onClick={openGallery} />
                                    <Badge content={`${selectedIndex + 1}/${imageList.length}`} style={{ position: "absolute", bottom: 10, right: 10, background:'#db7114' }} />      
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                    {imageList.map((src, index) => (
                                        <div key={index} style={{ position: "relative", borderRadius: 5, }} >
                                            <img src={src} onClick={() => setSelectedIndex(index)} style={{ width: "100%", border: selectedIndex === index ? "2px solid #db7114" : "1px solid #ccc", cursor: "pointer", borderRadius: 3 }} alt={`Thumbnail ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </Col>
                            <Col xs={8}>
                                <div style={{ paddingLeft: "15px" }}>
                                    <h5 style={{ fontWeight: "bold", marginBottom:10 }}>BOMBITA DE GASOLINA</h5>
                                    <Tabs appearance="pills" defaultActiveKey="1" >
                                        <Tabs.Tab eventKey="1" title='Información General' >
                                            <div style={{ marginTop:10}}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Estado del Repuesto:</strong>
                                                    <p>NUEVO</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Precio Unitario:</strong>
                                                    <p>100bs</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Precio por Mayor:</strong>
                                                    <p>90bs</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Precio Público:</strong>
                                                    <p>150bs</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Dirección del Repuesto:</strong>
                                                    <p>SECCIÓN VITRINA</p>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection:'column', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Sucursales:</strong>
                                                    <div style={{ display:'flex', flexDirection:'row', alignItems:'center',  gap:5 }}>
                                                        <span>SUCURSAL CENTRAL -</span>
                                                        <strong>Cantidad:</strong>
                                                        <p>10</p>
                                                    </div>
                                                    <div style={{ display:'flex', flexDirection:'row', alignItems:'center',  gap:5 }}>
                                                        <span>SUCURSAL #1 -</span>
                                                        <strong>Cantidad:</strong>
                                                        <p>7</p>
                                                    </div> 
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Fecha de Fabricación:</strong>
                                                    <p>10-03-2025</p>
                                                </div>
                                            </div>
                                        </Tabs.Tab>
                                        <Tabs.Tab eventKey="2" title='Detalles Técnicos' >
                                            <div style={{ marginTop:10}}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Marca:</strong>
                                                    <p>TOYOTA</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Modelo:</strong>
                                                    <p>TACOMA</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Cilindrada:</strong>
                                                    <p>1600cc</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Año:</strong>
                                                    <p>1850 ENTRE 2005</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Combustible:</strong>
                                                    <p>GASOLINA</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Sub-Categoría:</strong>
                                                    <p>BOMBA</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Transmisión:</strong>
                                                    <p>MECÁNICA</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Serie del Motor:</strong>
                                                    <p>12345678910</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Tracción:</strong>
                                                    <p>4X4</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Stock Total:</strong>
                                                    <p>2</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Precio Pelado:</strong>
                                                    <p>0bs.</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                                    <strong style={{width:"50%"}}>Especificaciones:</strong>
                                                    <p>EL PABEL ES GAY</p>
                                                </div>
                                            </div>
                                        </Tabs.Tab>
                                    </Tabs>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </ModalBody>
            </Modal>
            <Modal open={galleryOpen} onClose={() => setGalleryOpen(false)} size="full">
                <ModalHeader>
                    <ModalTitle style={{ fontWeight:'bold' }}>Galería de Imágenes ({galleryIndex + 1} de {imageList.length})</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Grid fluid>
                        <Row>
                            <Col xs={21}>
                                <div style={{ display: "flex",  justifyContent: "center", alignItems: "center", height: "100%", width:"100%", position: "relative", background: "#d3d3d3", borderRadius:10, overflow: "hidden" }}>
                                    <div style={{width: "100%", height: "100%", overflow: zoom ? "hidden" : "visible", cursor: zoom ? "zoom-out" : "zoom-in", display: "flex", justifyContent: "center", alignItems: "center" }}
                                            onMouseMove={(e) => {
                                                if (!zoom) return;
                                                const container = e.currentTarget;
                                                const img = container.querySelector("img") as HTMLImageElement;
                                                if (!img) return;

                                                const rect = container.getBoundingClientRect();
                                                const sensitivity = 1.7;
                                                const clamp = (value: number, min: number, max: number) =>
                                                    Math.max(min, Math.min(max, value));
                                                const x = clamp(((e.clientX - rect.left) / rect.width) * 100 * sensitivity, 0, 100);
                                                const y = clamp(((e.clientY - rect.top) / rect.height) * 100 * sensitivity, 0, 100);
                                                img.style.transformOrigin = `${x}% ${y}%`;
                                            }}
                                        >
                                        <img src={imageList[galleryIndex]} style={{ maxWidth: zoom ? "130%" : "90%", maxHeight: zoom ? "130%" : "90%", objectFit:'contain', cursor: zoom ? "zoom-out" : "zoom-in", transition: "transform 0.3s, max-width 0.3s, max-height 0.3s", transform: zoom ? "scale(1.7)" : "scale(1)", borderRadius:5 }} onClick={() => setZoom(!zoom)} alt={`Gallery image ${galleryIndex + 1}`} />
                                    </div>
                                    <IconButton icon={<FaChevronLeft style={{ fontSize:'25px' }} />} circle size="lg" style={{ position: "absolute", left: 30, top: "50%", transform: "translateY(-50%)", background: "#ffffff" }} onClick={handleGalleryPrev} />
                                    <IconButton icon={<FaChevronRight style={{ fontSize:'25px' }} />} circle size="lg" style={{ position: "absolute", right: 30, top: "50%", transform: "translateY(-50%)", background: "#ffffff" }} onClick={handleGalleryNext} />
                                </div>
                            </Col>
                            <Col xs={3} >
                                <div style={{  display: "flex", flexDirection:'column', alignItems: "center", height: "100%", width: "100%", borderRadius:7, gap:10 }}>
                                    {imageList.map((src, index) => (
                                        <img key={index} src={src} onClick={() => setGalleryIndex(index)} style={{ width: "70%", height: "70%", objectFit: "contain", borderRadius:5, border: galleryIndex === index ? "2px solid #db7114" : "1px solid #666", cursor: "pointer", opacity: galleryIndex === index ? 1 : 0.6 }} alt={`Gallery thumbnail ${index + 1}`} />
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </ModalBody>
            </Modal>
        </>
    );
}