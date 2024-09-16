import { HeaderLinkProps } from './HeaderLink.props';
import styles from './HeaderLink.module.css';
import Link from 'next/link';
import { Htag } from '../../Common/Htag/Htag';
import cn from 'classnames';


export const HeaderLink = ({ hidden, text, link }: HeaderLinkProps): JSX.Element => {
	return (
        <Link href={link} className={cn(styles.link, {
            [styles.hidden]: hidden,
        })}>
            <Htag tag='m'>
                {text}
            </Htag>
        </Link>
    );
};