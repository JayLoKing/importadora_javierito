import {create} from "zustand";
import { ResetPassword, EmptyResetPassword, VerifyEmailPlusCode, EmptyVerifyEmailPlusCode } from "../models/resetPassword.model";
import { validationResetPasswordForm, validationVerifyEmailForm } from "../utils/validations/validation_form";
import { useState } from "react";

interface ResetPasswordForm {
    formData: ResetPassword;
    resetForm: () => void;
    updateField: (field: keyof ResetPassword, value: any) => void;
    validationModel: any;
}

interface VerificationEmailForm {
    formData: VerifyEmailPlusCode;
    resetForm: () => void;
    updateField: (field: keyof VerifyEmailPlusCode, value: any) => void;
    validationModel: any;
}

export const useResetPasswordForm = create<ResetPasswordForm>((set) => ({
    formData: EmptyResetPassword, 
    resetForm: () => {
        set({
            formData: EmptyResetPassword,
        })
    }, 
    updateField: (field, value) =>
        set((state) => ({
            formData: { ...state.formData, [field]: value },
        })),
    validationModel: validationResetPasswordForm,
}));

export const useRecoveryPasswordForm = create<VerificationEmailForm>((set) => ({
    formData: EmptyVerifyEmailPlusCode, 
    resetForm: () => {
        set({
            formData: EmptyVerifyEmailPlusCode,
        })
    }, 
    updateField: (field, value) =>
        set((state) => ({
            formData: { ...state.formData, [field]: value },
        })),
    validationModel: validationVerifyEmailForm,
}));

export function useResetPasswordModal (){
    const [showModal, setShowModal] = useState<boolean>(false);

    function handleModalResetPassword(hidde: boolean){
        setShowModal(hidde);
    }

    return {
        handleModalResetPassword,
        showModal,
    };
}

export function useForgotPasswordModal (){
    const [showModal, setShowModal] = useState<boolean>(false);

    function handleModalForgotPassword(hidde: boolean){
        setShowModal(hidde);
    }

    return {
        handleModalForgotPassword,
        showModal,
    };
}