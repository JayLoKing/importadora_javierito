import './App.css'
import { CustomProvider } from 'rsuite'
import Routing from './router/router'

export default function App() {
  return (
    <CustomProvider>
      <Routing />
    </CustomProvider>
  )
}
