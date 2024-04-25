import { TextPadProps } from './TextPad.props';
import styles from './TextPad.module.css';


export const TextPad = ({ children }: TextPadProps): JSX.Element => {
    return (
        <div className={styles.textPad}>
			{children}
		</div>
    );
};
