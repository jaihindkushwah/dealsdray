import React from "react";

interface PageTitleProps {
  title: string;
  children?: React.ReactNode;
}
function PageTitle({ title, children }: PageTitleProps) {
  return (
    <div className="w-full flex p-1 bg-yellow-400/75">
      <span className="text-base font-medium ">
        {title}
        {children}
      </span>
    </div>
  );
}

export default PageTitle;
