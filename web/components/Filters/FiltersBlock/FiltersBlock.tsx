import { FiltersBlockProps } from './FiltersBlock.props';
import styles from './FiltersBlock.module.css';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useScrollY } from '../../../hooks/useScrollY';


export const FiltersBlock = ({ children }: FiltersBlockProps): JSX.Element => {
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

	return (
        <motion.div className={styles.filtersBlock}
            variants={variants}
            initial={flag ? 'hidden' : 'visible'}
            transition={{ duration: 0.5 }}
            animate={flag ? 'hidden' : 'visible'}>
            {children}
        </motion.div>
    );
};
