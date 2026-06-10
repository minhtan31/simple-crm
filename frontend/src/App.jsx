import {
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerList from "./pages/CustomerList";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const token = localStorage.getItem("token");

  return (
    <div className="container">

      {token && (
        <header className="header">
          <h1>Simple CRM</h1>

          <nav className="navbar">
            <Link to="/">Khách hàng</Link>

            <Link to="/add">
              Thêm khách hàng
            </Link>

                    <button className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Đăng xuất
        </button>
          </nav>
        </header>
      )}

      <main>
        <Routes>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <CustomerList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddCustomer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditCustomer />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>

    </div>
  );
}

export default App;