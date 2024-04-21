import styles from '@components/Button/Button.module.scss'; // Importing default styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faSpinner } from '@fortawesome/free-solid-svg-icons';


interface ButtonProps {
  title: string;
  onClick: () => void;
  className?: string; // Making className optional
  icon?: IconProps
  iconName?: string
}

function Button(props: ButtonProps) {
  const { title, onClick,icon, iconName,className } = props;
  const buttonClass = className ? className : styles.button; // Using provided className if available, otherwise using default style

  return (

    iconName ? (
      icon  && (
        <FontAwesomeIcon icon={icon.icon} className={className} onClick={onClick} />
      )
    ) : (
      <button onClick={onClick} className={buttonClass}>
          {title}
       </button>
    )

    
  );
}

export default Button;
