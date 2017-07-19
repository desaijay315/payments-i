import React from 'react';
import {render} from 'react-dom';

export default class ProductRow extends React.Component{

        constructor(props) {
             super(props);
        }

    render() {
    return (
        <tr>
            <td>{this.props.product.name}</td>
            <td>{this.props.product.description}</td>
            <td>${parseFloat(this.props.product.price).toFixed(2)}</td>
            <td>
                <a href={'#readOne?id='+this.props.product.id} onClick={() => this.props.changeAppMode('readOne', this.props.product.id)}
                    className='btn btn-info m-r-1em'> Read One</a>
                <a href={'#update?id='+this.props.product.id} onClick={() => this.props.changeAppMode('update', this.props.product.id)}
                    className='btn btn-primary m-r-1em'> Edit</a>
                <a  href={'#delete?id='+this.props.product.id} onClick={() => this.props.changeAppMode('delete', this.props.product.id)}
                    className='btn btn-danger'> Delete
                </a>
            </td>
        </tr>
        );
    }

}
