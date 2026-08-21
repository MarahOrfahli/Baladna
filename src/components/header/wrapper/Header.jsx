const AppHeader = ({ isAdmin = false, children }) => {
  return (
    <header
      className={`sticky top-0 flex w-full bg-white border-gray-200 ${ isAdmin ? 'z-50' : 'z-999999' } dark:border-gray-800 dark:bg-gray-900 lg:border-b`}
    >
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        {isAdmin && children}
        {!isAdmin && (
          <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:border-b-0 lg:px-0 lg:py-4">
            {children}
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
