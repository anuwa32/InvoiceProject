import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const Sales = () => {

    const [date1, setDATE1] = useState()
    const [date2, setDATE2] = useState()
    const [genDate, setGENDATE] = useState()
    const [total, setTOTAL] = useState()
    const [data, setData] = useState([])

    useEffect(() => {

        const queryParams = new URLSearchParams(window.location.search);
        setGENDATE(queryParams.get('today'));
        setDATE1(queryParams.get('from'));
        setDATE2(queryParams.get('to'));
        setData(JSON.parse(localStorage.getItem("searchData")))
        setTOTAL(localStorage.getItem("total"))
    }, []);

    function printPage() {
        window.print();
    }
    return (

        <div>
            <div className={styles.sales_container}>
                <div className={styles.sales_form_container}>
                    <div className={styles.colt}></div>
                    <div className={styles.colt2}>
                        <form className={styles.form_container}>
                            <h3>Total Sale</h3>
                            <div className={styles.genDate}>
                                <label>
                                    Generate Date:
                                    <input
                                        type="text"
                                        placeholder="Generate Date"
                                        name="genDate"
                                        value={genDate}
                                    />
                                </label>
                            </div>
                            <div className={styles.fromDate}>
                                <label>
                                    Date From:
                                    <input
                                        type="text"
                                        placeholder="Date From"
                                        name="date1"
                                        value={date1}
                                    />
                                </label>
                            </div>
                            <div className={styles.toDate}>
                                <label>
                                    Date To:
                                    <input
                                        type="text"
                                        placeholder="Date To"
                                        name="date2"
                                        value={date2}
                                    />
                                </label>
                            </div>
                            <div className="row">
                                <table className="data-table">
                                    <tbody>
                                        <tr>
                                            <th>Invoice No</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Customer Name</th>
                                        </tr>
                                        {data.map((invoice) => {
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
                            </div>

                            <button type="submit" onClick={printPage} className={styles.btnb}>
                                Print
                            </button>
                            <div className={styles.total}>
                                <label>
                                    Total:
                                    <input
                                        type="text"
                                        placeholder="Total"
                                        name="total"
                                        value={total}
                                    />
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Sales;