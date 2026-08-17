import { GridShape, Logo } from "../../../components/common";

const SplashScreen = () => {
  return (
    <div className="relative flex items-center justify-center z-1">
      {/* <!-- ===== Common Grid Shape Start ===== --> */}
      <GridShape />
      <div className="flex flex-col items-center max-w-md">
        <Logo without preventClicking imgSize="h-20" />
        <p className="text-center text-gray-400 dark:text-white/60">
          Free and Open-Source Tailwind CSS Admin Dashboard Template
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
