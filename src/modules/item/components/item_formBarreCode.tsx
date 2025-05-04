/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, CSSProperties, FC, FormEvent, useEffect, useMemo, useState } from "react";
import { Button, InlineEdit, Loader, Modal, Stack, Text, Carousel } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import BarcodeComponent from "./barcode";
import { getBarcodesAsyncById } from "../services/barcode.service";
import { useApi } from "../../../common/services/useApi";
import { Barcode } from "../models/barcode.model";

interface ItemModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
    id?: number;
}

export default function ItemBareCode({ open, hiddeModal, id }: ItemModalParams) {
    const [barcodes, setBarcodes] = useState<Barcode[]>([]);
    const [activePage, setActivePage] = useState(0);

    const fetchBarcodesByIdAsync = useMemo(() => {
        if (open && id) {
            return getBarcodesAsyncById(id);
        }
        return null;
    }, [id, open]);

    const { data: barcodeData, fetch: fetchData, loading: loadingBarcodeData } = useApi<Barcode[]>(fetchBarcodesByIdAsync!, { autoFetch: false });

    interface FieldProps {
        label: string;
        as: ComponentType<any>;
        defaultValue: any;
        [key: string]: any;
    }

    const Field: FC<FieldProps> = ({ label, as: Component, defaultValue, ...rest }) => {
        return (
            <Stack direction="row" alignItems="center">
                <label style={{ width: 70, display: 'inline-block', color: 'var(--rs-text-secondary)' }}>
                    {label}
                </label>
                <InlineEdit disabled defaultValue={defaultValue} />
                <Component style={{ width: 20 }} {...rest} />
            </Stack>
        );
    };

    useEffect(() => {
        if (open && id) {
            fetchData();
        }
    }, [open, id, fetchData]);

    useEffect(() => {
        if (barcodeData) {
            setBarcodes(Array.isArray(barcodeData) ? barcodeData : [barcodeData]);
        }
    }, [barcodeData]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        hiddeModal(false);
    }

    const handleCancel = () => {
        hiddeModal(false);
    }

    return (
        <Modal size={"sm"} open={open} onClose={() => hiddeModal(false)} overflow>
            <ModalTitle>
                <Stack justifyContent="center" alignItems="center">
                    <strong>Código de Barras</strong>
                </Stack>
            </ModalTitle>
            <ModalBody>
                <Stack spacing={24} direction="column" alignItems="center" justifyContent="center">
                    {loadingBarcodeData ? (
                        <Loader backdrop center content="Cargando..." size="lg" vertical />
                    ) : barcodes.length >= 1 ? (
                        <>
                            <Carousel
                                activeIndex={activePage}
                                onSelect={(index) => setActivePage(index)}
                                autoplay={false}
                                style={{ 
                                    width: '100%',
                                    marginBottom: 20,
                                    '--rs-carousel-indicator': '#8e8e93',
                                } as CSSProperties}
                            >
                                {barcodes.map((barcode, index) => (
                                    <div key={index} style={{ textAlign: 'center', backgroundColor: "white" }}>
                                        <BarcodeComponent value={barcode.barcode} />
                                        <Stack spacing={8} direction="column" style={{ marginTop: 20 }}>
                                            
                                            <Field label="Repuesto:" as={Text} defaultValue={barcode.itemName} />
                                            <Field label="Marca:" as={Text} defaultValue={barcode.brandName} />
                                            <Field label="Modelo:" as={Text} defaultValue={barcode.itemModel} />
                                            <Field label="Fecha de Registro:" as={Text} defaultValue={barcode.itemModel} />
                                        </Stack>
                                    </div>
                                ))}
                            </Carousel>
                        </>
                    ) : (
                        <Text>No se encontraron códigos de barras</Text>
                    )}
                </Stack>
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleSubmit} appearance="primary">Aceptar</Button>
                <Button onClick={handleCancel} appearance="default">Cancelar</Button>
            </ModalFooter>
        </Modal>
    );
}