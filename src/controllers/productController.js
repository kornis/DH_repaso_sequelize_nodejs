const db = require('../db/models');

module.exports = {
    index: (req, res) => {
        db.products.findAll({
            include: [db.images]
        }).then(productos => {
            return res.render('products', {productos})
        })

    },

    createForm: (req, res) => {
    
        return res.render('createProduct');
    },

    create: (req, res) => {
        
    db.products.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    }).then(function(product) {
    let arrayImages = [];
      for(let i = 0; i < req.files.length ; i++){
          let promesa = db.images.create({
              path: req.files[i].filename,
              id_product: product.id
          })
         arrayImages.push(promesa);
      }
      Promise.all(arrayImages).then(response => res.redirect('/products'))
        //return res.json(product);
    })
},

editForm: (req, res) => {
    const id = req.params.id;
    db.products.findByPk(id,{
        include: [db.images]
    }).then(producto => {
        return res.render('editProduct', {producto})
    })
},

edit: (req, res) => {
    db.products.update({
        ...req.body
    },
    {
        where: {
            id: req.params.id
        }
    }).then(producto => {
        let arrayImages = [];
        for (let i = 0; i < req.files.length; i++) {
            let promesa = db.images.create({
                path: req.files[i].filename,
                id_product: req.params.id
            })
            arrayImages.push(promesa);
        }
        Promise.all(arrayImages).then(() => res.redirect('/products'))
    })
},

deleteImage: (req, res) => {
    const id = req.params.id;
    db.images.destroy({ where: { id: id }})
    .then(() => res.redirect('/products/'+ req.query.product))
},

    addToCart: (req, res) => {
        const product_id = req.params.id;
        db.cart.findByPk(req.session.user.id_cart, {include: db.products})
        .then(cart => {
            let prod = cart.products.find(p => p.id == product_id)
            if(prod){
                db.cartProduct.findOne({where:{id_product: product_id, id_cart: req.session.user.id_cart}})
                .then(product => {
                    db.cartProduct.update({
                        cant: product.cant + 2
                    },
                    {
                        where:{
                            id_cart: req.session.user.id_cart,
                            id_product: product_id
                        }
                    }).then(() =>{
                        return res.redirect('/products')
                    })

                })
            }else{
                cart.addProduct(product_id, { through: {cant: 1}})
                .then(() =>{
                    return res.redirect('/products')
                })
            }
        })
    },

    cart: (req, res) => {
        db.cart.findOne({where:
        {
            id: req.session.user.id_cart
        },
        include: db.products
    }).then(cart => res.render('cart',{cart}))

    }
}