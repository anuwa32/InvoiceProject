const router = require("express").Router();
const { Products, validate } = require("../models/products");

router.post("/", async (req, res) => {
	try {
		const products = await Products.findOne({ products_id: req.body.products_id });
		if (products)
			return res
				.status(409)
				.send({ message: "Id with given Product Details already Exist!" });

		await new Products({ ...req.body }).save();
		res.status(201).send({ message: "Product details entered successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;