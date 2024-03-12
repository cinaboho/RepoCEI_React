import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton } from '@mui/material';
import Notification from "./NotificationSection/Notification";
import ProfileUser from "./ProfileSection/ProfileUser";
import NavComite from './NavComite';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const redirectToLogout = () => {
    Cookies.remove(process.env.REACT_APP_ESPOL_COOKIE_JWT);
    //navigate('/account/login');
    window.location.href = process.env.REACT_APP_CAS_URL + "/logout";
    //navigate(casurl + "/login?service="+dominio);
};

const Topbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    // Recuperar el objeto userEspol de localStorage y parsearlo a un objeto JavaScript
    const userEspol = JSON.parse(localStorage.getItem('userEspol'));

    // Obtener el correo del objeto userEspol
    const userEmail = userEspol?.correo || 'Usuario'; // Utiliza un valor por defecto si userEspol es null

    const handleLogout = () => {
        // Lógica para cerrar la sesión del usuario

        let access=localStorage.getItem('access');
        if(access=='1'){
            localStorage.removeItem('access');
            redirectToLogout()
        }

        localStorage.removeItem('userEspol');
        console.log('Sesión cerrada con éxito');
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <>
            <div className="d-flex flex-column p-0">         
                <div className="d-flex justify-content-between">
                    <IconButton onClick={toggleSidebar}>
                        <MenuIcon />
                    </IconButton>
                    <div className="my-2 my-lg-0">
                        <Notification />
                        {/* Reemplazar 'Juan Vera' con el correo del usuario dinámicamente */}
                        <span className="mr-3">{userEmail}</span>
                        <ProfileUser />
                        <Button size="small" onClick={handleLogout} style={{ backgroundColor: '#253260', color: 'white' }}>
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>
                <div className="Comite p-2 rounded">
                    <NavComite />
                </div>
            </div>
        </>
    );
};

export default Topbar;
