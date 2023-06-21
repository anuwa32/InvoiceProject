import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./stylesi.module.css";
import Sidebar from "../Sidebar";

const Invoice = () => {

  const [data, setData] = useState({

    date: "",
    invoiceId: "",
    customerName: "",
    itemId: "",
    description: "",
    price: "",
    qty: "",
    total: "",
  });

  function refreshPage() {
    window.location.reload(false);
  }

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8085/api/invoice";
      const { data: res } = await axios.post(url, data);
      navigate("/product");
      console.log(res.message);
      console.log(res.data);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <Sidebar />
      <div className={styles.invoice_container}>
        <div className={styles.invoice_form_container}>
          <div className={styles.colt}></div>
          <div className={styles.colt2}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h3>Invoice</h3>

              <input
                type="Date"
                placeholder="Date"
                name="date"
                onChange={handleChange}
                value={data.date}
                required
                className={styles.input}
              />
              <input
                type="number"
                min={0}
                placeholder="Invoice ID"
                name="invoiceId"
                onChange={handleChange}
                value={data.invoiceId}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="customer Name"
                name="customerName"
                onChange={handleChange}
                value={data.customerName}
                required
                className={styles.input}
              />
              <input
                type="number"
                min={0}
                max={100}
                placeholder="Item Id"
                name="itemId"
                onChange={handleChange}
                value={data.itemId}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleChange}
                value={data.description}
                required
                className={styles.input}
              />
              <input
                min={0}
                type="text"
                placeholder="Price"
                name="price"
                onChange={handleChange}
                value={data.price}
                required
                className={styles.input}
              />
              <input
                min={0}
                type="number"
                placeholder="Qty"
                name="qty"
                onChange={handleChange}
                value={data.qty}
                required
                className={styles.input}
              />
              {error && <div className={styles.error}>{error}</div>}

              <button type="submit" className={styles.btnb}>
                Process
              </button>

              <button type="refresh" onClick={refreshPage} className={styles.btnc}>
                Clear
              </button>

            </form>
          </div>
        </div>
      </div>

      <div className="row">
        <table className="table table-striped table borderd">
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <td>{data.itemId}</td>
            <td>{data.description}</td>
            <td>{data.qty}</td>
            <td>{data.price * data.qty}</td>
          </tbody>
        </table>
      </div>
      <div className={styles.total}>
        <label>
          Total:
          <input
            type="number"
            placeholder="Total"
            name="total"
            onChange={handleChange}
            value={data.price * data.qty}
          />
        </label>
      </div>
    </div>
  );
}
export default Invoice;