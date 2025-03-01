// Cambio de Contraseña
export interface ResetPassword {
    newPassword: string;
    confirmPassword: string;
}

export let EmptyResetPassword: ResetPassword =  {
    newPassword: '',
    confirmPassword: '',
}

// Correo de Verificacion
export interface VerifyEmailPlusCode {
    email: string;
    code?: string;
}

export let EmptyVerifyEmailPlusCode: VerifyEmailPlusCode = {
    email: '',
    code: '',
}
