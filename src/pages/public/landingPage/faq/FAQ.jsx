import {forwardRef, useState } from "react";
import FaqItem from "./faqItem";

// بيانات الأسئلة والأجوبة
const faqData = [
  {
    question: "هل الخدمة مجانية للمواطنين؟",
    answer:
      "نعم، خدمتنا مجانية تماماً للمواطنين والمقيمين. الهدف هو تحسين جودة الحياة في مدننا.",
  },
  {
    question: "من المسؤول عن حل المشكلة؟",
    answer:
      "نقوم بتوجيه البلاغ تلقائياً للجهة المختصة (البلدية، شركة الكهرباء، المياه، إلخ) وفقاً لنوع المشكلة.",
  },
  {
    question: "كم يستغرق حل المشكلة؟",
    answer:
      "يختلف الوقت حسب نوع المشكلة والجهة المسؤولة، ولكننا نتابع مع الجهات لتسريع الإنجاز، ونحدثك بأي تقدم.",
  },
  {
    question: "هل بياناتي آمنة؟",
    answer:
      "نعم، نلتزم بسياسات الخصوصية الصارمة، ولا نشارك بياناتك الشخصية إلا مع الجهة المعنية بحل البلاغ.",
  },
];
const FAQ = forwardRef((props, ref) => {
  const [activeIndexes, setActiveIndexes] = useState([0]);

  const toggleItem = (index) => {
    setActiveIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section ref={ref} className="py-16 md:py-20 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-10">
        الأسئلة الشائعة
      </h2>
      <div className="space-y-1">
        {faqData.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            answer={item.answer}
            isActive={activeIndexes.includes(index)}
            toggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </section>
  );
});

export default FAQ;