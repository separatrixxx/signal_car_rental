import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import { HeaderLink } from '../HeaderLink/HeaderLink';
import { useRouter } from 'next/router';
import { setLocale } from '../../../helpers/locale.helper';
import { LocaleChange } from '../../Common/LocaleChange/LocaleChange';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useScrollY } from '../../../hooks/useScrollY';
import Logo from './logo.svg';
import Link from 'next/link';


export const Header = ({ isStart, setActive }: HeaderProps): JSX.Element => {
    const router = useRouter();
    
    const [lastScroll, setLastScroll] = useState<number>(0);
    const [flag, setFlag] = useState<boolean>(false);

    const scrollPosition = useScrollY();

    if (scrollPosition - lastScroll >= 200 && scrollPosition > lastScroll) {
        setFlag(true);
        setLastScroll(scrollPosition);
    } else if (scrollPosition < lastScroll) {
        setFlag(false);
        setLastScroll(scrollPosition);
    }

    const variants = {
        visible: {
            transform: 'translate(0%, 0%)',
        },
        hidden: {
            transform: 'translate(0%, -100%)',
        }
    };

    useEffect(() => {
        const headerElement = document.querySelector(`.${styles.header}`);
        const initialPosition = (headerElement?.getBoundingClientRect().top || 0) + window.scrollY;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            if (headerElement && isStart) {
                if (scrollPosition > initialPosition && !headerElement.classList.contains(styles.fixed)) {
                    headerElement.classList.add(styles.fixed);
                } else if (scrollPosition <= initialPosition && headerElement.classList.contains(styles.fixed)) {
                    headerElement.classList.remove(styles.fixed);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isStart]);
    
	return (
        <motion.header className={styles.header}
            variants={variants}
            initial={flag ? 'hidden' : 'visible'}
            transition={{ duration: 0.3 }}
            animate={flag ? 'hidden' : 'visible'}>
            <div className={styles.linksDiv}>
                <Link href="/" aria-label="logo" className={styles.logo}>
                    <Logo />
                </Link>
                <HeaderLink text={setLocale(router.locale).about}  link="/about" />
                <HeaderLink text={setLocale(router.locale).contacts}  link="/contacts" />
            </div>
            <LocaleChange setActive={setActive} />
        </motion.header>
    );
};