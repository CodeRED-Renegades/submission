import dotenv from "dotenv";
dotenv.config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

export const baseUrl = `http://${host}:${port}`;
export const apiEndpoint = `${baseUrl}/api`;
export const incidentReportsEndpoint = `${apiEndpoint}/incident`;

async function processResponse(respObj) {
    const json = await respObj.json();
    console.log(json);
    return json;
} 

export const submitIncident = async (payload) => {
    if (typeof payload != 'string') 
        payload = JSON.stringify(payload);

    console.log(payload);
    const respObj = await fetch(incidentReportsEndpoint, {
        method: 'POST',
        body: payload,
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        }
    });

    console.log(respObj.status);
    return processResponse(respObj);
}