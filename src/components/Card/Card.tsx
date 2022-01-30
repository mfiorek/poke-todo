import React from "react";
import styles from "./Card.module.css";

type Props = {
  title: string;
};

const Card: React.FC<Props> = (props) => {
  const { title, children } = props;

  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      {children}
    </div>
  );
};

export default Card;
