import { Container } from "@mui/material"
import Login from './Components/Login/LoginForm'
import Cancelacion from './Views/Cancelacion'
import Extraccion from './Components/Operaciones/Extraccion'
import Exito from './Views/Exito'
import { Routes, Route } from 'react-router-dom'
import OperacionesUser from "./Views/OperacionesUser"
import OtroMonto from './Views/OtroMonto'
import ConsultaSaldo from "./Views/ConsultaSaldo"
import Deposito from "./Components/Operaciones/Deposito"

function App() {


  return (
    <>
      <Container maxWidth="lg" >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/operacionesUser" element={<OperacionesUser />} />
          <Route path="/cancelacion" element={<Cancelacion />} />
          <Route path="/extraccion" element={<Extraccion />} />
          <Route path="/exito" element={<Exito />} />
          <Route path="/otroMonto" element={<OtroMonto />} />
          <Route path="/consultaSaldo" element={<ConsultaSaldo />} />
          <Route path="/deposito" element={<Deposito />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
