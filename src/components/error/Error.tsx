import styles from './error.module.scss';

interface ErrorProps {
  message: string;
  customClass?: string;
}

const Error: React.FC<ErrorProps> = ({ message, customClass }) => {
  return <p className={` ${customClass} ${styles.error}`}>{message}</p>;
};

export default Error;
