import React, {Component} from 'react'
import axios from 'axios'
import './Item.css'
import Auth from './Auth'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getUser} from '../redux/UserReducer'

class Item extends Component {
    constructor(props){
        super(props)
        this.state = {
            product: [],
            showAuth: false
        }
    }

    componentDidMount(){
        axios.get(`/api/product/${this.props.match.params.id}`).then(res => {
            this.setState({product: res.data})
        }).catch(err => console.log(err))
    }

    addToCart = (id, price) => {
        if (this.props.user.email) {
          axios
            .post("/api/cart", {
              customer_order_id: this.props.user.customer_order_id,
              product_id: id,
              price
            })
            .then(res => {
              window.alert("Item added to cart");
            })
            .catch(err => console.log(err));
        } else {
          this.handleToggle();
        }
      };

      handleToggle = () => {
        this.setState({ showAuth: !this.state.showAuth });
      };

    render(){
        const mappedProduct = this.state.product.map((e, i) => {
            return (
              <div key={i} className="product_container_item">
                <div className="img_container_item">
                  <div
                    style={{ backgroundImage: `url(${e.product_image})` }}
                    className="p_img_item"
                  >
                    {" "}
                  </div>
                </div>
                <div className="info_container_item">
                    <p className="p_name_item">{e.product_name}</p>
                    <p className="p_desc_item">{e.product_description}</p>
                    <p className="p_price_item">${e.price}</p>
                  </div>
                  <button
                    className="add_button_item"
                    onClick={() => this.addToCart(e.product_id, e.price)}
                  >
                    Add to cart
                  </button>
                </div>
            );
          });
        return(
        <div>{mappedProduct}
        {this.state.showAuth ? <Auth toggleFn={this.handleToggle} /> : null}
        </div>
        )
    }
}

function mapStateToProps(state) {
    return { user: state.user };
  }
  
  export default connect(mapStateToProps, { getUser })(withRouter(Item));