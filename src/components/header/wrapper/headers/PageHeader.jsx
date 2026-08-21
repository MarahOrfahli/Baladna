export const PageHeader = ({title, description, badgeTitle}) => ( (title || description) &&
  <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold dark:text-white">
        {title}
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
       {description}
      </p>
    </div>
    <div className="flex items-center gap-3 text-xs ">
      { badgeTitle && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>}
      <span>{badgeTitle}</span>
    </div>
  </div>
);
