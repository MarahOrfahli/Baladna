import { useNavigate } from "react-router";
export const Error500 = ({ styles }) => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.code, color: "#95a5a6" }}>500</h1>
      <h2>خطأ داخلي في السيرفر!</h2>
      <p>نواجه مشكلة في الاتصال بالخادم حالياً، يرجى المحاولة لاحقاً.</p>
      <button onClick={() => navigate(0)} style={styles.button}>
        تحديث الصفحة
      </button>
    </div>
  );
};
