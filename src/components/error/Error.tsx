import styles from "./error.module.scss";

interface ErrorProps {
  message: string;
  customClass?: string;
}

const Error: React.FC<ErrorProps> = ({message, customClass}) => {
  return <p className={`${styles.error} ${customClass}`}>{message}</p>;
};

export default Error;
