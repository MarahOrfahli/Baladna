import {
  faMailBulk,
  faMapPin,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-sky-600 text-white rounded-xl flex items-center justify-center font-bold">
                {/* <MapPin className="w-5 h-5" /> */}
                <FontAwesomeIcon icon={faMapPin} />
              </div>
              <span className="font-black text-xl text-white">
                بلدنا<span className="text-orange-500">.</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              منصة الجسر الرقمي لربط المواطنين والجهات الحكومية لبناء بيئة
              عمرانية وحياتية أفضل بشفافية تامة.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <a
                  href="#explore"
                  className="hover:text-white transition-colors"
                >
                  خريطة البلاغات الحية
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-white transition-colors"
                >
                  آلية العمل والخطوات
                </a>
              </li>
              <li>
                <a
                  href="#community"
                  className="hover:text-white transition-colors"
                >
                  مناقشات الحي المجتمعية
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-4">
              أنواع الحسابات
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <span className="hover:text-white cursor-pointer">
                  دخول كمواطن مدني
                </span>
              </li>
              <li>
                <a
                  href="#gov-section"
                  className="hover:text-white transition-colors"
                >
                  بوابة الموظف الحكومي
                </a>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">
                  تقديم بلاغ كزائر
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-4">
              تواصل وتحديثات
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faMailBulk}
                  className="w-4 h-4 text-sky-400"
                />{" "}
                support@bldna.com
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="w-4 h-4 text-sky-400"
                />{" "}
                +966 50 000 0000
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-slate-500 gap-4">
          <p>
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} منصة بلدنا
            الرقمية.
          </p>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 cursor-pointer">
              سياسة الخصوصية
            </span>
            <span className="hover:text-slate-300 cursor-pointer">
              شروط الاستخدام
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
