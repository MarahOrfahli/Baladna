import { useNavigate } from "react-router";
export const Error503 = ({ styles }) => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.code, color: "#95a5a6" }}>503</h1>
      <h2>الخدمة غير متاحة!</h2>
      <p>الخادم غير قادر على معالجة الطلب حالياً، حاول لاحقاً.</p>
      <button onClick={() => navigate(0)} style={styles.button}>
        تحديث الصفحة
      </button>
    </div>
  );
};
