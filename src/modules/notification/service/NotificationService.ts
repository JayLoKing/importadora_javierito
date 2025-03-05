// NotificationService.ts
import { db } from '../../../firebase/credentials';
import { Subject, Observer, Notification } from '../model/Notification.Model';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export class NotificationService implements Subject {
  private observers: Observer[] = [];
  private notifications: Notification[] = [];

  constructor() {
    // Carga inicial de notificaciones desde Firestore al iniciar el servicio
    this.loadNotificationsFromFirestore();
  }

  // Cargar notificaciones desde Firestore
  private async loadNotificationsFromFirestore() {
    try {
      const querySnapshot = await getDocs(collection(db, "notifications"));
      this.notifications = querySnapshot.docs.map(doc => ({
        id: doc.id, // Usamos el ID del documento de Firestore
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(), // Convierte el timestamp de Firestore a Date
      } as Notification));
      this.notifyObservers(null); // Notifica a los observadores con la carga inicial
    } catch (error) {
      console.error("Error cargando notificaciones desde Firestore:", error);
    }
  }

  registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(notification: Notification | null): void {
    this.observers.forEach(observer => {
      if (!notification || !notification.targetRole || observer.role === notification.targetRole) {
        observer.update(notification || { id: '', message: '', timestamp: new Date(), actionType: 'REGISTRO', type: 'Repuesto', userName: '' });
      }
    });
  }

  // Añadir una notificación y guardarla en Firestore
  async addNotification(notification: Omit<Notification, 'id'>): Promise<void> {
    try {
      const docRef = await addDoc(collection(db, "notifications"), {
        ...notification,
        timestamp: notification.timestamp, // Firestore manejará esto como Timestamp
      });
      const newNotification = { ...notification, id: docRef.id };
      this.notifications.push(newNotification);
      this.notifyObservers(newNotification);
    } catch (error) {
      console.error("Error al añadir notificación a Firestore:", error);
    }
  }

  // Eliminar una notificación de Firestore
  async deleteNotification(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, "notifications", id));
      this.notifications = this.notifications.filter(notif => notif.id !== id);
      this.notifyObservers(null); // Notifica la actualización
    } catch (error) {
      console.error("Error al eliminar notificación de Firestore:", error);
    }
  }

  getNotifications(): Notification[] {
    return this.notifications;
  }
}