import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddCustomer() {

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "New"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

    const validateForm = () => {
    let newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Tên là bắt buộc";

    } else if (formData.name.length < 2) {
      newErrors.name =
        "Tên phải có ít nhất 2 ký tự";
    }

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc";

    } else if (
      !emailRegex.test(formData.email)
    ) {
      newErrors.email = "Định dạng email không hợp lệ";
    }

    // Phone validation
    const phoneRegex = /^0\d{9}$/;

    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc";

    } else if (
      !phoneRegex.test(formData.phone)
    ) {
      newErrors.phone =
        "Số điện thoại phải bắt đầu bằng 0 và chứa đúng 10 chữ số";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Địa chỉ là bắt buộc";
    }

    // Status validation
    if (!formData.status) {
      newErrors.status = "Status là bắt buộc";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await api.post("/customers", formData);

      navigate("/");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">

      <h2 className="page-title">
        Add Customer
      </h2>

      <form
        onSubmit={handleSubmit}
        className="form"
      >

        <label>Name</label>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />

        {
          errors.name &&
          <p className="error">
            {errors.name}
          </p>
        }

        <label>Email</label>

        <input
          type="text"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />

        {
          errors.email &&
          <p className="error">
            {errors.email}
          </p>
        }

        <label>Phone</label>

        <input
          type="text"
          name="phone"
          placeholder="Enter phone"
          value={formData.phone}
          onChange={handleChange}
        />

        {
          errors.phone &&
          <p className="error">
            {errors.phone}
          </p>
        }

        <label>Address</label>

        <input
          type="text"
          name="address"
          placeholder="Enter address"
          value={formData.address}
          onChange={handleChange}
        />

        {
          errors.address &&
          <p className="error">
            {errors.address}
          </p>
        }

        <label>Status</label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="New">
            Mới
          </option>

          <option value="Contacted">
            Đã liên hệ
          </option>

          <option value="Potential">
            Tiềm năng
          </option>
        </select>

        <button
          type="submit"
          className="submit-btn"
        >
          Thêm khách hàng
        </button>

      </form>
    </div>
  );
}

export default AddCustomer;