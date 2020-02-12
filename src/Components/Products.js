import React, {Component} from 'react'
import axios from 'axios'

class Products extends Component {
    constructor(props){

        super(props)
        this.state = {
            products: [],
            showAuth: false
        }
    }

    componentDidMount(){
        axios.get('/api/products').then(res => {
            this.setState({products: res.data})
        }).catch(err => console.log(err))
    }

    addToCart = (id, price) => {
        if(this.props.user.email){
            axios.post('/api/cart', {
                customer_order_id: this.props.user.customer_order_id,
                product_id: id,
                price
            }).then(res => {
                window.alert('Item added to cart')
            }).catch(err => console.log(err))
        } else {
            this.handleToggle()
        }
    }

    handleToggle = () => {
        this.setState({showAuth: !this.state.showAuth})
    }
    render(){
        const mappedProducts = this.state.products.map((e,i) => {
            return (
                <div key={i} className='product_container' >
                    <img src={e.product_image} alt={e.product_name}/>
            <p>{e.product_name}</p>
            <p>{e.product_description}</p>
            <p>{e.product.price}</p>
            <button onClick={()=> this.addToCart(e.product_id, e.price)}>Add to cart</button>
                </div>
            )
        })
        return(
            <div>
                {mappedProducts}
                {this.state.showAuth
                ? (<Auth toggleFn={this.handleToggle}/>)
            : null}
            </div>
            )
        }
}

export default Products