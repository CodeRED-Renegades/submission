import axios from 'axios';

export const GetTimeIncidentAsync = async (startDate, endDate) => {
    let request = await axios.get('/');
    return request;
}

export const GetGeolocationIncidentAsync = async (startDate, endDate) => {
    let request = await axios.get('/');
    return request;
}

export const GetDepartmentIncidentAsync = async (startDate, endDate) => {
    let request = await axios.get('/');
    return request;
}