import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import api from "../services/api";

function EditCustomer() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "New"
  });

  const fetchCustomer = async () => {
    try {
      const res = await api.get(
        `/customers/${id}`
      );

      setFormData(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Name is required";

    } else if (
      formData.name.length < 2
    ) {
      newErrors.name =
        "Name must be at least 2 characters";
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";

    } else if (
      !emailRegex.test(formData.email)
    ) {
      newErrors.email =
        "Invalid email format";
    }

    const phoneRegex = /^0\d{9}$/;

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone is required";

    } else if (
      !phoneRegex.test(formData.phone)
    ) {
      newErrors.phone =
        "Phone must start with 0 and contain exactly 10 digits";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await api.put(
        `/customers/${id}`,
        formData
      );

      navigate("/");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>
        Chỉnh sửa khách hàng
      </h2>

      <form
        onSubmit={handleSubmit}
        className="form"
      >
        <input
          type="text"
          name="name"
          placeholder="Tên khách hàng"
          value={formData.name}
          onChange={handleChange}
        />

        {
          errors.name && (
            <p className="error">
              {errors.name}
            </p>
          )
        }

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        {
          errors.email && (
            <p className="error">
              {errors.email}
            </p>
          )
        }

        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={handleChange}
        />

        {
          errors.phone && (
            <p className="error">
              {errors.phone}
            </p>
          )
        }

        <input
          type="text"
          name="address"
          placeholder="Địa chỉ"
          value={formData.address}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="New">
            New
          </option>

          <option value="Contacted">
            Contacted
          </option>

          <option value="Potential">
            Potential
          </option>

          <option value="Customer">
            Customer
          </option>
        </select>

        <button type="submit">
          Cập nhật khách hàng
        </button>
      </form>
    </div>
  );
}

export default EditCustomer;