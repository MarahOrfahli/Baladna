import { useNavigate } from "react-router";
export const Error400 = ({ styles }) => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.code, color: "#e67e22" }}>400</h1>
      <h2>طلب غير صحيح!</h2>
      <p>الطلب المرسل غير صحيح، يرجى التحقق من البيانات.</p>
      <button onClick={() => navigate(-1)} style={styles.button}>
        العودة للخلف
      </button>
    </div>
  );
};
