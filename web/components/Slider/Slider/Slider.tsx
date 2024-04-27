import { SliderProps } from './Slider.props';
import styles from './Slider.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Slide } from '../Slide/Slide';
import { useResizeW } from '../../../hooks/useResize';


export const Slider = ({ images }: SliderProps): JSX.Element => {
    return (
        <Swiper className={styles.slider}
            modules={[Pagination, A11y, Autoplay]}
            slidesPerView={1}
            loop={images.length > 1 ? true : false}
            spaceBetween={10}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
        >
            {
                images.map(img => (
                    <SwiperSlide key={img.id}>
                        <Slide image={img.url} alt={img.alternativeText} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};