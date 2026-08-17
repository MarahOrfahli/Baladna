import {Image} from "./Image";
import LogoBaladna from '../../../../public/Logo.png'
import { useTranslation } from "react-i18next";

export const Logo = ({preventClicking = false , without = false, imgSize="h-10"}) => {
  const {t} = useTranslation()
  function action(){
    !preventClicking ?  window.scrollTo({ top: 0, behavior: "smooth" }) : ''
  }
  return (
    <div
      className={`flex items-center gap-3 ${ !preventClicking ? 'cursor-pointer' : '' }`}
      onClick={() => action()}
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
