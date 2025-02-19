import { FC, useEffect, useState } from 'react';
import { Notification } from '../model/Notification.Model';
import { useNotificationService } from '../../../context/NotificationContext';
import { Badge, Divider, IconButton, Popover, Whisper } from 'rsuite';
import { FaRegBell } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';

interface NotificationComponentProps {
  userRole: string;
  visibility: () => void;
}

export const NotificationComponent: FC<NotificationComponentProps> = ({ userRole, visibility }) => {
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

  const actionColors: Record<string, string> = {
    REGISTRO: 'green',
    EDICION: 'blue',
    ELIMINACION: 'red',
    RESERVA: 'orange',
  };
  const allowedTypes = ['REGISTRO', 'EDICION', 'ELIMINACION', 'RESERVA'];
  const messageNotifications = notifications.filter(typeMessage => allowedTypes.includes(typeMessage.actionType));

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <>
      {messageNotifications.length === 0 ? (
        <Whisper trigger="click" placement="bottomEnd" speaker={
          <Popover title="Notificaciones">
            <div style={{ padding: "10px" }}>
              <p>
                <strong>No tiene notificaciones.</strong>
              </p>
            </div>
          </Popover>
        }>
          <IconButton 
            style={{ marginRight: "15px", fontSize: '24px', background: "transparent", color: "white" }} 
            icon={<Badge content={messageNotifications.length}><FaRegBell /></Badge>} 
            appearance="subtle" 
            onClick={visibility} 
          />
        </Whisper>
      ) : (
        <Whisper trigger="click" placement="bottomEnd" speaker={
          <Popover title="Notificaciones">
            <div style={{ padding: "10px" }}>
              {messageNotifications.map(notification => (
                <>
                  <div key={notification.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p>
                    <strong>{notification.type}</strong> - <strong style={{ color: actionColors[notification.actionType] }}>{notification.actionType}</strong><br/>
                    {notification.timestamp.toLocaleString()}<br/>
                    El {notification.targetRole} {notification.userName} {notification.message}  
                  </p>
                  <IconButton 
                    icon={<RxCross1 />} 
                    appearance="default" 
                    color="red" 
                    onClick={() => handleDelete(notification.id)} 
                  />
                </div>
                <Divider />
                </>
              ))}
              
            </div>
          </Popover>
        }>
          <IconButton 
            style={{ marginRight: "15px", fontSize: '24px', background: "transparent", color: "white" }} 
            icon={<Badge content={messageNotifications.length}><FaRegBell /></Badge>} 
            appearance="subtle" 
            onClick={visibility} 
          />
        </Whisper>
      )}
    </>
  );
};
