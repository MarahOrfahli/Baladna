import {
    faArrowLeft,
    faComment,
    faCommentDots,
    faHandHoldingHeart,
    faHeart,
    faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef } from "react";


const CommunitySection = forwardRef((props, ref) => {
    return (
        <section
            ref={ref} 
            className="relative overflow-hidden bg-slate-900 py-24 text-white"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary-400 via-transparent to-transparent opacity-10"></div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="flex flex-col items-center gap-16 lg:flex-row">
                    {/* Left content */}
                    <div className="w-full space-y-8 lg:w-1/2">
                        <h2 className="text-3xl font-black leading-tight md:text-5xl">
                            لست وحدك... <br />
                            <span className="text-primary-400">شارك مجتمعك في إيجاد الحلول</span>
                        </h2>
                        <p className="text-lg font-medium leading-relaxed text-slate-300">
                            منصة "بلدنا" ليست مجرد صندوق شكاوى. عند إنشاء حساب، يمكنك الوصول إلى
                            قسم "المناقشات المحلية" الخاص بمنطقتك.
                        </p>

                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="rounded-lg bg-primary-600/20 p-2 text-primary-400">
                                    <FontAwesomeIcon icon={faCommentDots} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">طرح المنشورات</h4>
                                    <p className="text-sm font-medium text-slate-400">
                                        ناقش مشاكل تتكرر كثيراً واقترح حلولاً مسبقة قبل رفع الشكوى.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="rounded-lg bg-primary-600/20 p-2 text-primary-400">
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">التفاعل والإعجاب</h4>
                                    <p className="text-sm font-medium text-slate-400">
                                        تفاعل مع منشورات جيرانك عبر الإعجابات والتعليقات لبلورة فكرة
                                        موحدة.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="rounded-lg bg-primary-600/20 p-2 text-primary-400">
                                    <FontAwesomeIcon icon={faHandHoldingHeart} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">تقديم توصيات للجهات</h4>
                                    <p className="text-sm font-medium text-slate-400">
                                        يمكن للموظف الحكومي الاطلاع على هذه المناقشات لأخذ التوصيات
                                        بعين الاعتبار.
                                    </p>
                                </div>
                            </li>
                        </ul>

                        <button className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-4 font-bold text-white transition-all hover:bg-primary-500">
                            إنشاء حساب للمشاركة
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </div>

                    {/* Right: Discussion post mockup */}
                    <div className="w-full lg:w-1/2">
                        <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-2xl">
                            {/* Post header */}
                            <div className="mb-4 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-xl font-bold">
                                    أ
                                </div>
                                <div>
                                    <h5 className="font-bold">أحمد عبدالله</h5>
                                    <p className="text-xs text-slate-400">منطقة حي الياسمين • منذ ساعتين</p>
                                </div>
                            </div>

                            {/* Post body */}
                            <p className="mb-4 font-medium text-slate-200">
                                بخصوص تجمع المياه في التقاطع الرئيسي للحي كلما هطلت الأمطار، هل
                                تعتقدون أن المشكلة في انسداد المصارف أم في ميلان الأسفلت؟ أقترح أن
                                نرفع شكوى جماعية ونرفق فيديو للوضع لتوضيح حجم المعاناة.
                            </p>

                            {/* Post actions */}
                            <div className="flex items-center gap-6 border-t border-slate-700 pt-4 text-slate-400">
                                <button className="flex items-center gap-2 font-bold transition-colors hover:text-primary-400">
                                    <FontAwesomeIcon icon={faHeart} /> 24 إعجاب
                                </button>
                                <button className="flex items-center gap-2 font-bold transition-colors hover:text-primary-400">
                                    <FontAwesomeIcon icon={faComment} /> 8 تعليقات
                                </button>
                            </div>

                            {/* Comment */}
                            <div className="mt-4 rounded-2xl bg-slate-700/50 p-4">
                                <div className="mb-2 flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-600 text-sm font-bold">
                                        س
                                    </div>
                                    <h6 className="text-sm font-bold">سالم الفهد</h6>
                                </div>
                                <p className="text-sm text-slate-300">
                                    اتفق معك، قمت مسبقاً بإنشاء بلاغ رقم #4920، أتمنى من الجميع الدخول
                                    وتأكيد البلاغ لرفع أولويته!
                                </p>
                            </div>
                            <div className="mt-4 rounded-2xl bg-slate-700/50 p-4">
                                <div className="mb-2 flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-600 text-sm font-bold">
                                       م                                    </div>
                                    <h6 className="text-sm font-bold">محمد سعيد</h6>
                                </div>
                                <p className="text-sm text-slate-300">
                                   أعتقد أن المشكلة في انسداد المصارف عدم الوعي العام والقاء القمامة فيها مما يؤدي للانسداد الناتج
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default CommunitySection;