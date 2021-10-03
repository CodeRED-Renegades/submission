import React, { useState } from 'react';
import './Form.css'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { Select, Checkbox, TextField, Slider, FormControl, MenuItem, InputLabel, FormGroup, FormControlLabel } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Button } from 'react-bootstrap';
import DateFnsUtils from '@date-io/date-fns';

import { PostIncident } from '../../API/PostInformation';

export const ReportForm = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [geolocation, setGeolocation] = useState(null);
    const [department, setDepartment] = useState(null);
    const [hazard, setHazard] = useState(null);
    console.log(selectedDate, geolocation, department, hazard)

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
    const SubmitHanlder = (values) => {
        console.log('Submit: ', values);
    }
    const initialValues = {
        time: null,
        geolocation: null,
        employees: null,
        manager: null,
        department: null,
        typeOfHazard: null,
        description: null,
        dangerLevel: 0,
        injuryCount: null,
        fatalityCount: null,
        nearMiss: null
    }
    return(
        <div className='center full-width'>
            <div className='form-container' style={{width: '62.5%'}}>
                <Formik
                enableReinitialize
                initialValues={initialValues}
                validateOnChange={false} validateOnBlur={false}
                validate={ValidateHandler} onSubmit={SubmitHanlder}
                >
                {(props) => (
                    <Form className='form full-width'>
                        <div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker id='time' clearable label={'Time: '} value={selectedDate} 
                                onChange={(option) => setSelectedDate(option)} format='MM/dd/yyyy' inputVariant='standard'  style={{margin: '15px'}}></KeyboardDatePicker>
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
                            <TextField id='employees' label={'Employee Names: '} variant='filled'></TextField>
                            {props.errors.employees ? <div className='error-text'>{props.errors.employees}</div> : null}
                        </div>
                        <div>
                            <TextField id='manager' label={'Manager Name: '} variant='filled'></TextField>
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
                            <TextField id='description' label={'Description: '} variant='filled'></TextField>
                            {props.errors.description ? <div className='error-text'>{props.errors.description}</div> : null}
                        </div>
                        <div>
                            <div>Hazard Level:</div>
                            <Slider id='dangerLevel' label={'Danger Level: '} min={0} max={10} step={1} valueLabelDisplay='auto' defaultValue={0}></Slider>
                        </div>
                        <div>
                            <TextField id='injuryCount' label={'Injury Count: '} variant='filled'></TextField>
                            {props.errors.injuryCount ? <div className='error-text'>{props.errors.injuryCount}</div> : null}
                        </div>
                        <div>
                            <TextField id='fatalityCount' label={'Fatality Count: '} variant='filled'></TextField>
                            {props.errors.fatalityCount ? <div className='error-text'>{props.errors.fatalityCount}</div> : null}
                        </div>
                        <div>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label={'Near Miss:'}/>
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