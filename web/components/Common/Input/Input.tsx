import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';


export const Input = ({ type, text, value, minDate, error, isSearch, onChange }: InputProps): JSX.Element => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
	return <input className={cn(styles.input, {
        [styles.error_input]: error,
        [styles.search]: isSearch,
    })}
        placeholder={text}
        value={value.length === 0 && type === 'date'
            ? `${year}-${month}-${day}T${hours}:${minutes}`
            : value}
        onChange={onChange}
        type={type === 'text' ? 'text' : type === 'date' ? 'datetime-local' : 'phone'}
        name={type}
        aria-label={type}
        min={minDate} />;
};