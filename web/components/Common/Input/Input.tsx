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

    function handleFocus(e: any) {
        if (type === 'date' && e.target.value === '') {
            e.target.type = 'datetime-local';
            e.target.value = `${year}-${month}-${day}T${hours}:${minutes}`;
        }
    }

    function handleBlur(e: any) {
        if (type === 'date' && e.target.value === '') {
            e.target.type = 'text';
        }
    }
    
	if (type !== 'date') {
        return <input className={cn(styles.input, {
            [styles.error_input]: error,
            [styles.search]: isSearch,
        })}
            placeholder={text}
            value={value}
            onChange={onChange}
            type={type === 'text' ? 'text' : 'phone'}
            name={type}
            aria-label={type}
            min={minDate} />;
    } else {
        return (
            <div className={cn(styles.input, styles.inputDiv, {
                [styles.error_input]: error,
            })}>
                <input className={cn(styles.input, styles.inputDate)}
                    placeholder={text}
                    value={value}
                    onChange={onChange}
                    type="text" 
                    name={type}
                    aria-label={type}
                    min={minDate}
                    onFocus={handleFocus} 
                    onBlur={handleBlur} />
            </div>
        );
    }
};