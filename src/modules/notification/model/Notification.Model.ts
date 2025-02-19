export interface Notification {
    id: string;
    message: string;
    timestamp: Date;
    actionType: 'REGISTRO' | 'EDICION' | 'ELIMINACION' | 'RESERVA';
    type: 'Repuesto' | 'Sucursal' | 'Personal';
    userName: string;
    targetRole?: string; 
}

export interface Observer {
    role: string;
    update(notification: Notification): void;
}
  
export interface Subject {
    registerObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    notifyObservers(notification: Notification): void;
}