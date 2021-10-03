import axios from 'axios';
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

export const baseUrl = `http://${host}:${port}`;
export const apiEndpoint = `${baseUrl}/api`;
export const incidentReportsEndpoint = `${apiEndpoint}/incident`;
export const allincidentsendpointdepartment = `${incidentReportsEndpoint}/department`;
export const allincidentsendpointlocation = `${incidentReportsEndpoint}/location`;
export const allIncidentsEndpoint = `${incidentReportsEndpoint}/all`;

export const GetTimeIncidentAsync = async (startDate = null, endDate = null) => {
<<<<<<< HEAD
    let request = await axios.get(`${allIncidentsEndpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }});
=======
    let request = await axios.get(`${allIncidentsEndpoint}/${startDate}/${endDate}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
>>>>>>> 2e059d7bf042d02281843ec62f198fb2d5cd486e
    return request;
}

export const GetGeolocationIncidentAsync = async (startDate = null, endDate = null) => {
<<<<<<< HEAD
    let request = await axios.get(`${allincidentsendpointlocation}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }});
=======
    let request = await axios.get(`${allincidentsendpointlocation}/${startDate}/${endDate}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
>>>>>>> 2e059d7bf042d02281843ec62f198fb2d5cd486e
    return request;
}

export const GetDepartmentIncidentAsync = async (startDate = null, endDate = null) => {
    let request = await axios.get(`${allincidentsendpointdepartment}/${startDate}/${endDate}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return request;
}