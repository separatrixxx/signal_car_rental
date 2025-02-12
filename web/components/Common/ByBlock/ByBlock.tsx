import { ByBlockProps } from './ByBlock.props';
import styles from './ByBlock.module.css';
import { Htag } from '../Htag/Htag';
import cn from 'classnames';


export const ByBlock = ({ color }: ByBlockProps): JSX.Element => {   
    return (
        <div className={styles.byBlock}>
            <a target='_blank' rel="noreferrer" href='http://t.me/separatrix' aria-label="by separatrix">
                <Htag tag='s' className={cn(styles.bySeparatrix, {
                    [styles.darkColor]: color === 'dark',
                })}>
                    by 🍌 codes
                </Htag>
            </a>
        </div>
    );
};
