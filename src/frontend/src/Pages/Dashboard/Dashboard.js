import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment'

import { SafetyCard } from './Components/SafetyCard';
import { BarChart } from './Components/Chart/BarChart';
import { FormControl, FormLabel,  FormControlLabel, RadioGroup, Radio, Modal } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import { GetTimeIncidentAsync, GetGeolocationIncidentAsync, GetDepartmentIncidentAsync } from '../../API/GetInformation';

const parseDate = (date) => {
    const dayString = String(date.getDate()).padStart(2,'0');
    const stringDate = moment(date).format('yyyy-mm'.substring(0,7) + '-' + dayString + ' 00:00:00');
    return stringDate;
}

export const Dashboard = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isTime, setIsTime] = useState(false)

    const [xAxis, setXaxis] = useState([]);
    const [yAxis, setYaxis] = useState([]);

    const description = {
        Transport: 'Workers and equipment are required to be transported to and from well sites. Wells are often located in remote areas, and require traveling long distances to get to the sites. Highway vehicle crashes are the leading cause of oil and gas extraction worker fatalities. Roughly 4 of every 10 workers killed on the job in this industry are killed as a result of a highway vehicle incident (Census of Fatal Occupational Injuries).',
        OilSpill: 'People who clean up the spill are more at risk. Problems could include skin and eye irritation, neurologic and breathing problems, and stress. Not much is known about the long-term effects of oil spills.',
        ElectricalFire: 'Most electrical fires are caused by faulty electrical outlets and old, outdated appliances. Other fires are started by faults in appliance cords, receptacles and switches.',
        PowerOutage: 'Even if you have an oil-based source of household heating, a power outage will still disrupt service and indoor temperatures will dip. A frozen or burst pipe can halt your access to running water (and could lead to some very expensive repairs).',
        BrokenPipe: 'One of the biggest risks that a burst pipe poses is to your health. If you are unable to get rid of the stagnant water immediately, it can lead to the formation of mold, mildew, and humidity.'
    }
    const prevention = {
        Transport: 'Oil transportation over land is best prevented by ensuring that the drivers are properly trained. Driving large trucks full of oil is very different from driving a standard car. This is why it is crucial that each and every person who operates such vehicles are aware of the differences and the best way to react to situations in which something goes wrong. Additionally, making sure that the trucks are properly maintained over the years and are regularly checked up on is the best way to prevent trucks from malfunctioning and leading to an accident.',
        OilSpill: 'The best way to deal with an oil spill is to prevent one from ever occurring. Once the oil has spilled onto water, it is very difficult and costly to remove it before the native ecosystem is severely damaged, and sometimes it is outright impossible to do so. The best way to prevent oil spills is to understand the reasons they occur and address those issues at the root cause, whatever they may be. For example, ensuring that there are regular updates to the safety integrity of the material used in an oil rig or making sure that the weight is distributed properly when being transported. The scope of this extends far beyond what just a company can do. For example, checking the weather beforehand to ensure a safe journey and avoiding possibly cheaper sourced materials when constructing ships/offshore rigs.',
        ElectricalFire: 'Electrical fires are extremely dangerous and the best way to deal with them is by reducing the chances for such a fire to ignite in the first place. Additionally, sometimes there can be unforeseen circumstances and a fire does break out; it is important to have all employees trained and ready to react with the best possible solution. For example, ensuring that every employee knows where a fire extinguisher is located and is capable of using one effectively. Ensuring that everything that is used in a plant is up to code.',
        PowerOutage: 'Sometimes, it is not possible to prevent a power outage from occurring but there are ways to reduce the effect they have on systems. For example, if the local grid runs out of power due to severe weather, the best way to mitigate the situation would be to have backup generators that would automatically run as soon as the voltage being supplied dips under a certain threshold and support the plant until it is no longer necessary or until the plant can be safely shut down.',
        BrokenPipe: 'Depending on the geographical and physical location of the pipes, they will be treated differently. In some areas of the world, pipes are not treated to face certain weather extremes and eventually break or crack. Making sure every pipe is inspected properly and thoroughly treated is critical to preventing this safety hazard.'
    }

    useEffect(() => {
        // console.log('Test');
        // async function GetDepartmentIncident() {
        //     await GetDepartmentIncidentAsync().then(resolution => {
        //         // console.log(resolution.data.values());
        //         // console.log(resolution.data.keys())
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
                    console.log(startDate);
                    console.log(endDate);
                    let label = [];
                    let data = [];
                    for(let object of resolution.data) {
                        label.push(`${object.month}, ${object.year}`)
                        data.push(object.count);
                    }
                    setXaxis(Object.keys(label));
                    setYaxis(Object.values(data));
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
                        <div className='full-width center' style={{fontSize: '24px', marginBottom: '15px'}}><b>Incident Statistics</b></div>
                        <BarChart horizontal={xAxis} vertical={yAxis}></BarChart>
                    </div>
                </div>
                <div className='action-container center' style={{width: '57.5%'}}>
                    <FormControl component='fieldset' className='full-width'>
                        <FormLabel component='legend' className='center'>Categories:</FormLabel>
                        <RadioGroup row aria-label='Options' defaultValue='Geolocation' name='radio-button-group' className='center full-width'>
                            <FormControlLabel value="Geolocation" control={<Radio />} label='Geolocation' onChange={() => {setIsTime(false); handleRadio(2)}}></FormControlLabel>
                            <FormControlLabel value="Department" control={<Radio />} label='Department' onChange={() => {setIsTime(false); handleRadio(1)}}></FormControlLabel>
                            <FormControlLabel value="Time" control={<Radio />} label='Time' onChange={() => {setIsTime(true); handleRadio(3)}}></FormControlLabel>
                        </RadioGroup>
                    </FormControl>
                    <div><Link to='/form'><Button>Report an Incident</Button></Link></div>
                </div>
                <div className='safety-container center full-width'>
                    <div style={{width: '77.5%'}}>
                        <div className='center full-width' style={{fontSize: '24px', marginBottom: '15px'}}><b>Hazard Information:</b></div>
                        <div className='safety-card-container full-width'>
                            <SafetyCard title={'Transportation'} prevention={prevention.Transport} content={description.Transport}></SafetyCard>
                            <SafetyCard title={'Oil Spill'} prevention={prevention.OilSpill} content={description.OilSpill}></SafetyCard>
                            <SafetyCard title={'Electrical Fires'} prevention={prevention.ElectricalFire} content={description.ElectricalFire}></SafetyCard>
                            <SafetyCard title={'Power Outage'} prevention={prevention.PowerOutage} content={description.PowerOutage}></SafetyCard>
                            <SafetyCard title={'Broken Pipes'} prevention={prevention.BrokenPipe} content={description.BrokenPipe}></SafetyCard>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer full-width'>
                <div className='information'>
                    <div>Safety Metrics 2021.0.0</div>
                </div>
                <div className='trademark'>
                    <div>Trademark</div>
                </div>
            </div>
        </div>
    );
}