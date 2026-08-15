import Image from "./Image";
import LogoBaladna from '../../assets/images/Logo.png'
import { useTranslation } from "react-i18next";

const Logo = ({ without = false, imgSize="h-10"}) => {
  const {t} = useTranslation()
  return (
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <div>
        <div className={`font-black text-2xl text-slate-900 tracking-tight`}>
          <Image url={LogoBaladna} classes={imgSize}/>
        </div>
        {!without && <p className="text-[12px] font-bold text-slate-400 -mt-3 hidden sm:block italic">{ t('logo_title') }</p>}
      </div>
    </div>
  );
};

export default Logo;
