import { useNavigate } from "react-router";
export const RuntimeError = ({ styles, error }) => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.code, color: "#c0392b" }}>مهم</h1>
      <h2>حدث خطأ غير متوقع في الكود!</h2>
      <p style={{ color: "#7f8c8d", maxWidth: "500px", margin: "10px auto" }}>
        {error?.message || "تعذر تحميل هذه الصفحة بسبب مشكلة برمجية داخليّة."}
      </p>
      <button onClick={() => navigate("/")} style={styles.button}>
        العودة للرئيسية
      </button>
    </div>
  );
};
