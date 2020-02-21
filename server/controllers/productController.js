
module.exports = {
    getCart: (req,res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.cart.get_cart(id).then(cart => res.status(200).send(cart))
        .catch(err => res.status(500).send(err))
    },
    addToCart: (req,res) => {
        const {customer_order_id, product_id, price} = req.body
        const db = req.app.get('db')
        db.cart.add_to_cart({customer_order_id, product_id, price})
        .then(data => {
            res.sendStatus(200)})
        .catch(err => res.status(500).send(err))
    },
    getProducts: (req,res) => {
        const db = req.app.get('db')
        db.products.get_products()
        .then(products => {
            res.status(200).send(products)})
        .catch(err => res.status(500).send(err))
    },
    removeItem: (req,res) => {
        const {id} = req.params
        const db = req.app.get('db')
        db.cart.remove_item(id).then(products => {
            res.status(200).send(products)
        }).catch(err => res.status(500).send(err))

    },
    getProduct: (req,res) => {
        console.log(req.params)
        const {id} = req.params
        const db = req.app.get('db')
        db.products.get_item(id).then(item => {
            res.status(200).send(item)
        }).catch(err => res.status(500).send(err))
    },
    soldItem: (req,res) => {
        console.log(req.params)
        const {id} = req.params
        const db = req.app.get('db')

        db.products.delete_item(id).then(data => res.status(200).send(data))
    },
    addProperty: (req,res) => {
        const {image, name, description, price} = req.body
        const db = req.app.get('db')

        db.products.add_property(name, image, description, price).then(data => {
            res.status(200).send(data)
        }).catch(err => res.status(500).send(err))
    }
} 