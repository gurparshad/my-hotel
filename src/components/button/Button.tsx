import {HTMLAttributes} from "react";
import "./button.scss";
import classNames from "classnames";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClick: any; // check this type
  customClass?: string;
  type?: "button" | "submit" | "reset" | undefined; // check this type
}

const Button: React.FC<ButtonProps> = ({children, onClick, customClass, type}) => {
  const buttonClasses = classNames("button", customClass);
  return (
    <button onClick={onClick} className={buttonClasses} type={type}>
      {children}
    </button>
  );
};

export default Button;
