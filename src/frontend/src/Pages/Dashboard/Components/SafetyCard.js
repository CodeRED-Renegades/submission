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
            <div style={{display: isExpanded ? 'flex' : 'none'}} className='content'>
                <div><img src={props.image} alt={props.title} /></div>
                <div>{props.content}</div>
            </div>
        </div>
    );
}