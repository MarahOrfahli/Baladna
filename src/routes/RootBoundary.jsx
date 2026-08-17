import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import {
  Error400,
  Error401,
  Error403,
  Error404,
  Error500,
  Error503,
  OtherError,
  RuntimeError
} from "../pages/public/errors";

const RootBoundary = () => {
  const error = useRouteError();

  console.error("RootBoundary caught an error:", error);

  // 1. Handling Routing, API Errors...
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 400:
        return <Error400 styles={styles} />;
      case 401:
        return <Error401 styles={styles} />;
      case 404:
        return <Error404 styles={styles} />;
      case 403:
        return <Error403 styles={styles} />;
      case 500:
        return <Error500 styles={styles} />;
      case 503:
        return <Error503 styles={styles} />;
      default:
        return <OtherError styles={styles} error={error} />;
    }
  }

  // 2. (Runtime JavaScript Errors)
  return <RuntimeError />;
};

// تنسيقات سريعة وجميلة للمظهر
const styles = {
  container: {
    textAlign: "center",
    marginTop: "15vh",
    fontFamily: "sans-serif",
    padding: "0 2rem"
  },
  code: { fontSize: "7rem", margin: 0, fontWeight: "bold" },
  button: {
    padding: "10px 20px",
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "1rem"
  }
};

export default RootBoundary;
