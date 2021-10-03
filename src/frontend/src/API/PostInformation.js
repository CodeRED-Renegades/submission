import axios from 'axios';
import { incidentReportsEndpoint } from './endpoints';

export const postIncident = (incidentInformation) => {
    return axios.post(incidentReportsEndpoint, incidentInformation);
}