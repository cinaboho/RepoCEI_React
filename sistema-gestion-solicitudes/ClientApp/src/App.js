import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import ListaSolicitudes from './Pages/dashboard/Solicitudes/Solicitudes';
import Home from "./Pages/Home"
import Usuario from './Pages/dashboard/Users/Usuarios';
import Roles from './Pages/dashboard/Roles/Roles';
import Especialidades from './Pages/dashboard/Especialidades/Especialidades';
import Permisos from './Pages/dashboard/Permisos/Permisos';
import './Utils/custom.css';
import Anexo1A from './Pages/Anexos/AnexosForm/Anexo1A';
import Anexo1 from './Pages/Anexos/AnexosForm/Anexo1';
import Anexo2 from './Pages/Anexos//AnexosForm/Anexo2';
import Anexo3 from './Pages/Anexos/AnexosForm/Anexo3';
import Anexo4 from './Pages/Anexos/AnexosForm/Anexo4';
import Anexo5 from './Pages/Anexos/AnexosForm/Anexo5';
import Anexo6 from './Pages/Anexos/AnexosForm/Anexo6';
import LoginPage from './Pages/Welcome/Welcome';
import LoginExterno from './Pages/Welcome/LoginExterno';
import SolicitudControl from './Pages/dashboard/Solicitudes/SolicitudControl';
import RegisterPage from './Pages/Welcome/RegisterForm';
import PlazosEntrega from './Pages/dashboard/PlazosEntrega';
import Notificaciones from './Pages/dashboard/Notificaciones/Notificaciones';



const isAuthenticated = () => {
  const user = localStorage.getItem('userEspol');
  if (user) {
    const userData = JSON.parse(user);
    return userData.correo != undefined;
  }
  return false;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default class App extends Component {
  static displayName = App.name;

  render() {
      return (

          <Routes>

              <Route path="/" element={<LoginPage />} />
              <Route path="/LoginExt" element={<LoginExterno />} />
              <Route path="/Registro/:code?" element={<RegisterPage />} />
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}>
                  <Route path="/Solicitudes" element={<ListaSolicitudes />} />
                  <Route path="/Solicitud/:id" element={<SolicitudControl />} />
                  <Route path="/Usuarios" element={<Usuario />} />
                  <Route path="/Roles" element={<Roles />} />
                  <Route path="/Notificaciones" element={<Notificaciones />} />
                  <Route path="/Especialidades" element={<Especialidades />} />
                  <Route path="/Permisos" element={<Permisos />} />
                  <Route path="/PlazosSolicitudes" element={<PlazosEntrega />} />
                  <Route path="/Anexo1A/:id" element={<Anexo1A />} />
                  <Route path="/Anexo1/:id" element={<Anexo1 />} />
                  <Route path="/Anexo2/:id" element={<Anexo2 />} />
                  <Route path="/Anexo3/:id" element={<Anexo3 />} />
                  <Route path="/Anexo4/:id" element={<Anexo4 />} />
                  <Route path="/Anexo5/:id" element={<Anexo5 />} />
                  <Route path="/Anexo6/:id" element={<Anexo6 />} />

            </Route>
            

        </Routes>
    );
  }
}
