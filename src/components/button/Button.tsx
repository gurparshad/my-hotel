import {HTMLAttributes} from "react";
import styles from "./button.module.scss";
import classNames from "classnames";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClick: any;
  customClass?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<ButtonProps> = ({children, onClick, customClass, type}) => {
  const buttonClasses = classNames(styles.button, customClass);
  return (
    <button onClick={onClick} className={buttonClasses} type={type}>
      {children}
    </button>
  );
};

export default Button;
