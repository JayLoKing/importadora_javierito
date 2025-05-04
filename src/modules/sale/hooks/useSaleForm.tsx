import { useRef, useState } from "react";
import { TemporalProduct } from "../models/product.model";
import { Message, toaster } from "rsuite";
import Quagga, { QuaggaJSResultObject } from "@ericblade/quagga2";

type cameraStatus = "idle" | "starting" | "ready" | "error";

export const useSaleForm = () => {
    const [products, setProducts] = useState<TemporalProduct[]>([]);
    const [isScanning, setIsScanning] = useState(false);
    const [cameraStatus, setCameraStatus] = useState<cameraStatus>("idle");
    const [lastScanned, setLastScanned] = useState<string | null>(null);
    const [keyTab, setKeyTab] = useState<string>("");
    const videoRef = useRef<HTMLVideoElement>(null);
    const beepAudio = useRef<HTMLAudioElement | null>(null); 

    const handleConfigSound = () => {
        beepAudio.current = new Audio("/sounds/beep.mp3");
        beepAudio.current.volume = 0.3; 

        beepAudio.current.addEventListener('error', (e) => {
            console.error("Error loading beep sound:", e);
        });

        return () => {
            if(beepAudio.current) {
                beepAudio.current.pause();
                beepAudio.current.currentTime = 0;

            }
        }
    }

    const playBeep = () => {
        if(beepAudio.current) {
            beepAudio.current.currentTime = 0;
            beepAudio.current.play().catch((error) => {
                console.error("Error playing beep sound:", error);
            });
        }
    }

    const handleScannedBarcode = (barcode: string) => {
        const product = products.find((product) => product.barcode === barcode);

        playBeep();
        setLastScanned(barcode);
        setTimeout(() => setLastScanned(null), 2000);

        toaster.push(
            <Message type="success">
                { product 
                    ? `Producto escaneado: ${product.nameItem}` 
                    : `Producto no encontrado: ${barcode}`}
            </Message>
        );
        
        setProducts(prev => {
            const existingIndex = prev.findIndex(p => p.barcode === barcode);
            if (existingIndex >= 0) {
              return prev.map((p, i) => 
                i === existingIndex ? { ...p, quantity: p.quantity + 1 } : p
              );
            } else {
              return [
                ...prev,
                {
                  id: product?.id || Date.now(),  
                  barcode: product?.barcode || "",
                  nameItem: product?.nameItem || "Unknown",
                  price: product?.price || 0,
                  quantity: 1,
                  total: product?.price || 0,
                  wholePrice: product?.wholePrice || 0,
                  discount: product?.discount || 0,
                }
              ];
            }
        });
    }

    const handleInitializeCamera = (isCamera: boolean) => {
        if(!isCamera){
            Quagga.stop();
            if(videoRef.current?.srcObject){
                (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
            setCameraStatus("idle");
            return;
        }

        setCameraStatus("starting");
        setKeyTab("1");
        navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: "user",
            },
            audio: false,
        }).then((stream) => {
            if(videoRef.current){
                videoRef.current.srcObject = stream;
                videoRef.current.play().catch(e => console.error("Error playing video:", e));
            }   

            Quagga.init({
                inputStream:{
                    name: "Live",
                    type: "LiveStream",
                    target: videoRef.current as HTMLVideoElement,
                    constraints: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        facingMode: "user",
                    }
                },
                decoder: {
                    readers: ["ean_reader", "ean_8_reader", "code_128_reader", "code_39_reader", "upc_reader"],
                },
                locate: true,
            }, (err) => {
                if (err) {
                    console.error("Error al iniciar Quagga:", err);
                    toaster.push(<Message type="error">Error al iniciar el escáner</Message>);
                    setCameraStatus("error");
                    setIsScanning(false);
                    return;
                }
                setCameraStatus("ready");
                Quagga.start();
            });

            Quagga.onDetected((result: QuaggaJSResultObject) => {
                if(result.codeResult?.code){
                    handleScannedBarcode(result.codeResult.code);
                }
            });
        }).catch((error) => {
            console.error("Error al acceder a la cámara:", error);
            toaster.push(<Message type="error">No se pudo acceder a la cámara</Message>);
            setCameraStatus("error");
            setIsScanning(false);
        });

        return () => {
            if (isScanning) {
              Quagga.stop();
              if (videoRef.current?.srcObject) {
                (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
              }
            }
        };
    }

    const handleManualSubmit = async (barcode: string) => {
        if(!barcode.trim()) {
            toaster.push(<Message type="error">El código de barras no puede estar vacío</Message>);
            return;
        }
    }

    const removeProduct = (id: number) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    }

    return { 
        handleConfigSound,
        handleInitializeCamera,
        handleManualSubmit,
        removeProduct,
        cameraStatus,
        lastScanned,
        isScanning,
        setIsScanning,
        videoRef,
        keyTab,
    };
}