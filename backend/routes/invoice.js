const router = require("express").Router();
const { Invoice, validate } = require("../models/invoice");

router.post("/", async (req, res) => {
	try {
		let qty = req.body.qty;
		let price = req.body.price;
		amount = price * qty;

		const inv = await Invoice.findOne({ invoiceId: req.body.invoiceId });
		if (inv)
			return res
				.status(409)
				.send({ message: "Details with given ID already Exist!" });

		await new Invoice({ ...req.body, "amount": amount }).save();
		res.status(201).send({ message: "Invoice details entered successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });

	}
});
module.exports = router;