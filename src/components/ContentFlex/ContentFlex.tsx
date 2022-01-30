import React from "react";
import styles from './ContentFlex.module.css';

type Props = {}

const ContentFlex: React.FC<Props> = ({children}) => {
  return (
    <div className={styles.contentFlex}>
      {children}
    </div>
  );
};

export default ContentFlex;
