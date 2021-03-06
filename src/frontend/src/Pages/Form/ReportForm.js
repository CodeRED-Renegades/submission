import React, { useState } from 'react';
import './Form.css'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { Select, Checkbox, TextField, Slider, FormControl, MenuItem, InputLabel, FormGroup, FormControlLabel } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Button } from 'react-bootstrap';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

import { incidentReportsEndpoint } from '../../API/endpoints';

const parseDate = (date) => {
    console.log("--date--");
    console.log(date);
    const stringDate = moment(date).format('YYYY-MM-DD');
    const dbDate = `${stringDate} 00:00:00`;
    console.log("dbDate:" + dbDate);
    return dbDate;
}

export const ReportForm = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [managerName, setManagerName] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [geolocation, setGeolocation] = useState("");
    const [department, setDepartment] = useState("");
    const [hazard, setHazard] = useState("");
    const [description, setDescription] = useState("");
    const [injuryCount, setInjuryCount] = useState("");
    const [fatalityCount, setFatalityCount] = useState("");
    const [nearMiss, setNearMiss] = useState(true);
    const [dangerLevel, setDangerLevel] = useState(0);
    const pageHistory = useHistory();

    const sliderChangeHandler = (val) => {
        const value = parseInt(val.target.innerText);
        setDangerLevel(value);
    }

    const ValidateHandler = (values) => {
        const errors = {};
        if(!selectedDate) {
            errors.time = 'Must select a time.';
        }
        if(!geolocation) {
            errors.geolocation = 'Must select a geolocation.';
        }
        // if(!values.employees){
        //     errors.employees = 'Must specify the employees affected.';
        // }   
        // if(!values.manager){
        //     errors.manager = 'Must specify the manager.';
        // }
        if(!department){
            errors.department = 'Must specify the department.';
        }
        if(!hazard){
            errors.typeOfHazard = 'Must specify the type of hazard.';
        }
        // if(!values.description){
        //     errors.description = 'Must input a description.';
        // }
        // if(!values.injuryCount){
        //     errors.injuryCount = 'Must specify the injury count.';
        // }
        // if(!values.fatalityCount){
        //     errors.fatalityCount = 'Must specify the fatality count.';
        // }
        // if(!values.nearMiss){
        //     errors.nearMiss = 'Must specify if a near miss.';
        // }
        return errors;
    }

    const initialValues = {
        time: Date.now(),
        geolocation: "Houston",
        employees: "",
        manager: "",
        department: "Exploration",
        typeOfHazard: "Oil Spill",
        description: "",
        dangerLevel: 0,
        injuryCount: "0",
        fatalityCount: "0",
        nearMiss: false
    }

    const handleSubmission = (e) => {
        const stateValues = {
            'Time': selectedDate,
            'Geolocation': geolocation, 
            'Manager_Name': managerName, 
            'Department': department, 
            'Type_of_Hazard': hazard, 
            'Description': description, 
            'Danger_Level': dangerLevel, 
            'Injury_Count': parseInt(injuryCount), 
            'Death_Count': parseInt(fatalityCount), 
            'NearMiss': nearMiss
        }
        console.log(stateValues);
        const payload = JSON.stringify(stateValues);
        console.log(payload);
        fetch(incidentReportsEndpoint, {
            method: 'POST',
            body: payload,
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            }
        })
        .then(res => res.json())
        .then(body => console.log(body))
        .catch(err => console.err(err));
        pageHistory.push('/');
    }


    return(
        <div className='center full-width'>
            <div className='form-container' style={{width: '62.5%'}}>
                <Formik
                enableReinitialize
                initialValues={initialValues}
                validateOnChange={false} validateOnBlur={false}
                validate={ValidateHandler} onSubmit={handleSubmission}
                >
                {(props) => (
                    <Form className='form full-width'>
                        <div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker id='time' clearable label={'Time: '} value={selectedDate} 
                                onChange={(option) => setSelectedDate(parseDate(option))} format='MM/dd/yyyy' inputVariant='standard'  style={{margin: '15px'}}></KeyboardDatePicker>
                            </MuiPickersUtilsProvider>
                            {props.errors.time ? <div className='error-text'>{props.errors.time}</div> : null}
                        </div>
                        <div>
                            <FormControl variant='outlined'>
                                <InputLabel labelId='geolocation'>Geolocation:</InputLabel>
                                <Select id='geolocation' onChange={(option) => setGeolocation(option.target.value)}>
                                    <MenuItem value={'Houston'}>Houston</MenuItem>
                                    <MenuItem value={'Dallas'}>Dallas</MenuItem>
                                    <MenuItem value={'Austin'}>Austin</MenuItem>
                                    <MenuItem value={'Fort Worth'}>Fort Worth</MenuItem>
                                    <MenuItem value={'Waco'}>Waco</MenuItem>
                                    <MenuItem value={'Katy'}>Katy</MenuItem>
                                    <MenuItem value={'Sugarland'}>Sugarland</MenuItem>
                                    <MenuItem value={'Cypress'}>Cypress</MenuItem>
                                </Select>
                            </FormControl>
                            {props.errors.geolocation ? <div className='error-text'>{props.errors.geolocation}</div> : null}
                        </div>
                        <div>
                            <TextField id='employees' label={'Employee Names: '} variant='filled' value={employeeName} onChange={val => setEmployeeName(val.target.value)}></TextField>
                            {props.errors.employees ? <div className='error-text'>{props.errors.employees}</div> : null}
                        </div>
                        <div>
                            <TextField id='manager' label={'Manager Name: '} variant='filled' value={managerName} onChange={val => setManagerName(val.target.value)}></TextField>
                            {props.errors.manager ? <div className='error-text'>{props.errors.manager}</div> : null}
                        </div>
                        <div>
                            <FormControl variant='outlined'>
                                <InputLabel labelId='department'>Department:</InputLabel>
                                <Select id='department' onChange={(option) => setDepartment(option.target.value)}>
                                    <MenuItem value={'Exploration'}>Exploration</MenuItem>
                                    <MenuItem value={'Drilling'}>Drilling</MenuItem>
                                    <MenuItem value={'Upstream'}>Upstream</MenuItem>
                                    <MenuItem value={'Downstream'}>Downstream</MenuItem>
                                    <MenuItem value={'Shipping'}>Shipping</MenuItem>
                                    <MenuItem value={'Trading'}>Trading</MenuItem>
                                    <MenuItem value={'Refinement'}>Refinement</MenuItem>
                                    <MenuItem value={'Crude'}>Crude</MenuItem>
                                    <MenuItem value={'Production'}>Production</MenuItem>
                                </Select>
                            </FormControl>
                            {props.errors.department ? <div className='error-text'>{props.errors.department}</div> : null}
                        </div>
                        <div>
                            <FormControl variant='outlined'>
                                <InputLabel>Type of Hazard:</InputLabel>
                                <Select id='typeOfHazard' onChange={(option) => setHazard(option.target.value)}>
                                    <MenuItem value={'Oil Spill'}>Oil Spill</MenuItem>
                                    <MenuItem value={'Power Outage'}>Power Outage</MenuItem>
                                    <MenuItem value={'Drilling Issue'}>Drilling Issue</MenuItem>
                                    <MenuItem value={'Broken Pipe'}>Broken Pipe</MenuItem>
                                    <MenuItem value={'Falling from Elevated Area'}>Falling from Elevated Area</MenuItem>
                                    <MenuItem value={'Electrical Fire'}>Electrical Fire</MenuItem>
                                    <MenuItem value={'Trip'}>Trip</MenuItem>
                                </Select>
                            </FormControl>
                            {props.errors.typeOfHazard ? <div className='error-text'>{props.errors.typeOfHazard}</div> : null}
                        </div>
                        <div>
                            <TextField id='description' label={'Description: '} variant='filled' value={description} onChange={val => setDescription(val.target.value)}></TextField>
                            {props.errors.description ? <div className='error-text'>{props.errors.description}</div> : null}
                        </div>
                        <div>
                            <div>Hazard Level:</div>
                            <Slider id='dangerLevel' label={'Danger Level: '} min={0} max={10} step={1} valueLabelDisplay='auto' defaultValue={0} onChange={sliderChangeHandler}></Slider>
                        </div>
                        <div>
                            <TextField id='injuryCount' label={'Injury Count: '} variant='filled' value={injuryCount} onChange={val => setInjuryCount(val.target.value)}></TextField>
                            {props.errors.injuryCount ? <div className='error-text'>{props.errors.injuryCount}</div> : null}
                        </div>
                        <div>
                            <TextField id='fatalityCount' label={'Fatality Count: '} variant='filled' value={fatalityCount} onChange={val => setFatalityCount(val.target.value)}></TextField>
                            {props.errors.fatalityCount ? <div className='error-text'>{props.errors.fatalityCount}</div> : null}
                        </div>
                        <div>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label={'Near Miss:'} onChange={val => setNearMiss(val.target.checked)} />
                            </FormGroup>
                        </div>
                        <div className='full-width button-container'>
                            <div style={{marginRight: '15px', width: 'auto'}}><Link to={'/'}><Button className='btn btn-secondary'>Cancel</Button></Link></div>
                            <div style={{width: 'auto'}}><Button type='submit' className='btn btn-primary'>Submit</Button ></div>
                        </div>
                    </Form>
                )}
                </Formik>
            </div>
        </div>
    );
}
