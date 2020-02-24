import React from 'react'
import {withRouter} from 'react-router-dom'
import {Carousel} from 'react-responsive-carousel'
import Footer from './Footer'
import './Landing.css'

const Landing = props => {
    return(
        <div className='landing'>
            <Carousel>
			<div>
				<img src="https://qph.fs.quoracdn.net/main-qimg-b567ca36439fc5ae86f4eb072f4bcd9a" alt="Mercury" />
				<p className="legend">Mercury</p>
			</div>
			<div>
				<img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Jupiter_family.jpg" alt="Moons of Jupiter"/>
				<p className="legend">Moons of Jupiter</p>
			</div>
			<div>
				<img src="https://images.fineartamerica.com/images-medium-large-5/voyager-2-composite-of-saturn--6-of-its-moons-nasascience-photo-library.jpg" alt="Moons of Saturn"/>
				<p className="legend">Moons of Saturn</p>
			</div>
			<div>
				<img src="https://www.spaceanswers.com/wp-content/uploads/2015/02/Screen-Shot-2015-02-19-at-17.36.58.png" alt="Venus"/>
				<p className="legend">Venus</p>
			</div>
		</Carousel>
            <h2>You're a star, your home should be too!</h2>
            <div className='browse' onClick={()=> props.history.push('/products')}>Browse listings</div>
            <Footer/>
        </div>
    )
}

export default withRouter(Landing)