import './App.css'
import { CustomProvider } from 'rsuite'
import Routing from './router/router'
import { NotificationProvider } from './context/NotificationContext'
import esAR from 'rsuite/locales/es_AR';

export default function App() {
  return (
    <CustomProvider locale={esAR} >
      <NotificationProvider>
        <Routing />
      </NotificationProvider>
    </CustomProvider>
  )
}