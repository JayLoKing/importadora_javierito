// Notification.ts
export interface Notification {
    id: string;
    message: string;
    timestamp: Date;
    type: 'CREATE' | 'UPDATE' | 'DELETE' | 'RESERVATION';
    userId?: number; 
    targetRole?: number; 
}

export interface Observer {
    role: number;
    update(notification: Notification): void;
}
  
export interface Subject {
    registerObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    notifyObservers(notification: Notification): void;
}