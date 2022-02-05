import React from "react";
import styles from './ContentFlex.module.css';

const ContentFlex: React.FC = ({children}) => {
  return (
    <div className={styles.contentFlex}>
      {children}
    </div>
  );
};

export default ContentFlex;
