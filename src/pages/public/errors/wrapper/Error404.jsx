import { useNavigate } from "react-router";
export const Error404 = ({ styles }) => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.code, color: "#e74c3c" }}>404</h1>
      <h2>الصفحة غير موجودة!</h2>
      <p>الرابط الذي تحاول الوصول إليه غير صحيح أو تم حذفه.</p>
      <button onClick={() => navigate("/")} style={styles.button}>
        العودة للرئيسية
      </button>
    </div>
  );
};
