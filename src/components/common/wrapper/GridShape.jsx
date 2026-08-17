import {Image} from "./Image";
import gridIMG from '../../../assets/grid-01.svg'

export const GridShape = ()=> {
  const imgClass = `absolute -z-1 w-full max-w-62.5 xl:max-w-112.5`
  return (
    <>
      <div className={`right-10 top-0 ` + imgClass}>
        <Image url={gridIMG}/>
      </div>
      <div className={`bottom-0 left-13 rotate-180 ` + imgClass}>
        <Image url={gridIMG}/>
      </div>
    </>
  );
}
