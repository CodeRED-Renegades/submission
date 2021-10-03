import axios from 'axios';
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;
export const baseUrl = `http://${host}:${port}`;
export const apiEndpoint = `${baseUrl}/api`;
export const allincidentsendpointdepartment = `${incidentReportsEndpoint}/department`;
export const allincidentsendpointlocation = `${incidentReportsEndpoint}/location`;
export const allIncidentsEndpoint = `${incidentReportsEndpoint}/all`;

export const GetTimeIncidentAsync = async (startDate, endDate) => {
    let request = await axios.get(`${allIncidentsEndpoint}/${startDate}/${endDate}>`, { params: {startDate: startDate, endDate: endDate}});
    return request;
}

export const GetGeolocationIncidentAsync = async (startDate, endDate) => {
    let request = await axios.get(`${allincidentsendpointdepartment}/${startdate}/${enddate}>`, { params: {startDate: startDate, endDate: endDate}});
    return request;
}

export const GetDepartmentIncidentAsync = async (startDate, endDate) => {
    let request = await axios.get(`${allincidentsendpointlocation}/${startdate}/${enddate}>`, { params: {startDate: startDate, endDate: endDate}});
    return request;
}