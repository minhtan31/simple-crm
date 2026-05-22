import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  // Load danh sách khách hàng
  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Xoá khách hàng
  const deleteCustomer = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá khách hàng này?")) return;

    try {
      await api.delete(`/customers/${id}`);
      setCustomers(customers.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Tìm kiếm khách hàng
  const searchCustomers = async () => {
    try {
      const res = await api.get(`/customers/search?q=${encodeURIComponent(search)}`);
      setCustomers(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div>
      <h2 className="page-title">Danh sách khách hàng</h2>

      {/* SEARCH */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchCustomers}>
          Search
        </button>
      </div>

      {/* LIST */}
      <div className="customer-grid">
        {customers.length === 0 ? (
          <p>Không có khách hàng nào</p>
        ) : (
          customers.map((customer) => (
            <div key={customer._id} className="customer-card">
              <h3>{customer.name}</h3>

              <p><strong>Email:</strong> {customer.email}</p>
              <p><strong>Phone:</strong> {customer.phone}</p>
              <p><strong>Address:</strong> {customer.address}</p>
              <p><strong>Status:</strong> {customer.status}</p>

              <div className="button-group">
                <Link to={`/edit/${customer._id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => deleteCustomer(customer._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CustomerList;