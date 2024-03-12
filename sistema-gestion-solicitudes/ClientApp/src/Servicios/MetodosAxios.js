import axios from "axios";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const token = Cookies.get(process.env.REACT_APP_ESPOL_COOKIE_JWT);
// Define the headers with the authorization token
const headers = {
    'Authorization': `Bearer ${token}`,
}

export default class MetodosAxios {
    static instanceAxios = axios.create({
        baseURL: process.env.REACT_APP_API_SISTEMA + "api",
        //withCredentials: true
    });
        
    static autenticar = (item) => {
        /*return MetodosAxios.instanceAxios.delete(`/Bienes/DeleteBienTraspaso`, bien , { headers })*/
        return MetodosAxios.instanceAxios.post(`/Account/Login`, item).then(response => {
            console.log(response.data);
            let token = response.data.token;
            console.log(process.env);
            localStorage.setItem('userEspolInterno',JSON.stringify(response.data))
            document.cookie = process.env.REACT_APP_ESPOL_COOKIE_JWT +"=" + token;
            window.location.reload();
            // setTimeout(() => {
            //     console.log(token);
            //     if (token) {
            //         Swal.fire({
            //             title: 'Bienvenido',
            //             icon: "success"
            //         });
            //         window.location.href = `/`;
            //     } else {
            //         Swal.fire({
            //             title: 'No se pudieron comprobar sus credenciales.',
            //             icon: "error"
            //         });
            //         window.location.href = `/`;
            //     }
            // }, 500);
        }).catch(error => {
            console.log(error);
            Swal.fire({
                title: 'No se pudieron comprobar sus credenciales.',
                icon: "error"
            });
        });
    };
   
}