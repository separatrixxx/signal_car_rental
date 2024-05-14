import { InputProps } from './Input.props';
import styles from './Input.module.css';
import { getDateInput } from '../../../helpers/date.helper';
import cn from 'classnames';


export const Input = ({ type, text, value, minDate, error, isSearch, isActive, onChange }: InputProps): JSX.Element => {    
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
                    value={value === '' ? getDateInput(type) : value}
                    onChange={onChange}
                    type={type} 
                    name={type}
                    aria-label={type}
                    min={minDate}
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