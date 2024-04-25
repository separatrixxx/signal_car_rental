import { HeaderLinkProps } from './HeaderLink.props';
import styles from './HeaderLink.module.css';
import Link from 'next/link';
import { Htag } from '../../Common/Htag/Htag';
import cn from 'classnames';


export const HeaderLink = ({ text, link }: HeaderLinkProps): JSX.Element => {
	return (
        <Link href={link} className={styles.link}>
            <Htag tag='m'>
                {text}
            </Htag>
        </Link>
    );
};