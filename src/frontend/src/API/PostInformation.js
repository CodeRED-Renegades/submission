import axios from 'axios';

export const PostIncident = async (incidentInformation) => {
    await axios.post('/', incidentInformation);
}