const Logo = () => {
    return ( 
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 bg-linear-to-tr from-sky-600 to-sky-400 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-sky-500/20">
              test
            </div>
            <div>
              <span className="font-black text-2xl text-slate-900 tracking-tight">بلدنا<span className="text-orange-500 text-3xl leading-none">.</span></span>
              <p className="text-[10px] font-bold text-slate-400 -mt-1 hidden sm:block">الجسر الرقمي لمدينتك</p>
            </div>
          </div>
     );
}
 
export default Logo;