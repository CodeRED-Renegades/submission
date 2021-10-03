import React, { useState } from 'react';
import '../Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

export const SafetyCard = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return(
        <div className='safety-card'>
            <div onClick={() => setIsExpanded(prev => !prev)} className='title'>
                <FontAwesomeIcon icon={isExpanded ? faMinus : faPlus} />
                <div className='center full-width'>
                    <div><b>{props.title}</b></div>
                </div>
            </div>
            <div style={{display: isExpanded ? 'flex' : 'none'}}>
                <div className='content-image center'><img style={{width: '100%', height: 'auto'}}src={props.src} alt={props.title}></img></div>
                <div className='content-description'>
                    <div style={{marginTop: '15px', marginBottom: '15px'}}><b>Description: </b>{props.content}</div>
                    <div><b>Prevention: </b>{props.prevention}</div>
                </div>
            </div>
        </div>
    );
}