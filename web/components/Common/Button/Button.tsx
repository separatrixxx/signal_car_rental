import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import { LoadingDots } from '../LoadingDots/LoadingDots';
import cn from 'classnames';


export const Button = ({ text, isActive, isLoading, className, onClick }: ButtonProps): JSX.Element => {
	if (!isLoading) {
        return <button className={cn(className, styles.button, {
            [styles.notActive]: !isActive,
        })} onClick={isActive ? onClick : () => {}}>
            {text}
        </button>
    } else {
        return <button className={cn(styles.button, styles.button_loading)} onClick={onClick}>
            <LoadingDots />
        </button>
    }
};