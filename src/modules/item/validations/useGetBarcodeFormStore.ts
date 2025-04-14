import {create} from "zustand";
import { Barcode } from "../models/barcode.model";


interface GetBarcodeFormStore {
    formData: Barcode;
    loadData: (data: Barcode) => void;
    resetForm: () => void;
}

export const useGetBarcodeFormStore = create<GetBarcodeFormStore>((set) => ({
    formData: {
        barcodeId: 0,
        barcode: '',
        itemName: '',
        brandName: '',
        itemModel: ''
    }, 
    loadData: (data) => set({formData: data}),
    resetForm: () => {
        set({
            formData: {
                barcodeId: 0,
                barcode: '',
                itemName: '',
                brandName: '',
                itemModel: ''
            },
        })
    }, 
}));