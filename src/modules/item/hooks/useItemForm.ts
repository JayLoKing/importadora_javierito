import { NewItemDTO } from "../models/item.model";
import { CreateAsync } from "../services/itemService";
import { ItemUrl } from "../urls/item.url";

export function useItemForm(){
    const handleSubmit = async (onSuccess?: () => void, formData?: NewItemDTO) => {
        try {
            console.warn(formData);
            
            const res = await CreateAsync<NewItemDTO,NewItemDTO>(ItemUrl.create,formData!);
            if (res !== null) {
                if (onSuccess) onSuccess();
                return true;
            }
            
        } catch (error) {
            console.error("Error al crear el ítem:", error);
        } finally {
            console.error("retornando falso");
            return false;
        }
    };

    return {handleSubmit};
}