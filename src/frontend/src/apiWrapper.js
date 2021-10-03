require("dotenv").config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

export const baseUrl = `http://${host}:${port}`;
export const apiEndpoint = `${baseUrl}/api`;
export const incidentReportsEndpoint = `${apiEndpoint}/incident`;
export const allIncidentsEndpoint = `${incidentReportsEndpoint}/all`;
export const getAllEndpoint = (startDate, endDate) => `${incidentReportsEndpoint}/all/${startDate}/${endDate}>`;