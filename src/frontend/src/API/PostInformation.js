import axios from 'axios';
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

export const baseUrl = `http://${host}:${port}`;
export const apiEndpoint = `${baseUrl}/api`;
export const incidentReportsEndpoint = `${apiEndpoint}/incident`;
export const allincidentsendpointdepartment = `${incidentReportsEndpoint}/department`;
export const allincidentsendpointlocation = `${incidentReportsEndpoint}/location`;
export const allIncidentsEndpoint = `${incidentReportsEndpoint}/all`;

export const PostIncident = async (incidentInformation) => {
    await axios.post('/', incidentInformation);
}