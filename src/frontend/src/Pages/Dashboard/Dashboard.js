import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { SafetyCard } from './Components/SafetyCard';
import { BarChart } from './Components/Chart/BarChart';
import { FormControl, FormLabel,  FormControlLabel, RadioGroup, Radio, Modal } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import { GetTimeIncidentAsync, GetGeolocationIncidentAsync, GetDepartmentIncidentAsync } from '../../API/GetInformation';

export const Dashboard = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [xAxis, setXaxis] = useState([]);
    const [yAxis, setYaxis] = useState([]);

    const description = {
        Transport: 'Workers and equipment are required to be transported to and from well sites. Wells are often located in remote areas, and require traveling long distances to get to the sites. Highway vehicle crashes are the leading cause of oil and gas extraction worker fatalities. Roughly 4 of every 10 workers killed on the job in this industry are killed as a result of a highway vehicle incident (Census of Fatal Occupational Injuries).',
        OilSpill: 'People who clean up the spill are more at risk. Problems could include skin and eye irritation, neurologic and breathing problems, and stress. Not much is known about the long-term effects of oil spills.',
        ElectricalFire: 'Most electrical fires are caused by faulty electrical outlets and old, outdated appliances. Other fires are started by faults in appliance cords, receptacles and switches.',
        PowerOutage: 'Even if you have an oil-based source of household heating, a power outage will still disrupt service and indoor temperatures will dip. A frozen or burst pipe can halt your access to running water (and could lead to some very expensive repairs).',
        BrokenPipe: 'One of the biggest risks that a burst pipe poses is to your health. If you are unable to get rid of the stagnant water immediately, it can lead to the formation of mold, mildew, and humidity.'
    }

    useEffect(() => {
        async function GetGeolocationIncident() {
            await GetGeolocationIncidentAsync(null, null).then(resolution => {
                setXaxis(Object.keys(resolution.data));
                setYaxis(Object.values(resolution.data));
            });
        }
        GetGeolocationIncident();
    }, []);

    const handleRadio = (input) => {
        if(input == 3) {
            async function GetTimeIncident() {
                await GetTimeIncidentAsync(null, null).then(resolution => {
                    console.log(resolution.data);
                    setXaxis(Object.keys(resolution.data));
                    setYaxis(Object.values(resolution.data));
                });
            }
            GetTimeIncident();
        }
        else if (input == 2) {
            async function GetGeolocationIncident() {
                await GetGeolocationIncidentAsync(null, null).then(resolution => {
                    setXaxis(Object.keys(resolution.data));
                    setYaxis(Object.values(resolution.data));
                });
            }
            GetGeolocationIncident();
        }
        else {
            async function GetDepartmentIncident() {
                await GetDepartmentIncidentAsync(null, null).then(resolution => {
                    setXaxis(Object.keys(resolution.data));
                    setYaxis(Object.values(resolution.data));
                });
            }
            GetDepartmentIncident();
        }
    }

    return(
        <div className='dashboard'>
            <div className='body'>
                <div className='graph-container center full-width'>
                    <div style={{width: '57.5%'}}>
                        <div className='full-width center'>Statistics Report</div>
                        <BarChart horizontal={xAxis} vertical={yAxis}></BarChart>
                    </div>
                </div>
                <div className='action-container center' style={{width: '57.5%'}}>
                    <FormControl component='fieldset' className='full-width'>
                        <FormLabel component='legend' className='center'>Options:</FormLabel>
                        <RadioGroup row aria-label='Options' defaultValue='Geolocation' name='radio-button-group' className='center full-width'>
                            <FormControlLabel value="Geolocation" control={<Radio />} label='Geolocation' onChange={() => handleRadio(2)}></FormControlLabel>
                            <FormControlLabel value="Department" control={<Radio />} label='Department' onChange={() => handleRadio(1)}></FormControlLabel>
                            <FormControlLabel value="Time" control={<Radio />} label='Time' onChange={() => handleRadio(3)}></FormControlLabel>
                            
                        </RadioGroup>
                    </FormControl>
                    <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker id='startTime' clearable label={'Start Time: '} value={startDate} 
                            onChange={(date) => setStartDate(date)} format='MM/dd/yyyy' inputVariant='standard'></KeyboardDatePicker>
                        </MuiPickersUtilsProvider>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker id='endTime' clearable label={'End Time: '} value={endDate} 
                            onChange={(date) => setEndDate(date)} format='MM/dd/yyyy' inputVariant='standard'></KeyboardDatePicker>
                        </MuiPickersUtilsProvider>
                    </div>
                    <div><Link to='/form'><Button>Report an Incident</Button></Link></div>
                </div>
                <div className='safety-container center full-width'>
                    <div style={{width: '77.5%'}}>
                        <div className='center full-width'>Hazard Information: </div>
                        <div className='safety-card-container full-width'>
                            <SafetyCard title={'Transportation'} image={''} content={description.Transport}></SafetyCard>
                            <SafetyCard title={'Oil Spill'} image={''} content={description.OilSpill}></SafetyCard>
                            <SafetyCard title={'Electrical Fires'} image={''} content={description.ElectricalFire}></SafetyCard>
                            <SafetyCard title={'Power Outage'} image={''} content={description.PowerOutage}></SafetyCard>
                            <SafetyCard title={'Broken Pipes'} image={''} content={description.BrokenPipe}></SafetyCard>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer full-width'>
                <div className='information'>
                    <div>First</div>
                    <div>Second</div>
                    <div>Third</div>
                </div>
                <div className='trademark'>
                    <div>Trademark</div>
                </div>
            </div>
        </div>
    );
}