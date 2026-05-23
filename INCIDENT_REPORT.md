# Incident 1 - MongoDB Connection Failure

## Hiện tượng
Backend không khởi động được.

## Nguyên nhân
Sai MONGO_URI trong file .env.

## Cách fix
Cập nhật đúng MongoDB Atlas connection string.

---

# Incident 2 - Frontend API Connection Error

## Hiện tượng
Frontend không load dữ liệu.

## Nguyên nhân
Sai VITE_API_URL.

## Cách fix
Đổi đúng backend URL.

---

# Incident 3 - CI/CD Pipeline Failure

## Hiện tượng
GitHub Actions fail khi push code.

## Nguyên nhân
Lỗi syntax JavaScript gây ESLint fail.

## Cách fix
Sửa syntax và push lại.