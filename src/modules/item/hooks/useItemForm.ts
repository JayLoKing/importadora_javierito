import { NewItemDTO } from "../models/item.model";

export function useItemForm(){
    const handleSubmit = async (onSuccess?: () => void, formData?: NewItemDTO) => {
        try {
            console.log(formData);
            // const res = await CreateAsync<ItemDTO,ItemDTO>(ItemUrl.create,formData!);
            // if (res !== null) {
            //     if (onSuccess) onSuccess();
            //     return true;
            // }
        } catch (error) {
            console.error("Error al crear el ítem:", error);
        } finally {
            return false;
        }
    };

    return {handleSubmit};
}