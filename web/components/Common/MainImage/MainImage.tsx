import styles from './MainImage.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Htag } from '../Htag/Htag';
import { setLocale } from '../../../helpers/locale.helper';


export const MainImage = (): JSX.Element => {
    const router = useRouter();

    return (
        <div className={styles.imageBlock}>
			<div className={styles.mainImgDiv}>
				<Htag tag='xxxl' className={styles.mainImgText}>
					{setLocale(router.locale).signal_car}
				</Htag>
				<Htag tag='xl'>
					{setLocale(router.locale).order_a_car}
				</Htag>
			</div>
			<Image className={styles.img} draggable='false'
				loader={() => '/mainImg.webp'}
				src='/mainImg.webp'
				alt='main img'
				width={1}
				height={1}
				priority={true}
				unoptimized={true}
			/>
		</div>
    );
};
