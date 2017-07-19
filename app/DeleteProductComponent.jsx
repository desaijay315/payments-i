import React from 'react';
import {render} from 'react-dom';


export default class DeleteProductComponent extends React.Component {

       constructor(props){
       		super(props);
         this.onDelete = this.onDelete.bind(this);
       }
      
       componentDidMount () {
       	 jQuery('.page-header h1').text('Delete Product');
       }

      onDelete () {
       // product to delete
       var productId = this.props.productId;
      // console.log(productId);return false;

       $.ajax({
          url: "http://localhost/payments-jd/delete_product.php",
          type : "POST",
          contentType : 'application/json',
          data : JSON.stringify({'id':productId}),
          success : function(response) {
           // console.log(this.props);return false;
             this.props.changeAppMode('read');
        }.bind(this),
        error: function(xhr, resp, text){
         console.log(resp);
        }
       });
      }


   render (){
 
    return (
        <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6'>
                <div className='panel panel-default'>
                    <div className='panel-body text-align-center'>Are you sure?</div>
                    <div className='panel-footer clearfix'>
                        <div className='text-align-center'>
                            <button onClick={this.onDelete}
                                className='btn btn-danger m-r-1em'>Yes</button>
                            <button onClick={() => this.props.changeAppMode('read')}
                                className='btn btn-primary'>No</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-3'></div>
        </div>
    );
  }
} 