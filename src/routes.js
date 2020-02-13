import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './Components/Landing'
import Products from './Components/Products'
import Auth from './Components/Auth'
import Cart from './Components/Cart'
import Form from './Components/Form'
import MapView from './Components/MapView'
import Admin from './Components/Admin'
import AdminLogin from './Components/AdminLogin'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/products' component={Products}/>
        <Route path='/auth' component={Auth}/>
        <Route path='cart' component={Cart}/>
        <Route path='/form/:id' component={Form}/>
        <Route path='/mapview' component={MapView}/>
        <Route exact path='/admin' component={Admin}/>
        <Route path='/admin/login' component={AdminLogin}/>
    </Switch>
)