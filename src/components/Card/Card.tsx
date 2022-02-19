import React from "react";

type Props = {
  title: string;
  className?: string;
};

const Card: React.FC<Props> = (props) => {
  const { title, children, className } = props;

  return (
    <div className={`m-4 p-4 shadow-lg border border-gray-100 ${className}`}>
      <p className='text-2xl font-medium mb-3 vt323'>{title}</p>
      {children}
    </div>
  );
};

export default Card;
