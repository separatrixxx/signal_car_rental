import { SlideProps } from './Slide.props';
import styles from './Slide.module.css';
import Image from 'next/image';


export const Slide = ({ image, alt }: SlideProps): JSX.Element => {
	return (
		<div className={styles.imageBlock}>
			<Image className={styles.img} draggable='false'
				loader={() => process.env.NEXT_PUBLIC_DOMAIN + image}
				src={process.env.NEXT_PUBLIC_DOMAIN + image}
				alt={alt}
				width={1}
				height={1}
				priority={true}
				unoptimized={true}
			/>
		</div>
	);
};