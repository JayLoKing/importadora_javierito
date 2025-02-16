import { Subject, Observer, Notification } from '../model/Notification.Model';

export class NotificationService implements Subject {
  private observers: Observer[] = [];
  private notifications: Notification[] = []; 
  registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(notification: Notification): void {
    this.observers.forEach(observer => {
      if (!notification.targetRole || observer.role === notification.targetRole) {
        observer.update(notification);
      }
    });
  }

  addNotification(notification: Notification): void {
    this.notifications.push(notification);
    this.notifyObservers(notification);
  }

  getNotifications(): Notification[] {
    return this.notifications;
  }
}