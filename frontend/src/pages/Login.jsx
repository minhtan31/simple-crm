import { useState } from "react";
import api from "../services/api";
import "./auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ VALIDATE LOGIN
  const validate = () => {
    if (!email) return "Vui lòng nhập email";
    if (!password) return "Vui lòng nhập mật khẩu";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const errorMsg = validate();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (!res.data.token) {
        setError("Sai email hoặc mật khẩu");
        return;
      }

      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="auth-left">
          <h2>Welcome back 👋</h2>
          <p>Đăng nhập để quản lý CRM</p>
        </div>

        <div className="auth-right">
          <h3>Đăng nhập</h3>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="password-box">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span onClick={() => setShowPass(!showPass)}>
                {showPass ? "🙈" : "👁️"}
              </span>
            </div>

            <button disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <p className="switch">
            Chưa có tài khoản? <a href="/register">Đăng ký</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;