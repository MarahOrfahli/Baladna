// src/components/RootBoundary.jsx
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';

const RootBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  // طباعة الخطأ في الكونسول للمطورين لمتابعته أثناء العمل
  console.error("RootBoundary caught an error:", error);

  // 1. التعامل مع أخطاء الـ HTTP (مثل الأخطاء القادمة من الـ Routing والـ API)
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return (
          <div style={styles.container}>
            <h1 style={{ ...styles.code, color: '#e74c3c' }}>404</h1>
            <h2>الصفحة غير موجودة!</h2>
            <p>الرابط الذي تحاول الوصول إليه غير صحيح أو تم حذفه.</p>
            <button onClick={() => navigate('/')} style={styles.button}>العودة للرئيسية</button>
          </div>
        );
      case 403:
        return (
          <div style={styles.container}>
            <h1 style={{ ...styles.code, color: '#f39c12' }}>403</h1>
            <h2>وصول مرفوض!</h2>
            <p>ليس لديك الصلاحيات الكافية لعرض هذه الصفحة.</p>
            <button onClick={() => navigate('/')} style={styles.button}>العودة للرئيسية</button>
          </div>
        );
      case 500:
        return (
          <div style={styles.container}>
            <h1 style={{ ...styles.code, color: '#95a5a6' }}>500</h1>
            <h2>خطأ داخلي في السيرفر!</h2>
            <p>نواجه مشكلة في الاتصال بالخادم حالياً، يرجى المحاولة لاحقاً.</p>
            <button onClick={() => navigate(0)} style={styles.button}>تحديث الصفحة</button>
          </div>
        );
      default:
        return (
          <div style={styles.container}>
            <h1>حدث خطأ رقم {error.status}</h1>
            <p>{error.statusText}</p>
            <button onClick={() => navigate('/')} style={styles.button}>العودة للرئيسية</button>
          </div>
        );
    }
  }

  // 2. التعامل مع الأخطاء البرمجية (Runtime JavaScript Errors)
  // (مثال: محاولة قراءة خاصية من متغير قيمته undefined)
  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.code, color: '#c0392b' }}>مهم</h1>
      <h2>حدث خطأ غير متوقع في الكود!</h2>
      <p style={{ color: '#7f8c8d', maxWidth: '500px', margin: '10px auto' }}>
        {error?.message || "تعذر تحميل هذه الصفحة بسبب مشكلة برمجية داخليّة."}
      </p>
      <button onClick={() => navigate('/')} style={styles.button}>العودة للرئيسية</button>
    </div>
  );
};

// تنسيقات سريعة وجميلة للمظهر
const styles = {
  container: { textAlign: 'center', marginTop: '15vh', fontFamily: 'sans-serif', padding: '0 2rem' },
  code: { fontSize: '7rem', margin: 0, fontWeight: 'bold' },
  button: { padding: '10px 20px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', fontSize: '1rem' }
};

export default RootBoundary;
