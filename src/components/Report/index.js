import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Sidebar from "../Sidebar";

const Report = () => {
  useEffect(() => {
    const d = new Date();
    let month = d.getMonth() + 1
    let date = d.getFullYear() + "-" + month + "-" + d.getDate();
    setToday(date)
  })
  const [data, setData] = useState({
    date1: "",
    date2: "",
    invoice: [],
    invoiceId: "",
    amount: "",
    date: "",
    customerName: "",
  });

  function refreshPage() {
    window.location.reload(false);
  }

  const [error, setError] = useState("");
  const [searchData, setSearchData] = useState([]);
  const navigate = useNavigate();
  const [today, setToday] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8085/api/search/", {
        date1: data.date1,
        date2: data.date2,
      })
      .then((dd) => {
        console.log(dd.data);
        setSearchData(dd.data);
        localStorage.setItem("searchData", JSON.stringify(dd.data))
        let tempTotal = 0;
        dd.data.forEach(element => {
          tempTotal += element.amount;
        });
        localStorage.setItem("total", tempTotal)
      });
  };

  return (
    <div>
      <Sidebar />
      <div className={styles.report_container}>
        <div className={styles.report_form_container}>
          <div className={styles.colt}></div>
          <div className={styles.colt2}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <div className={styles.dateFrom}>
                <input
                  type="Date"
                  placeholder="Date"
                  name="date1"
                  onChange={handleChange}
                  value={data.date1}
                  required
                />
              </div>
              <div className={styles.dateTo}>
                <input
                  type="Date"
                  placeholder="Date"
                  name="date2"
                  onChange={handleChange}
                  value={data.date2}
                  required
                />
              </div>
              {error && <div className={styles.error}>{error}</div>}

              <button type="submit" className={styles.btnb}>
                Search
              </button>
              <Link to={"/sales/?from=" + data.date1 + "&to=" + data.date2 + "&today=" + today}>
                <button type="submit" className={styles.btnc}>
                  Print
                </button>
              </Link>
              <button type="refresh" onClick={refreshPage} className={styles.btnd}>
                Clear
              </button>

              <table className="data-table">
                <tbody>
                  <tr>
                    <th>Invoice No</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Customer Name</th>
                  </tr>
                  {searchData.map((invoice) => {
                    return (
                      <tr key={invoice._id}>
                        <td>{invoice.invoiceId}</td>
                        <td>{invoice.date.split("T")[0]}</td>
                        <td>{invoice.amount}</td>
                        <td>{invoice.customerName}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Report;
