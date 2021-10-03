import React, { useState } from 'react';
import './Dashboard.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { SafetyCard } from './Components/SafetyCard';
import { BarChart } from './Components/Chart/BarChart';
import { FormControl, FormLabel,  FormControlLabel, RadioGroup, Radio, Modal } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

export const Dashboard = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className='dashboard'>
            <div className='body'>
                <div className='graph-container center full-width'>
                    <div style={{width: '57.5%'}}>
                        <div className='full-width center'>Statistics Report</div>
                        <BarChart></BarChart>
                    </div>
                </div>
                <div className='action-container center' style={{width: '57.5%'}}>
                    <FormControl component='fieldset' className='full-width'>
                        <FormLabel component='legend' className='center'>Options:</FormLabel>
                        <RadioGroup row aria-label='Options' defaultValue='Time' name='radio-button-group' className='center full-width'>
                            <FormControlLabel value="Time" control={<Radio />} label='Time'></FormControlLabel>
                            <FormControlLabel value="Geolocation" control={<Radio />} label='Geolocation'></FormControlLabel>
                            <FormControlLabel value="Department" control={<Radio />} label='Department'></FormControlLabel>
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
                        <div className='safety-card-container full-width'>
                            <SafetyCard title={'First'} image={'First'} content={'First'}></SafetyCard>
                            <SafetyCard title={'Second'} image={'Second'} content={'Second'}></SafetyCard>
                            <SafetyCard title={'Third'} image={'Third'} content={'Third'}></SafetyCard>
                            <SafetyCard title={'Fourth'} image={'Fourth'} content={'Fourth'}></SafetyCard>
                            <SafetyCard title={'Fifth'} image={'Fifth'} content={'Fifth'}></SafetyCard>
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