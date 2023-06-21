const mongoose = require("mongoose");
const Joi = require("joi");

const productsSchema = new mongoose.Schema({
        
    products_id: {type: String, require:true},
    products_name:{type: String, require:true},
    products_price:{type: String, require:true},
    products_qty:{type: String, require:true},
});

const Products = mongoose.model("products",productsSchema);

const validate = (data) =>{
    const schema = Joi.object({
        products_id:Joi.string().required().label("Products Id"),
        products_name:Joi.string().required().label("Products Name"),
        products_price:Joi.string().required().label("Products Price"),
        products_qty:Joi.string().required().label("Products Price"),
    });
};
module.exports = {Products,validate}