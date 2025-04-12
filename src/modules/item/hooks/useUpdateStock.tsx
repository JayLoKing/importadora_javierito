import { useState } from "react";
import { Message, useToaster } from "rsuite";


export const useUpdateStock = () => {
    const [showModalStock, setShowModalStock] = useState<boolean>(false);
    const [getIDStock, setGetIDStock] = useState(0);
    const toaster = useToaster();
    
    const showSuccessMessage = () => {
        toaster.push(
          <Message closable showIcon type="success" >
            Stock asignado correctamente!
          </Message>,
          { placement: 'topCenter', duration: 3000 }
        );
      };
    
    const showErrorMessage = () => {
        toaster.push(
          <Message closable showIcon type="error" >
            Ocurrió un error al actualizar el Stock.
          </Message>,
          { placement: 'topCenter', duration: 3000 }
        );
    };
    
    const handleModalStock = (isOpen: boolean) => {
        if (!isOpen) {
            setGetIDStock(0); 
        }
        setShowModalStock(isOpen);
    };

    return {
        handleModalStock,
        showModalStock,
        getIDStock,
        setGetIDStock,
        showSuccessMessage,
        showErrorMessage
    }
}