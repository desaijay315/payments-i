import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router-dom';

export default class TopActionsComponent extends React.Component{
        
        constructor(props){
            super(props);
        }  

        render () {
        	return (
        		<div>
        		<a href ="#" onClick={() => this.props.changeAppMode('create') } 
                className='btn btn-primary margin-bottom-1em'> Create product </a>
                </div>
        	);
        }
}