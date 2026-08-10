const ImgCard = ({ border_color, img, animation, imageCard_style, img_style }) => {
  return (
    <div className={`bg-${ border_color} p-1 rounded-3xl opacity-0 shadow-xl border border-slate-100 ${animation} ${imageCard_style}`}>
      <div className={`relative ${img} bg-cover bg-center ${img_style} rounded-2xl overflow-hidden h-full w-full flex items-center justify-center`}></div>
    </div>
  );
};

export default ImgCard;
