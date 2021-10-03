import { useCallback } from "react";

require("dotenv").config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

export const baseUrl = `http://${host}:${port}`;
export const apiEndpoint = `${baseUrl}/api`;
export const incidentReportsEndpoint = `${apiEndpoint}/incident`;
<<<<<<< HEAD
export const getAllEndpoint = (startDate, endDate) => `${incidentReportsEndpoint}/all/${startDate}/${endDate}>`;

=======
>>>>>>> 6a552454149045971b94616eacd738b4ab6253f4
