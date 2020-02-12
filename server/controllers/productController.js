
module.exports = {
    getCart: (req,res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.cart.get_cart(id).then(cart => res.status(200).send(cart))
        .catch(err => res.status(500).send(err))
    }
} 