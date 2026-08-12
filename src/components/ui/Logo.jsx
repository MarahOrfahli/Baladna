import Image from "./Image";
import LogoBaladna from '../../assets/images/Logo.png'

const Logo = () => {
  return (
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <div>
        <div className="font-black text-2xl text-slate-900 tracking-tight">
          <Image url={LogoBaladna} classes={`h-10`}/>
        </div>
        <p className="text-[8px] font-bold text-slate-400 -mt-1 hidden sm:block">
          الجسر الرقمي لمدينتك
        </p>
      </div>
    </div>
  );
};

export default Logo;
