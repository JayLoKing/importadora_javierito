// Cambio de Contraseña
export interface ResetPassword {
    email?: string;
    newPassword?: string;
    confirmPassword?: string;
    code?: string;
}
export interface VerifyEmail {
    email: string;
    code? : string;
}


