export interface RegisterUserDTO {
    userName: string,
    password: string,
    confirmPassword?: string,
    role: string,
    email: string,
    name: string,
    lastName: string,
    secondLastName?: string,
    ci: string,
    phoneNumber: string,
    branchOfficeId?: number
}