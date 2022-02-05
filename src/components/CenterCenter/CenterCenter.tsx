import React from "react";
import styles from './CenterCenter.module.css';

interface ICenterCenterProps {
  isColumn?: boolean;
}

const CenterCenter: React.FC<ICenterCenterProps> = ({children, isColumn}) => {
  return (
    <div className={`${styles.centerCenter} ${isColumn && styles.column}`}>
      {children}
    </div>
  );
};

export default CenterCenter;
