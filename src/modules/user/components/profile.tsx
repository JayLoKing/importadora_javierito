/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, FC, useEffect, useMemo, useState } from "react";
import { InlineEdit, Input, Loader, Stack, Divider } from "rsuite";
import { UserProfile } from "../models/userProfile.model";
import { editProfileAsync, getAccountByIdAsync } from "../services/user.service";
import { useApi } from "../../../common/services/useApi";
import { useAuthStore } from "../../../store/store";
import { jwtDecoder } from "../../../utils/jwtDecoder";
import { useUpdateProfileFormStore } from "../hooks/useUserProfileFormStorm";
import { FaUser, FaIdCard, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { MdPerson, MdBadge } from "react-icons/md";

interface SectionDividerProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

const SectionDivider: FC<SectionDividerProps> = ({ title, icon, children }) => {
    return (
        <div style={{
            width: '100%',
            marginBottom: 24,
            marginTop: 16,
            borderRadius: 8,
            border: '2px solid var(--rs-border-primary)',
            padding: '20px',
            position: 'relative'
        }}>
            <div style={{
                position: 'absolute',
                top: -12,
                left: 20,
                padding: '0 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 8
            }}>
                {icon}
                <span style={{
                    fontWeight: 600,
                    color: 'var(--rs-text-primary)'
                }}>
                    {title}
                </span>
            </div>
            <div style={{ marginTop: 10 }}>
                {children}
            </div>
        </div>
    );
};

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

export default function Profile() {
    const { formData, loadData, updateField } = useUpdateProfileFormStore();
    const jwt = useAuthStore(state => state.jwt);
    const [userID, setUserID] = useState<number | null>(null); 

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
        <div style={{ padding:35, justifyContent: 'center', alignItems: 'center' }}>    
            <Stack direction="column" alignItems="center" justifyContent="center" spacing={10}>
                {loading ? (
                    <Loader size="lg" content="¡Cargando Perfil!" />
                ) : error ? (
                    <div>Error al cargar el perfil: {error.message}</div>
                ) : (
                    <>
                    
                        <Stack direction="row" spacing={10} alignItems="center">
                            <FaUser size={30}/>
                            <h3>Mi cuenta</h3>
                        </Stack>
                        
                        
                        <SectionDivider title="Información Personal" icon={<FaIdCard size={18} />}>
                            <Field label="Nombres" as={Input} value={formData.name || ''} name="name" onChange={handleFieldChange} />
                            <Field label="Apellido Paterno" as={Input} value={formData.lastName || ''} name="lastName" onChange={handleFieldChange} />
                            <Field label="Apellido Materno" as={Input} value={formData.secondLastName || ''} name="secondLastName" onChange={handleFieldChange} />
                            <Field label="Carnet de Identidad" as={Input} value={formData.ci || ''} name="ci" onChange={handleFieldChange} />
                        </SectionDivider>
                        

                        <SectionDivider title="Información de Contacto" icon={<FaPhoneAlt size={18} />}>
                            <Field label="Número de Teléfono/Celular" as={Input} value={formData.phoneNumber || ''} name="phoneNumber" onChange={handleFieldChange} />
                            <Field label="Correo Electrónico" as={Input} value={formData.email || ''} name="email" onChange={handleFieldChange} />
                        </SectionDivider>
                    </>
                )}
            </Stack>
        </div>
    );
}