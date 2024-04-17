import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import User from "./model/User.js";

const app = express();
app.use(express.json());

const MONGODB_URI = "";
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
       console.log ('MongoDB connected'); 
    }
};

//post /singup
app.post("/signup", async (req, res) => {
    const {
        name,
        email,
        password,
        mobile,
        address, 
         gender
    } = req.body;

    const user = new User({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        address: address,
        gender:gender
    })

    try{
        const savedUser = await user.save();
   
        res.json({
            success: true,
            data: savedUser,
            message: " User created successfully "
        })
      }
      catch(e){
       res.json({
           success: false,
           message: e.message
       }) 
    }
});

//post/ login
app.post("/login", async (req, res ) =>{
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "please provide email and password"
        })
    }

    const  user = await User.findOne({
        email: email,
        password: password
    }).select("name email mobile")
    
    if (user) {
        return res.json({
            success: true,
            data: user,
            message: "Login successful"
        });   
    }
    else{
        return res.json({
            success: false,
            message: "Invalid credentials"
        });
    }
});

//get /product
app.get("/products", async (req, res) => {
    const Products = await Products.find();
 
    res.json({
     success:true,
     data: Products,
     message: "Products fetched successfully"
    });
 });

 //post /product
 app.post('/product', async (req, res) => {
    const { name, description, price, image, category, brand } = req.body;

    const product = new Product({
        name: name,
        description: description,
        price: price,
        image: image,
        category: category,
        brand: brand
    });
    try {
        const saveProduct = await product.save();
        res.json({
            success: true,
            data: saveProduct,
            message: "Successfully added new product"
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
});

//get /product/:id
app.get("/product/:id", async (req, res) => {
    const {id} = req.params;
 
    const product = await Product.findById(id);
 
    res.json({
     success: true,
     data: product,
     message: "Product fetched successfully"
    });
 });

 //put /product/:id
 app.put("/product/:id", async (req, res) => {
    const {id} = req.params;
  
    const { name, description, price, image, category, brand, } = req.body;
  
      await Product.updateOne({_id: id}, {$set : {
       name: name,
       description: description,
       price: price,
       image: image,
       category: category,
       brand: brand,
    }});
  
    const updatedProduct = await Product.findById(id);
  
     res.json({
      success: true,
      data: updatedProduct,
      message: "Product update successfully"
     }); 
  });

  //post /product/search?query
  app.get("/products/search", async (req, res) => {
    const {q} = req.query;

    const products = await Product.find({name: {$regex: q, $options: "i"}});

    res.json({
        success: true,
        data: products,
        message: "Product fetched successfully"
    });
  });

  //post /order
  app.post("/order", async (req, res) => {
    const {
        user,
        product,
        quantity,
        shippingAddress,
        deliveryCharges
    } = req.body;

    const order = new Order({
        user: user ,
        product: product,
        quantity: quantity,
        shippingAddress: shippingAddress,
        deliveryCharges: deliveryCharges
    });

   try{
        const savedOrder = await order.save();

        res.json({
            success: true,
            data: savedOrder,
            message: "Order created successfully"
        });
    }
    catch(e){
        res.json({
            success: false,
            message: e.message
        });
    }
 });

 //Get / order/:id
app.get("/order/:id", async (req, res) =>{
    const {id} = req.params;

    const order = await Order.findById(id).populate("user product");

    order.user.password = undefined;
    // order.user.gender = undefined;
    // order.user.address = undefined;
    // order.user.createdAt = undefined;
    // order.user.updatedAt = undefined;

    res.json({
      success: true,
      data: order,
      message: "Order fetched successfully"
    });
});

//Get/orders/user/:id
app.get("/orders/user/:id", async(req, res) =>{
    const {id} = req.params;

    const orders = await Order.find({user: id}).populate('product user');
    
    res.json({
        success: true,
        data: orders,
        message: "Order fetched successfully"
    });
});

//Patch/order/status/:id
app.patch("/order/status/:id", async(req, res) => {
    const {id} = req.params;
    const {status} = req.body;
   
    const STATUS_PRIORITY_MAP = {
      pending:0,
      shipped:1,
      delivered:2,
      returned:3,
      cancelled:4,
      rejected:5
    }
   
    const order = await Order.findById(id);
    const currentStatus = order.status;
   
    const currentPriority = STATUS_PRIORITY_MAP [currentStatus];
    const newPriority = STATUS_PRIORITY_MAP [status];
   
    if(currentPriority > newPriority) {
       
       return res.json({
           success: false,
           message: `${status} cannot be set once order is ${currentStatus}`
       });
    }
   
    await Order.updateOne({_id: id}, {$set: {status: status}});
   
   
   
    await Order.updateOne ({_id: id},
       {$set: {status:status}});
   
       const updatedProduct = await Order.findOne({_id: id})
   
       res.json({
           success: true,
           data: updatedProduct,
           message:" Order status updated successfully"
       });
       
   });


//Get /orders
app.get("/orders", async(req, res) => {
    const orders = await Order.find();
  
    res.json({
      success: true,
      data:orders,
      message: "Orders fetched successfully"
    });
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on  port: ${PORT} `)
    connectDB();
});