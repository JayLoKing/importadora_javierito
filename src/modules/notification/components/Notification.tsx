import { FC, useEffect, useState } from 'react';
import { Notification } from '../model/Notification.Model';
import { useNotificationService } from '../../../context/NotificationContext';
import { Divider } from 'rsuite';

interface NotificationComponentProps {
  userRole: number;
}

export const NotificationComponent: FC<NotificationComponentProps> = ({ userRole }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notificationService = useNotificationService();

  useEffect(() => {
    const existingNotifications = notificationService.getNotifications();
    setNotifications(existingNotifications);

    const observer = {
      role: userRole,
      update: (notification: Notification) => {
        setNotifications(prev => [...prev, notification]);
      },
    };

    notificationService.registerObserver(observer);

    return () => {
      notificationService.removeObserver(observer);
    };
  }, [notificationService, userRole]);

  return (
    <>
      {notifications.length === 0 ? (
        <p>No hay notificaciones.</p>
      ) : (
        notifications.map(notification => (
          <div key={notification.id}>
            <p>
              <strong>{notification.type}</strong>
              {notification.message} - {notification.timestamp.toLocaleString()}
            </p>
            <Divider />
          </div>
        ))
      )}
    </>
  );
};