import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import BadgeIcon from '@mui/icons-material/Badge';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TimerIcon from '@mui/icons-material/Timer';

import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';


const getUserRoles = () => {
    const user = JSON.parse(localStorage.getItem('userEspol'));
    let roles= user?.roles; // Asumiendo que el rol está almacenado en la propiedad 'rol'
    let listRoles=[]
    for(let i=0;i<roles.length;i++){
        let role=roles[i]
        let roleName=role.nombre
        listRoles.push(roleName)
    }

    return listRoles
};
  

export const SidebarData = [
    {
        id: 1,
        titulo: 'Inicio',
        path: '/Solicitudes',

        icon: <HomeIcon sx={{ color: 'white' }} />
    },
    {
        id: 2,
        titulo: 'Solicitudes',
        path: '/Solicitudes',
        icon: <FileCopyIcon sx={{ color: 'white' }} />

    },
    
    {
        id: 4,
        titulo: 'Usuarios',
        path: '/Usuarios',
        icon: <GroupIcon sx={{ color: 'white' }} />


    }, {
        id: 5,
        titulo: 'Permisos',
        path: '/Permisos',
        icon: <LockPersonIcon sx={{ color: 'white' }} />

    },
    {
        id: 6,
        titulo: 'Roles',
        path: '/Roles',
        icon: <BadgeIcon sx={{ color: 'white' }} />

    },
    {
        id: 7,
        titulo: 'Especialidades',
        path: '/Especialidades',
        icon: <PsychologyIcon sx={{ color: 'white' }} />

    },
    {
        id: 8,
        titulo: 'Plazos de Solicitudes',
        path: '/PlazosSolicitudes',
        icon: <TimerIcon sx={{ color: 'white' }} />

    },
    {
        id: 9,
        titulo: 'Notificaciones',
        path: '/Notificaciones',
        icon: <BadgeIcon sx={{ color: 'white' }} />

    },


]


export const useSidebarData = () => {
    const [sidebarData, setSidebarData] = useState([]);
  
    useEffect(() => {
      const roles = getUserRoles();
      console.log('roles: ',roles)
      let filteredData;

      console.log('SidebarData: ',SidebarData)
        
      if (roles.indexOf('Investigador')!=-1 || roles.indexOf('Usuario Externo')!=-1 || roles.indexOf('Miembro del Comite')!=-1 || roles.indexOf('Revisor')!=-1) {
        console.log('IF')
        // Solo mostrar 'Inicio' y 'Solicitudes' para el rol 'Investigador'
        filteredData = SidebarData.filter(item => item.titulo === 'Inicio' || item.titulo === 'Solicitudes' || item.titulo === 'Notificaciones');
      } else if(roles.indexOf('Presidente')!=-1 || roles.indexOf('Secretaria')!=-1) {
        // Aquí puedes manejar otros roles y decidir qué mostrar
        filteredData = SidebarData;
      }
  
      setSidebarData(filteredData);
    }, []); // Asegúrate de que este efecto se ejecute solo una vez
  
    return sidebarData;
  };
