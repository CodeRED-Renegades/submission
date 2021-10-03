
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;


// Ignore these Shaheer!
export const baseUrl = `http://${host}:${port}`;
export const apiEndpoint = `${baseUrl}/api`;

// POST -- submit new incident here.
export const incidentReportsEndpoint = `${apiEndpoint}/incident`;

// Ignore these Shaheer!
export const allincidentsendpointdepartment = `${incidentReportsEndpoint}/department`;
export const allincidentsendpointlocation = `${incidentReportsEndpoint}/location`;
export const allIncidentsEndpoint = `${incidentReportsEndpoint}/all`;

// GET -- get incident by month/year
export const getAllEndpoint = (startDate=null, endDate=null) => `${allIncidentsEndpoint}/${startDate}/${endDate}>`;

// GET -- get incident by department (and month/year)
export const getAllDepartmentEndpoint = (startdate=null, enddate=null) => `${allincidentsendpointdepartment}/${startdate}/${enddate}>`;

// GET -- get incident by location (and month/year)
export const getAllLocationEndpoint = (startdate=null, enddate=null) => `${allincidentsendpointlocation}/${startdate}/${enddate}>`;
