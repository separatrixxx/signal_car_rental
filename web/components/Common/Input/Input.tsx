import { InputProps } from './Input.props';
import styles from './Input.module.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import cn from 'classnames';


export const Input = ({ type, text, value, minDate, error, isSearch, onChange }: InputProps): JSX.Element => {
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = (date: any) => {
        setStartDate(date);
        onChange(date);
    };

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
            <DatePicker className={cn(styles.input, styles.datePicker)}
                selected={startDate}
                onChange={handleChange}
                customInput={<input />}
            />
        );
    }
};