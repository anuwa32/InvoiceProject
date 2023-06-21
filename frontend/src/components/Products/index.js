import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Sidebar from "../Sidebar";

const Products = () => {
  const [data, setData] = useState({
    products_id: "",
    products_name: "",
    products_price: "",
    products_qty: "",
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
      const url = "http://localhost:8085/api/products";
      const { data: res } = await axios.post(url, data);
      navigate("/report");
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
      <div className={styles.products_container}>
        <div className={styles.products_form_container}>
          <div className={styles.colt}></div>
          <div className={styles.colt2}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h3>Products</h3>

              <input
                min={0}
                type="number"
                placeholder="Products ID"
                name="products_id"
                onChange={handleChange}
                value={data.products_id}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Products Name"
                name="products_name"
                onChange={handleChange}
                value={data.products_name}
                required
                className={styles.input}
              />
              <input
                min={0}
                type="number"
                placeholder="Price"
                name="products_price"
                onChange={handleChange}
                value={data.products_price}
                required
                className={styles.input}
              />
              <input
                min={0}
                type="number"
                placeholder="Quantity"
                name="products_qty"
                onChange={handleChange}
                value={data.products_qty}
                required
                className={styles.input}
              />
              {error && <div className={styles.error}>{error}</div>}

              <button type="submit" className={styles.btnb}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>

      <Link to="">
        <button type="button" className={styles.update_btn}>
          Update
        </button>
      </Link>

      <Link to="">
        <button type="button" onClick={refreshPage} className={styles.clear_btn}>
          Clear
        </button>
      </Link>
    </div>
  );
};
export default Products;
