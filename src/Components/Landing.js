import React from 'react'

const Landing = props => {
    return(
        <div>
            Background image carousel, pics rotating every 3 secs
            <h2>You're a star, your home should be too!</h2>
            <div onClick={()=> this.props.history.push('/products')}>Browse listings</div>
        </div>
    )
}

export default Landing 