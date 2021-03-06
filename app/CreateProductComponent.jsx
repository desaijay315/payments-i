import React from 'react';
import {render} from 'react-dom';

export default class CreateProductComponent extends React.Component{

					constructor(props){
									super(props);

									this.state = {
											categories:[],
											selectedCategoryId: -1,
											name : '',
											description : '',
											price : '',
											successCreation: null
									}
							}

       //component mount and render the category
							componentDidMount () {
													this.serverRequest = jQuery.get("http://localhost/payments-jd/read.php", function(categories){
    					        this.setState({
    					            categories: categories.records
    					        });
					        }.bind(this));
					 
					    jQuery('.page-header h1').text('Create product');
							}

       // abort after component unmount
       componentWillUnmount () {
          this.serverRequest.abort();
       }
        //on cateogry change
       onCategoryChange (e) {
         this.setState({selectedCategoryId: e.target.value});
       }

       //on name changes
       onNameChange (e) {
        this.setState({name: e.target.value});
       }

       // description changes
       onDescriptionChange (e) {
         this.setState({description : e.target.value});
       }

       //on price changes
       onPriceChange (e) {
        this.setState({price : e.target.value});
       }


       //handling save change

       onSave (e) {
         var form_data = {
            name: this.state.name,
            description : this.state.description,
            price: this.state.price,
            category_id: this.state.selectedCategoryId
         };
         jQuery.ajax({
          url : "http://localhost/payments-jd/create_product.php",
          data : JSON.stringify(form_data),
          type : "POST",
          contentType : 'application/json',
          success : function(response) {
            this.setState({successCreation: response['message']});

            //empty form fields
            this.setState({name :""});
            this.setState({description :""});
            this.setState({price :""});
            this.setState({selectedCategoryId :-1});

            this.props.changeAppMode('read');
          }.bind(this),
          error: function(xhr, status, text){
           // show error to console
            console.log(xhr, status, text);
          }
         });

           e.preventDefault();
       }

       render () {
            // make categories as option for the select tag.

            var categoriesOptions = this.state.categories.map(function(category){
                return(
                    <option key= {category.id} value = {category.id}>{category.name}</option>
                 );
            });

             /*
        - tell the user if a product was created
        - tell the user if unable to create product
        - button to go back to products list
        - form to create a product
        */
         
         return(
            <div>
            {
               this.state.successCreation == "Product was created." ?
                <div className='alert alert-success'>
                    Product was saved.
                </div>: null
              //  this.props.changeAppMode('read');
            }

           {

              this.state.successCreation == "Unable to create product." ? <div className='alert alert-danger'>Unable to save product. Please try again.</div>: null
           }

            <a href='#'
            onClick={() => this.props.changeAppMode('read')}
            className='btn btn-primary margin-bottom-1em'> Read Products
        </a>

         <form onSubmit={this.onSave.bind(this)}>
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
                        onChange={this.onNameChange.bind(this)} />
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
                        onChange={this.onDescriptionChange.bind(this)}>
                        </textarea>
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
                        onChange={this.onPriceChange.bind(this)}/>
                    </td>
                </tr>
                <tr>
                    <td>Category</td>
                    <td>
                        <select onChange={this.onCategoryChange.bind(this)} className='form-control'
                        value={this.state.selectedCategoryId}>
                        <option value="-1">Select category...</option>
                        {categoriesOptions}
                        </select>
                    </td>
                </tr>
 
                <tr>
                    <td></td>
                    <td>
                        <button className='btn btn-primary' onClick={this.onSave.bind(this)}>Save</button>
                    </td>
                </tr>
              </tbody>
              </table>
          </form>
          </div>

          );

       }
}