import { useNavigate } from "react-router";

export const Error401 = ({ styles }) => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.code, color: "#f1c40f" }}>401</h1>
      <h2>غير مصرح!</h2>
      <p>يجب تسجيل الدخول للوصول إلى هذه الصفحة.</p>
      <button onClick={() => navigate("/login")} style={styles.button}>
        تسجيل الدخول
      </button>
    </div>
  );
};
