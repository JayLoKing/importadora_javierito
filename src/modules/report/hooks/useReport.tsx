import { Message, useToaster } from "rsuite";

export const useReport = () => {
    const toaster = useToaster();
    
    const showSuccessMessage = () => {
      toaster.push(
        <Message closable showIcon type="success" >
          Reporte creado!
        </Message>,
        { placement: 'topCenter', duration: 3000 }
      );
    };
  
    const showInfoMessage = () => {
      toaster.push(
        <Message closable showIcon type="info" >
          Por favor, seleccione un rango de fechas.
        </Message>,
        { placement: 'topCenter', duration: 3000 }
      );
    };
  
    const showErrorMessage = () => {
      toaster.push(
        <Message closable showIcon type="error" >
          Ocurrió un error al obtener los datos del reporte.
        </Message>,
        { placement: 'topCenter', duration: 3000 }
      );
    };
  
    const showWarningMessage = () => {
      toaster.push(
        <Message closable showIcon type="warning" >
          No se encontraron datos para el rango de fechas seleccionado.
        </Message>,
        { placement: 'topCenter', duration: 3000 }
      );
    };
  
    return {
      showSuccessMessage,
      showInfoMessage,
      showErrorMessage,
      showWarningMessage
    }
  }