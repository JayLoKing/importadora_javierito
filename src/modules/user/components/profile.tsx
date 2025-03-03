/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, FC, useEffect, useMemo, useState } from "react";
import { InlineEdit, Input, Loader, Stack } from "rsuite";
import { UserProfile } from "../models/userProfile.model";
import { getAccountById } from "../services/user.service";
import { useApi } from "../../../common/services/useApi";
import { useUpdateProfileFormStore } from "../hooks/useUpdateItemFormStorn";
import { useAuthStore } from "../../../store/store";
import { jwtDecoder } from "../../../utils/jwtDecoder";

interface FieldProps {
    label: string;
    as: ComponentType<any>;
    value: any;
    name: keyof UserProfile;
    onChange: (name: keyof UserProfile, value: any) => void;
}

const Field: FC<FieldProps> = ({ label, value, name, onChange }) => {
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
                value={value}
                onChange={(newValue) => onChange(name, newValue)}
                style={{ width: 300 }}
            />
        </Stack>
    );
};

export default function Profile() {
    const { formData, loadData, updateField } = useUpdateProfileFormStore();
    const jwt = useAuthStore(state => state.jwt);
    const [userID, setUserID] = useState<number | null>(null); // Inicializamos como null

    // Decodificar JWT y establecer userID
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

    // Crear la función de fetch solo cuando tengamos un userID válido
    const fetchAccountAsync = useMemo(() => {
        if (!userID) return null;
        return getAccountById(userID);
    }, [userID]);

    const { loading, data, fetch, error } = useApi<UserProfile>(
        fetchAccountAsync,
        { autoFetch: false }
    );

    // Realizar la solicitud cuando tengamos un userID válido y la función fetch
    useEffect(() => {
        if (fetchAccountAsync && userID) {
            fetch();
        }
    }, [fetchAccountAsync, fetch, userID]);

    // Cargar los datos en el formulario cuando los recibamos
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
        try {
            console.log(`Campo ${fieldName} actualizado exitosamente`);
            // Aquí iría la lógica para enviar la actualización a la API
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        }
    };

    // Manejo de estados iniciales o de error
    if (!jwt) {
        return <div>Error: No se encontró un token de autenticación</div>;
    }

    if (!userID) {
        return <Loader size="lg" content="Cargando datos de usuario..." />;
    }

    return (
        <Stack direction="column" alignItems="flex-start" justifyContent="center" spacing={10}>
            {loading ? (
                <Loader size="lg" content="¡Cargando Perfil!" />
            ) : error ? (
                <div>Error al cargar el perfil: {error.message}</div>
            ) : (
                <>
                    <h4 style={{ marginLeft: 50, marginBottom: 10, marginTop: 10 }}>
                        Mi cuenta
                    </h4>
                    <Field 
                        label="ID" 
                        as={Input} 
                        value={formData.id || ''} 
                        name="id"
                        onChange={handleFieldChange}
                    />
                    <Field 
                        label="Nombre" 
                        as={Input} 
                        value={formData.name || ''} 
                        name="name"
                        onChange={handleFieldChange}
                    />
                    <Field 
                        label="Apellido Paterno" 
                        as={Input} 
                        value={formData.lastName || ''} 
                        name="lastName"
                        onChange={handleFieldChange}
                    />
                    <Field 
                        label="Apellido Materno" 
                        as={Input} 
                        value={formData.secondLastName || ''} 
                        name="secondLastName"
                        onChange={handleFieldChange}
                    />
                    <Field 
                        label="Carnet de Identidad" 
                        as={Input} 
                        value={formData.ci || ''} 
                        name="ci"
                        onChange={handleFieldChange}
                    />
                    <Field 
                        label="Número de Teléfono/Celular" 
                        as={Input} 
                        value={formData.phoneNumber || ''} 
                        name="phoneNumber"
                        onChange={handleFieldChange}
                    />
                    <Field 
                        label="Correo Electrónico" 
                        as={Input} 
                        value={formData.email || ''} 
                        name="email"
                        onChange={handleFieldChange}
                    />
                </>
            )}
        </Stack>
    );
}