import { useNavigate } from "react-router";
export const OtherError = ({ styles, error }) => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <h1>حدث خطأ رقم {error.status}</h1>
      <p>{error.statusText}</p>
      <button onClick={() => navigate("/")} style={styles.button}>
        العودة للرئيسية
      </button>
    </div>
  );
};
