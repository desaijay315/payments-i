import React from 'react';
import {render} from 'react-dom';


export default class UpdateProductComponent extends React.Component{
	     
	     constructor(props){
	     	super(props);
		this.state ={
			categories: [],
			selectedCategoryId: 0,
			id: 0,
			name: '',
			description: '',
			price: 0,
			successUpdate: null
		}

		this.onSave = this.onSave.bind(this);
		this.onCategoryChange = this.onCategoryChange.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onPriceChange = this.onPriceChange.bind(this);
	     }

	     componentDidMount () {

		// read categories
		this.serverRequestCat = $.get("http://localhost/payments-jd/read.php",
		function (categories) {
			this.setState({
			categories: categories.records
		});
		}.bind(this));

		let productId = this.props.productId;
		this.serverRequestProd = $.get("http://localhost/payments-jd/read_one.php?id=" + productId,
		function (result) {
		            let product = result[0];
			this.setState({id: product.id});
			this.setState({name: product.name});
			this.setState({description: product.description});
			this.setState({price: product.price});
		}.bind(this));
		jQuery('.page-header h1').text('Update Product');
	     }

	     componentWillUnmount () {
	     	this.serverRequestCat.abort();
	     	this.serverRequestProd.abort();
	     }

	     onSave(e){
	     	var form_data  = {
                                id:this.state.id,
                                name:this.state.name,
                                description:this.state.description,
                                category_id: this.state.selectedCategoryId,
                                price: this.state.price
	     	}
	     	$.ajax({
	                  url : "http://localhost/payments-jd/update_product.php",
	                  data:JSON.stringify(form_data),
	                  type: "POST",
	                 contentType : 'application/json',
		    success : function(response) {
		            this.setState({successUpdate: response['message']});
		            this.props.changeAppMode('read');
		}.bind(this),
		error: function(xhr, resp, text){
		// show error to console
		console.log(xhr, resp, text);
		}
	     });

 	e.preventDefault();
	}

	// handle category change
	onCategoryChange(e){
	    this.setState({selectedCategoryId: e.target.value});
	}
	 
	// handle name change
	onNameChange(e){
	    this.setState({name: e.target.value});
	}
	 
	// handle description change
	onDescriptionChange(e){
	    this.setState({description: e.target.value});
	}
	 
	// handle price change
	onPriceChange(e){
	    this.setState({price: e.target.value});
	}

	render () {
	    var categoriesOptions = this.state.categories.map(function(category){
	        return (
	            <option key={category.id} value={category.id}>{category.name}</option>
	        );
	    });
	 
	    return (
	        <div>
	            {
	                this.state.successUpdate == "Product was updated" ? <div className='alert alert-success'>
	                        Product was updated.
	                    </div>
	                : null
	            }
	 
	            {
	                this.state.successUpdate == "Product was not" ?
	                    <div className='alert alert-danger'>
	                        Unable to update product. Please try again.
	                    </div>
	                : null
	            }
	 
	            <a href='/payments-jd/'
	                onClick={() => this.props.changeAppMode('read')}
	                className='btn btn-primary margin-bottom-1em'>
	                Read Products
	            </a>
	 
	            <form onSubmit={this.onSave}>
	                <table className='table table-bordered table-hover'>
	                    <tbody>
	                    <tr>
	                        <td>Name</td>
	                        <td>
	                            <input
	                                type='text'
	                                className='form-control'
	                                value={this.state.name}
	                                required
	                                onChange={this.onNameChange} />
	                        </td>
	                    </tr>
	 
	                    <tr>
	                        <td>Description</td>
	                        <td>
	                            <textarea
	                                type='text'
	                                className='form-control'
	                                required
	                                value={this.state.description}
	                                onChange={this.onDescriptionChange}></textarea>
	                        </td>
	                    </tr>
	 
	                    <tr>
	                        <td>Price ($)</td>
	                        <td>
	                            <input
	                                type='number'
	                                step="0.01"
	                                className='form-control'
	                                value={this.state.price}
	                                required
	                                onChange={this.onPriceChange}/>
	                        </td>
	                    </tr>
	 
	                    <tr>
	                        <td>Category</td>
	                        <td>
	                            <select
	                                onChange={this.onCategoryChange}
	                                className='form-control'
	                                value={this.state.selectedCategoryId}>
	                                <option value="-1">Select category...</option>
	                                {categoriesOptions}
	                                </select>
	                        </td>
	                    </tr>
	 
	                    <tr>
	                        <td></td>
	                        <td>
	                            <button
	                                className='btn btn-primary'
	                                onClick={this.onSave}>Save Changes</button>
	                        </td>
	                    </tr>
	 
	                    </tbody>
	                </table>
	            </form>
	        </div>
	    );
	}
}
