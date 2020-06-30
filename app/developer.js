import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import * as RouteConfig from '../app/config/routeConfig';
import store from './store/store'
import {Provider} from 'react-redux';
import LeftColumn from "../app/common/leftColumn"

require('../style/component/Home.css');


class StoreRoot extends React.Component{

    render(){
        return(
            <Router>
                 <Route path="/" component={LeftColumn}/>
                {/* <Switch> */}
                   
                    {RouteConfig.Routes.map((item,index) => <Route exact key ={index}{...item} />)}
                {/* </Switch> */}
            </Router>
        )
    }
    
}


render( <Provider store ={store}> <StoreRoot/>   </Provider> , document.getElementById('app'));