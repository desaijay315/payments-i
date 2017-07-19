import React from 'react';
import {render} from 'react-dom';


export default class ReadOneProductComponent extends React.Component{

    constructor (props){
    				super(props);
    				this.state = {
    					id : 0,
    					name : '',
    					description : '',
    					price : 0
    				}
    }

    
    componentDidMount () {
    	  let productId = this.props.productId;
    	   this.serverRequestProd = $.get("http://localhost/payments-jd/read_one.php?id=" + productId,
        function (result) {
        	 let product = result[0];
            this.setState({id: product.id});
            this.setState({name: product.name});
            this.setState({description: product.description});
            this.setState({price: product.price});
        }.bind(this));
 
      jQuery('.page-header h1').text('Read Product');
    }


				    // on unmount, kill categories fetching in case the request is still pending
				componentWillUnmount () {
				    this.serverRequestProd.abort();
				}


				render () {
					return (
        <div>
            <a href='#'
                onClick={() => this.props.changeAppMode('read')}
                className='btn btn-primary margin-bottom-1em'>
                Read Products
            </a>
         <form onSubmit={this.onSave}>
                <table className='table table-bordered table-hover'>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{this.state.name}</td>
                    </tr>
 
                    <tr>
                        <td>Description</td>
                        <td>{this.state.description}</td>
                    </tr>
 
                    <tr>
                        <td>Price ($)</td>
                        <td>${parseFloat(this.state.price).toFixed(2)}</td>
                    </tr>
 
                    <tr>
                        <td>Category</td>
                        <td>{this.state.category_name}</td>
                    </tr>
 
                    </tbody>
                </table>
            </form>
        </div>
						);
				}


}