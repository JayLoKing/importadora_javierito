/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, FC, useEffect, useMemo, useState } from "react";
import { InlineEdit, Input, Loader, Stack, Panel, Modal, Button } from "rsuite";
import { UserProfile } from "../models/userProfile.model";
import { editProfileAsync, getAccountByIdAsync } from "../services/user.service";
import { useApi } from "../../../common/services/useApi";
import { useAuthStore } from "../../../store/store";
import { jwtDecoder } from "../../../utils/jwtDecoder";
import { useUpdateProfileFormStore } from "../hooks/useUserProfileFormStorm";
import { FaUser, FaIdCard, FaPhoneAlt } from "react-icons/fa";

interface FieldProps {
    label: string;
    as: ComponentType<any>;
    value: any;
    name: keyof UserProfile;
    onChange: (name: keyof UserProfile, value: any) => void;
}

const Field: FC<FieldProps> = ({ label, value, name, onChange }) => {

    const [tempValue, setTempValue] = useState(value);
    useEffect(() => {
        console.log(`Sincronizando tempValue con value para ${name}:`, value);
        setTempValue(value);
    }, [value, name]);

    const handleSave = () => {
        console.log(`Guardando valor para ${name}:`, tempValue);
        onChange(name, tempValue);
    };

    return (
        <Stack direction="row" spacing={10}>
            <label style={{ 
                width: 120, 
                display: 'inline-block', 
                color: 'var(--rs-text-secondary)'
            }}>
                {label}
            </label>
            <InlineEdit
                placeholder="Haga clic para editar ..."
                value={tempValue}
                onChange={(newValue) => {
                    setTempValue(newValue);
                }} 
                onSave={handleSave} 
                style={{ width: 300 }}
            />
        </Stack>
    );
};

interface ModalProfileProps {
    open: boolean,
    hiddeModal: () => void,
}

export default function Profile({ open, hiddeModal}:ModalProfileProps) {
    const { formData, loadData, updateField } = useUpdateProfileFormStore();
    const jwt = useAuthStore(state => state.jwt);
    const [userID, setUserID] = useState<number | null>(null); 

    const handleCancel = () => {
        hiddeModal();
    }

    useEffect(() => {
        if (jwt) {
            try {
                const decode = jwtDecoder(jwt);
                setUserID(decode.id);
            } catch (error) {
                console.error("Error al decodificar el JWT:", error);
            }
        } else {
            console.error("El token de autenticación del usuario es nulo");
        }
    }, [jwt]);

    const fetchAccountAsync = useMemo(() => {
        if (!userID) return null;
        return getAccountByIdAsync(userID);
    }, [userID]);

    const { loading, data, fetch, error } = useApi<UserProfile>(
        fetchAccountAsync,
        { autoFetch: false }
    );

    useEffect(() => {
        if (fetchAccountAsync && userID) {
            fetch();
        }
    }, [fetchAccountAsync, fetch, userID]);

    useEffect(() => {
        if (data && !Array.isArray(data)) {
            loadData({
                id: data.id,
                name: data.name,
                lastName: data.lastName,
                secondLastName: data.secondLastName ?? 'No Tiene',
                ci: data.ci,
                phoneNumber: data.phoneNumber,
                email: data.email
            });
        }
    }, [data, loadData]);

    const handleFieldChange = async (fieldName: keyof UserProfile, value: any) => {
        updateField(fieldName, value); 
        const updatedFormData = {
            ...formData,
            [fieldName]: value
        };
        try {
            await editProfileAsync(updatedFormData);
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        }
    };

    if (!jwt) {
        return <div>Error: No se encontró un token de autenticación</div>;
    }

    if (!userID) {
        return <Loader size="lg" content="Cargando datos de usuario..." />;
    }

    return (
        <Modal open={open} onClose={hiddeModal} size="sm" keyboard={false} style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
            <Modal.Header>
                <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                    <FaUser style={{ fontSize:'1em'}}/>
                    <h4 style={{ fontWeight:"bold" }}>Mi cuenta</h4>
                </div>
                <p style={{ color:'#878787' }}>Presione el campo que desea modificar..</p>
            </Modal.Header>
            <Modal.Body>
            <Stack direction="column" alignItems="center" justifyContent="center" spacing={10}>
                {loading ? (
                    <Loader size="lg" content="¡Cargando Perfil!" />
                ) : error ? (
                    <div>Error al cargar el perfil: {error.message}</div>
                ) : (
                    <>
                        <Panel  bordered >
                            <Stack>
                                <Stack direction="row" spacing={10} style={{marginBottom:10, alignItems:'center'}}>
                                    <FaIdCard size={18}/>
                                    <h6>Información Personal</h6>
                                </Stack>
                            </Stack>
                            <Field label="Nombres" as={Input} value={formData.name || ''} name="name" onChange={handleFieldChange} />
                            <Field label="Apellido Paterno" as={Input} value={formData.lastName || ''} name="lastName" onChange={handleFieldChange} />
                            <Field label="Apellido Materno" as={Input} value={formData.secondLastName || ''} name="secondLastName" onChange={handleFieldChange} />
                            <Field label="Carnet de Identidad" as={Input} value={formData.ci || ''} name="ci" onChange={handleFieldChange} />
                        </Panel>
                        <Panel bordered>
                            <Stack>
                                <Stack direction="row" spacing={10} style={{marginBottom:10, alignItems:'center'}}>
                                    <FaPhoneAlt size={18}/>
                                    <h6>Información de Contacto</h6>
                                </Stack>
                            </Stack>
                            <Field label="Número de Teléfono/Celular" as={Input} value={formData.phoneNumber || ''} name="phoneNumber" onChange={handleFieldChange} />
                            <Field label="Correo Electrónico" as={Input} value={formData.email || ''} name="email" onChange={handleFieldChange} />
                        </Panel>
                    </>
                )}
            </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button appearance="primary" onClick={handleCancel}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    );
}