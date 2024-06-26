const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //const product = new Product(null,title, imageUrl, description, price);
 //create build a js object and immediately saves it.
  req.user
  .createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    // userId:req.user.id - Instead of this 
  })
    .then(result => {
      // console.log(result); 
      console.log('Created Product');
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log(err);
    });
};


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; 
  if(!editMode){
    return res.redirect('/')
  }
  const prodId =req.params.productId;

  req.user
  .getProducts({where: {id:prodId}})//we are getting multiple products
  // Product.findByPk(prodId)
  .then(products => {
    const product =products[0];
    if(product){
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
   editing:editMode,
   product:product
  });
}
})
.catch(err => console.log(err))
};

exports.postEditProduct = (req,res,next) => {
  
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatePrice = req.body.price;
  const updateImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  // const updatedProduct = new Product(prodId,updatedTitle,updateImageUrl,updatedDesc,updatePrice);
  // updatedProduct.save();
  Product.findByPk(prodId)
  .then(product => {

    product.title=updatedTitle;
    product.price=updatePrice;
    product.imageUrl=updateImageUrl;
    product.description = updatedDesc;

   return product.save()
  })
  .then(result =>{

    console.log('Product updated')
    res.redirect('/admin/products')
    
  })
  .catch(err => console.log(err));
  
}



exports.getProducts = (req, res, next) => {
  // Product.findAll()
  req.user
  .getProducts()
  .then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err));
  
};

exports.postDeleteProduct = (req,res,next) => {

  const prodId = req.body.productId;
  
  // Product.destroy({

  // })
  Product.findByPk(prodId) 
  .then(product => {

   return product.destroy();
  })
  .then(() => {
    console.log("Product Destroyed");
    res.redirect('/admin/products')})
  .catch(err => console.log(err))
  




  }

