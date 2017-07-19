import React from 'react';
import {render} from 'react-dom';
import ReadProductsComponent from './ReadProductsComponent.jsx';
import CreateProductComponent from './CreateProductComponent.jsx';
import DeleteProductComponent from './DeleteProductComponent.jsx';
import ReadOneProductComponent from './ReadOneProductComponent.jsx';
import UpdateProductComponent from './UpdateProductComponent.jsx';
//var UpdateProductComponent = require('./UpdateProductComponent.jsx');
var ReactRouter = require('react-router-dom');
var Router          =  ReactRouter.BrowserRouter;
var Route           = ReactRouter.Route;
//var Nav              = require('./Nav.jsx');

class App extends React.Component {

  constructor(props) {
    
    super(props);
    
    this.state = {
 	 	   currentMode: 'read',
       productId: null
 	 };
  }

  changeAppMode (newMode,productId){
  		if(newMode){
  	this.setState({currentMode: newMode});
    }
		 if(productId !== undefined){
		  this.setState({productId: productId});
		 }		  
  }

  render () {
     let modeComponent =<ReadProductsComponent changeAppMode={this.changeAppMode.bind(this)} />;
        switch(this.state.currentMode){
            case 'read':
                break;
            case 'readOne':
                modeComponent = <ReadOneProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode.bind(this)}/>;
                break;
            case 'create':
                modeComponent = <CreateProductComponent changeAppMode={this.changeAppMode.bind(this)}/>;
                break;
            case 'update':
                modeComponent = <UpdateProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode.bind(this)}/>;
                break;
            case 'delete':
                modeComponent = <DeleteProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode.bind(this)}/>;
                break;
            default:
                break;
        }
 
        return modeComponent;
  }
}

render(<App/>, document.getElementById('app'));
