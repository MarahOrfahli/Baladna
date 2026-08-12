import { useTranslation } from "react-i18next";
const StepsCard = ({ step }) => {
  const { t } = useTranslation();

  return (
    <div
      key={step.number}
      className="relative h-full w-full rounded-xl shadow-md transition-transform duration-700 transform-3d hover:transform-[rotateY(180deg)]"
    >
      <div className="absolute overflow-hidden inset-0 flex flex-col items-center justify-center rounded-xl bg-basic-green-gray font-bold backface-hidden">
        <div className="absolute -top-10 ltr:-left-10 rtl:-right-10 rotate-45 w-20 h-20 bg-basic-green flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-sky-600/20 hover:bg-emerald-500 transition-colors">
          <span className="translate-x-6 rtl:translate-x-1 rtl:translate-y-7 -rotate-45 text-xl font-black text-slate-200 group-hover:text-sky-100 transition-colors">
            {step.number}
          </span>
        </div>
        <div className="flex justify-center items-center gap-3 flex-col p-6">
          <img
            src={step.img}
            alt="Description of the image"
            className={`${step.imgClass} object-cover`}
          />
          <h4>{t(step.title)}</h4>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-basic-green text-slate-400 font-bold backface-hidden transform-[rotateY(180deg)]">
        <p className="p-4">{t(step.description)}</p>
      </div>
    </div>
  );
};

export default StepsCard;
