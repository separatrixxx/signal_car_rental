import { InputProps } from './Input.props';
import styles from './Input.module.css';
import { getDateInput } from '../../../helpers/date.helper';
import cn from 'classnames';


export const Input = ({ type, text, value, minDate, error, isSearch, isActive, onChange }: InputProps): JSX.Element => {
    function handleFocus(e: any) {
        if ((type === 'date') && e.target.value === '') {
            e.target.type = 'date';
        }

        if ((type === 'time') && e.target.value === '') {
            e.target.type = 'time';
        }
    }

    function handleBlur(e: any) {
        if ((type === 'date' || type === 'time') && e.target.value === '') {
            e.target.type = 'text';
        }
    }
    
	if (type !== 'date' && type !== 'time' && type !== 'location') {
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
    } else if (type !== 'location') {
        return (
            <div className={cn(styles.input, styles.inputDiv, {
                [styles.error_input]: error,
            })}>
                <input className={cn(styles.input, styles.inputDate)}
                    placeholder={text}
                    value={value}
                    onChange={onChange}
                    type="date" 
                    name={type}
                    aria-label={type}
                    min={minDate}
                    // onFocus={handleFocus} 
                    // onBlur={handleBlur}
                />
            </div>
        );
    } else {
        return (
            <div className={cn(styles.input, styles.inputDiv, styles.locationInput, {
                [styles.error_input]: error,
                [styles.activeInput]: isActive,
            })} onClick={() => onChange(true)}>
                {text}
            </div>
        );
    }
};