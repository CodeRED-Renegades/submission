
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

export const baseUrl = `http://${host}:${port}`;
export const apiEndpoint = `${baseUrl}/api`;
export const incidentReportsEndpoint = `${apiEndpoint}/incident`;
export const allIncidentsEndpoint = `${incidentReportsEndpoint}/all`;
export const getAllEndpoint = (startDate, endDate) => `${allIncidentsEndpoint}/${startDate}/${endDate}>`;

//Department
export const allincidentsendpointdepartment = `${incidentReportsEndpoint}/department`;
export const getAllDepartmentEndpoint = (startdate=null, enddate=null) => `${allincidentsendpointdepartment}/${startdate}/${enddate}>`;

//location
export const allincidentsendpointlocation = `${incidentReportsEndpoint}/location`;
export const getAllLocationEndpoint = (startdate=null, enddate=null) => `${allincidentsendpointlocation}/${startdate}/${enddate}>`;
