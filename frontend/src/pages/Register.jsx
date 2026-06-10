import { useState } from "react";
import api from "../services/api";
import "./auth.css";

function Register() {
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 📌 HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📌 VALIDATE
  const validate = () => {
    let err = {};

    // NAME
    if (!form.name || form.name.trim().length < 2) {
      err.name = "Tên phải có ít nhất 2 ký tự";
    }

    // EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      err.email = "Vui lòng nhập email";
    } else if (!emailRegex.test(form.email)) {
      err.email = "Email không hợp lệ";
    }

    // PHONE (optional)
    const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
    if (form.phone && !phoneRegex.test(form.phone)) {
      err.phone = "SĐT không hợp lệ (VD: 09xxxxxxxx)";
    }

    // COMPANY (optional)
    if (form.company && form.company.trim().length === 0) {
      err.company = "Công ty không hợp lệ";
    }

    // PASSWORD
    if (!form.password) {
      err.password = "Vui lòng nhập mật khẩu";
    } else if (form.password.length < 6) {
      err.password = "Mật khẩu phải >= 6 ký tự";
    }

    // CONFIRM PASSWORD
    if (form.password !== form.confirmPassword) {
      err.confirmPassword = "Mật khẩu không khớp";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // 📌 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const { name, email, password, phone, company } = form;

      await api.post("/auth/register", {
        name,
        email,
        password,
        phone,
        company,
      });

      alert("Đăng ký thành công");

      // reset form
      setForm(initialForm);

      window.location.href = "/login";
    } catch (err) {
      const res = err.response?.data;

      // backend trả field error (email trùng)
      if (res?.field) {
        setErrors((prev) => ({
          ...prev,
          [res.field]: res.message,
        }));
      } else {
        setErrors({
          general: res?.message || "Đăng ký thất bại",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        {/* LEFT */}
        <div className="auth-left">
          <h2>Create Account 🚀</h2>
          <p>Đăng ký hệ thống CRM</p>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <h3>Đăng ký</h3>

          {errors.general && (
            <p className="error">{errors.general}</p>
          )}

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <input
              name="name"
              placeholder="Họ tên"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            {/* PHONE */}
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại (tuỳ chọn)"
              value={form.phone}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}

            {/* COMPANY */}
            <input
              name="company"
              placeholder="Công ty"
              value={form.company}
              onChange={handleChange}
            />
            {errors.company && <p className="error">{errors.company}</p>}

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            {/* CONFIRM PASSWORD */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}

            {/* BUTTON */}
            <button disabled={loading}>
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </button>

          </form>

          <p className="switch">
            Đã có tài khoản? <a href="/login">Đăng nhập</a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;