import React from 'react';
import {render} from 'react-dom';
import ProductsTable from './ProductsTable.jsx';
import TopActionsComponent from './TopActionsComponent.jsx';

export default class ReadProductsComponent extends React.Component{

    constructor(props) {
    super(props);
    this.state ={
          products: []
     };
  }


  componentDidMount () {
    this.serverRequest = jQuery.get("http://localhost/payments-jd/read_products.php", function (products) {
            this.setState({
                products: products.records

            });
        }.bind(this));



  }

  componentWillUnmount () {
    this.serverRequest.abort();
  }

  render () {
     
      var filteredProducts = this.state.products;
      
      jQuery('.page-header h1').text('Read Products');
       return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />
                <ProductsTable
                    products={filteredProducts}
                    changeAppMode={this.props.changeAppMode.bind(this)} />
            </div>
        );
  }

}