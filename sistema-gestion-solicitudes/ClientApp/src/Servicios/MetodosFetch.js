import { API_URL } from "../Utils/Variables";


export default class MetodosFetch {

    ////
    static CreateUser = async (user) => {
        console.log(user)
        let response = await fetch(API_URL + "/NewUsers/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: user
        })
        
        return response;
    }

    static CreateAnexo = async(anexo) => {


        let response = await fetch(API_URL + "/Anexos/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: anexo,
        })

        return response;

    }

    static updateEstado = async (solicitud, id) => {

        solicitud.estadoId = id;

        let response = await fetch(API_URL + "/Solicitud/" + solicitud.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(solicitud)
        })

        return response;
    };

    static updateSolicitudFechaCierre = async (dataSolicitud) => {

        console.log('dataSolicitud: ',dataSolicitud)
        let response = await fetch(API_URL + "/solicitud/fechaCierreSolicitud", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataSolicitud)
        })

        return response;
    };

    static updateSolicitudDetalle = async (solDetalle) => {

        console.log('solDetalle: ',solDetalle)
        let response = await fetch(API_URL + "/solicitudDetalles/" + solDetalle.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(solDetalle)
        })

        return response;
    };

    static addAnexos = async (anexos) => {

        let response = await fetch(API_URL + "/Anexos/Add" , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(anexos)
        })

        return response;

    }

    static createFieldAnexo = async (fields) => {

        let response = await fetch(API_URL + "/AnexoFields/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fields)
        })

        return response;


    }

    static updateFieldsAnexo = async (idAnexo, fields) => {
        let response = await fetch(API_URL + "/AnexoFields/?" + idAnexo, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fields)
        })

        return response;


    }

    static CreateAsignaciones = async (asignaciones) => {

        let response = await fetch(API_URL + "/Asignaciones/New", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(asignaciones)
        })

        return response;
    }

    static DeleteAsignacion = async (id) => {

        let response = await fetch(API_URL + "/Asignacion/"+id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
           
        })
        return response;
    }

    static CreateResolucion = async (resolucion) => {

        let response = await fetch(API_URL + "/Resolucion", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resolucion)
        })

        return response;

    }

    static createArchivos = async (formData) => {

        let response = await fetch(API_URL + "/Archivos/Create", {
            method: 'POST',
            body: formData
        })
        return response;
    }


    static createArchivoResolucion = async (file) => {

        let response = await fetch(API_URL + "/Archivo", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(file)
        })

        return response;

    }


}

