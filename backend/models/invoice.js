const mongoose = require("mongoose");
const Joi = require("joi");

const invoiceSchema = new mongoose.Schema({

    date: { type: Date, require },
    invoiceId: { type: Number, require },
    customerName: { type: String, require },
    itemId: { type: Number, require },
    description: { type: String, require },
    price: { type: Number, require },
    qty: { type: Number, require },
    amount: { type: Number, require },
    total: {type: Number, require},
});

const Invoice = mongoose.model("invoice", invoiceSchema);

const validate = (data) => {
    const schema = Joi.object({
        date: Joi.date().required().label("Date"),
        invoiceId: Joi.string().required().label("Invoice Add"),
        customerName: Joi.string().required().label("Customer Name"),
        itemId: Joi.number().required().label("Item Id"),
        description: Joi.string().required().label("Description"),
        price: Joi.number().required().label("Price"),
        qty: Joi.number().required().label("Quantity"),
        amount: Joi.number().required().label("Amount"),
        total: Joi.number().required().label("Total"),
    });
};
module.exports = { Invoice, validate }