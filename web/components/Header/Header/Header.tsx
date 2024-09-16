import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import { HeaderLink } from '../HeaderLink/HeaderLink';
import { useRouter } from 'next/router';
import { setLocale } from '../../../helpers/locale.helper';
import { LocaleChange } from '../../Common/LocaleChange/LocaleChange';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useScrollY } from '../../../hooks/useScrollY';
import Logo from './logo.svg';
import Link from 'next/link';
import { useResizeW } from '../../../hooks/useResize';
import { BurgerMenu } from '../BurgerMenu/BurgenMenu';


export const Header = ({ isStart, setActiveLocale, setActiveCurrency }: HeaderProps): JSX.Element => {
    const router = useRouter();

    const [lastScroll, setLastScroll] = useState<number>(0);
    const [flag, setFlag] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const width = useResizeW();

    const headerRef = useRef<HTMLDivElement | null>(null);

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

    const variantsHeader = {
        visible: {
            padding: '15px 0 10px 0',
            height: 'fit-content',
            opacity: 1,
            transition: {
                duration: 0.3,
            }
        },
        hidden: {
            padding: 0,
            height: 0,
            opacity: 0,
            transition: {
                duration: 0.3,
            }
        }
    };

    if (width > 1024) {
        variantsHeader.visible.transition.duration = 0;
        variantsHeader.hidden.transition.duration = 0;
    }

    useEffect(() => {
        const headerElement = document.querySelector(`.${styles.header}`);
        const initialPosition = (headerElement?.getBoundingClientRect().top || 0) + window.scrollY;

        const handleScroll = () => {
            setOpen(false);
            const scrollPosition = window.scrollY;

            if (headerElement && isStart) {
                if (scrollPosition > initialPosition && !headerElement.classList.contains(styles.fixed)) {
                    headerElement.classList.add(styles.fixed);
                } else if (scrollPosition <= initialPosition && headerElement.classList.contains(styles.fixed)) {
                    headerElement.classList.remove(styles.fixed);
                }
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isStart]);

    return (
        <motion.header className={styles.header}
            variants={variants}
            initial={flag ? 'hidden' : 'visible'}
            transition={{ duration: 0.3 }}
            animate={flag ? 'hidden' : 'visible'}>
            <Link href="/" aria-label="logo" className={styles.logo}>
                <Logo />
            </Link>
            <motion.div className={styles.linksDiv}
                variants={variantsHeader}
                initial={open || width > 1024 ? 'visible' : 'hidden'}
                animate={open || width > 1024 ? 'visible' : 'hidden'}
                style={width > 1024 ? { gridTemplateColumns: 'repeat(4, auto)' } : { gridTemplateRows: 'repeat(4, auto)' }}>
                <HeaderLink text={setLocale(router.locale).about} link="/about" />
                <HeaderLink text={setLocale(router.locale).contacts} link="/contacts" />
                <HeaderLink text={setLocale(router.locale).media} link="/media" />
                <div className={styles.buttonsDiv}>
                    <LocaleChange isCurrency={true} setActiveLocale={setActiveLocale} setActiveCurrency={setActiveCurrency} />
                    <LocaleChange isCurrency={false} setActiveLocale={setActiveLocale} setActiveCurrency={setActiveCurrency} />
                </div>
            </motion.div>
            <BurgerMenu open={open} setOpen={setOpen} />
        </motion.header>
    );
};