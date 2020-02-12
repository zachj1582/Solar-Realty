import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './Components/Landing'
import Products from './Components/Products'
import Auth from './Components/Auth'
import Cart from './Components/Cart'
import Form from './Components/Form'
import MapView from './Components/MapView'
import Footer from './Components/Footer'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/' component={Footer}/>
        <Route path='/products' component={Products}/>
        <Route path='/auth' component={Auth}/>
        <Route path='cart' component={Cart}/>
        <Route path='/form/:id' component={Form}/>
        <Route path='/mapview' component={MapView}/>
    </Switch>
)