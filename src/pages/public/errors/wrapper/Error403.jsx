import { useNavigate } from "react-router";
export const Error403 = ({ styles }) => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.code, color: "#f39c12" }}>403</h1>
      <h2>وصول مرفوض!</h2>
      <p>ليس لديك الصلاحيات الكافية لعرض هذه الصفحة.</p>
      <button onClick={() => navigate("/")} style={styles.button}>
        العودة للرئيسية
      </button>
    </div>
  );
};
