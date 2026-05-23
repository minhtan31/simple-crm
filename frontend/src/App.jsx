import {
  Routes,
  Route,
  Link
} from "react-router-dom";

import CustomerList from "./pages/CustomerList";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";

function App() {
  
  return (
    <div className="container">
      
      <header className="header">
        <h1>Simple CRM</h1>

        <nav className="navbar">
          <Link to="/">Khách hàng</Link>

          <Link to="/add">
            Thêm khách hàng
          </Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={<CustomerList />}
          />

          <Route
            path="/add"
            element={<AddCustomer />}
          />

          <Route
            path="/edit/:id"
            element={<EditCustomer />}
          />
        </Routes>
      </main>
      

    </div>
  );

}


export default App;