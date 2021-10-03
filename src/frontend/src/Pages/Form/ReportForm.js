import React, { useState } from 'react';
import './Form.css'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { Select, Checkbox, TextField, Slider, FormControl } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Button } from 'react-bootstrap';
import DateFnsUtils from '@date-io/date-fns';

export const ReportForm = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [dangerLevel, setDangerLevel] = useState(0);

    const ValidateHandler = (values) => {
        const errors = {};
        if(!values.time) {
            errors.time = 'Must select a time.';
        }
        if(!values.geolocation) {
            errors.geolocation = 'Must select a geolocation.';
        }
        if(!values.employees){
            errors.employees = 'Must specify the employees affected.';
        }   
        if(!values.manager){
            errors.manager = 'Must specify the manager.';
        }
        if(!values.department){
            errors.department = 'Must specify the department.';
        }
        if(!values.typeOfHazard){
            errors.typeOfHazard = 'Must specify the type of hazard.';
        }
        if(!values.description){
            errors.description = 'Must input a description.';
        }
        if(!values.injuryCount){
            errors.injuryCount = 'Must specify the injury count.';
        }
        if(!values.fatalityCount){
            errors.fatalityCount = 'Must specify the fatality count.';
        }
        if(!values.nearMiss){
            errors.nearMiss = 'Must specify if a near miss.';
        }
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
                                onChange={(date) => setSelectedDate(date)} format='MM/dd/yyyy' inputVariant='standard'  style={{margin: '15px'}}></KeyboardDatePicker>
                            </MuiPickersUtilsProvider>
                            {props.errors.time ? <div className='error-text'>{props.errors.time}</div> : null}
                        </div>
                        <div>
                            <FormControl variant='outlined'><Select id='geolocation'></Select></FormControl>
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
                            <FormControl variant='outlined'><Select id='department' ></Select></FormControl>
                            {props.errors.department ? <div className='error-text'>{props.errors.department}</div> : null}
                        </div>
                        <div>
                            <FormControl variant='outlined'><Select id='typeOfHazard' ></Select></FormControl>
                            {props.errors.typeOfHazard ? <div className='error-text'>{props.errors.typeOfHazard}</div> : null}
                        </div>
                        <div>
                            <TextField id='description' label={'Description: '} variant='filled'></TextField>
                            {props.errors.description ? <div className='error-text'>{props.errors.description}</div> : null}
                        </div>
                        <div>
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
                            <Checkbox id='nearMiss'></Checkbox>
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