import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';


export const Input = ({ type, text, value, minDate, error, isSearch, onChange }: InputProps): JSX.Element => {
	return <input className={cn(styles.input, {
        [styles.error_input]: error,
        [styles.search]: isSearch,
    })}
        placeholder={text}
        value={value}
        onChange={onChange}
        type={type === 'text' ? 'text' : type === 'date' ? 'datetime' : 'phone'}
        name={type}
        aria-label={type}
        min={minDate} />;
};