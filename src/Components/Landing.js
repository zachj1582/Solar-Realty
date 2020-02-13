import React from 'react'
import {withRouter} from 'react-router-dom'
import Footer from './Footer'

const Landing = props => {
    return(
        <div>
            Background image carousel, pics rotating every 3 secs
            <h2>You're a star, your home should be too!</h2>
            <div onClick={()=> props.history.push('/products')}>Browse listings</div>
            <Footer/>
        </div>
    )
}

export default withRouter(Landing)