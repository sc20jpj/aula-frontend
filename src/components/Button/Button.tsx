import styles from '@components/Button/Button.module.scss'; // Importing default styles

interface ButtonProps {
  title: string;
  onClick: () => void;
  className?: string; // Making className optional
}

function Button(props: ButtonProps) {
  const { title, onClick, className } = props;
  const buttonClass = className ? className : styles.button; // Using provided className if available, otherwise using default style

  return (
    <button onClick={onClick} className={buttonClass}>
      {title}
    </button>
  );
}

export default Button;
