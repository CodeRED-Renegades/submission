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
                    <div>{props.title}</div>
                </div>
            </div>
            <div style={{display: isExpanded ? 'flex' : 'none'}} className='content'>
                <div>{props.image}</div>
                <div>{props.content}</div>
            </div>
        </div>
    );
}