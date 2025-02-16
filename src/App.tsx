import './App.css'
import { CustomProvider } from 'rsuite'
import Routing from './router/router'
import { NotificationProvider } from './context/NotificationContext'

export default function App() {
  return (
    <CustomProvider>
      <NotificationProvider>
        <Routing />
      </NotificationProvider>
    </CustomProvider>
  )
}
