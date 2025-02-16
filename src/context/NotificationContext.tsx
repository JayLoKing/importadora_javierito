// NotificationContext.tsx
import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { NotificationService } from '../modules/notification/service/NotificationService';

const NotificationContext = createContext<NotificationService | null>(null);

export const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notificationService] = useState(new NotificationService());

  return (
    <NotificationContext.Provider value={notificationService}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationService = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationService debe usarse dentro de un NotificationProvider');
  }
  return context;
};