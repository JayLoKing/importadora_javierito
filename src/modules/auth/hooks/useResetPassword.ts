/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from "zustand";
import { ResetPassword, VerifyEmail } from "../models/resetPassword.model";
import { validationResetPasswordForm, validationVerifyEmailForm } from "../utils/validations/validation_form";
import { useState } from "react";

interface ResetPasswordForm {
    formData: ResetPassword;
    resetForm: () => void;
    updateField: (field: keyof ResetPassword, value: any) => void;
    validationModel: any;
}

interface VerificationEmailForm {
    formData: VerifyEmail;
    resetForm: () => void;
    updateField: (field: keyof VerifyEmail, value: any) => void;
    validationModel: any;
}

export const useResetPasswordForm = create<ResetPasswordForm>((set) => ({
    formData: {
        email: '',
        newPassword: '',
        confirmPassword: '',
    }, 
    resetForm: () => {
        set({
            formData: {
                email: '',
                newPassword: '',
                confirmPassword: '',
            },
        })
    }, 
    updateField: (field, value) =>
        set((state) => ({
            formData: { ...state.formData, [field]: value },
        })),
    validationModel: validationResetPasswordForm,
}));

export const useValidateEmailForm = create<VerificationEmailForm>((set) => ({
    formData: {
        email: '',
        code: '',
    }, 
    resetForm: () => {
        set({
            formData: {
                email: '',
                code: '',
            },
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