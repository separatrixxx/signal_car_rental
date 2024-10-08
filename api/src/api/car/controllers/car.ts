import { factories } from '@strapi/strapi'


export default factories.createCoreController('api::car.car', ({ strapi }) =>  ({
    async find(ctx) {
        ctx.query.populate = ['images', 'location', 'price'];

        const { data } = await super.find(ctx);

        const newData = data.map(entity => {
            return {
                id: entity.id,
                name: entity.attributes.name,
                description: entity.attributes.description,
                description_ru: entity.attributes.description_ru,
                description_ge: entity.attributes.description_ge,
                description_pl: entity.attributes.description_pl,
                description_he: entity.attributes.description_he,
                counter: entity.attributes.counter,
                class: entity.attributes.class,
                engine_type: entity.attributes.engine_type,
                engine_capacity: entity.attributes.engine_capacity,
                engine_power: entity.attributes.engine_power,
                transmission: entity.attributes.transmission,
                drive_unit: entity.attributes.drive_unit,
                hit: entity.attributes.hit,
                location: {
                    location_code: entity.attributes.location.data.attributes.location_code,
                    location: entity.attributes.location.data.attributes.location,
                    location_ru: entity.attributes.location.data.attributes.location_ru,
                    location_ge: entity.attributes.location.data.attributes.location_ge,
                },
                images: entity.attributes.images.data.map(img => ({
                    id: img.id,
                    alternativeText: img.attributes.alternativeText,
                    url: img.attributes.url,
                })),
                price: {
                    price1: entity.attributes.price.price1,
                    price2: entity.attributes.price.price2,
                    price3: entity.attributes.price.price3,
                    price4: entity.attributes.price.price4,
                    price5: entity.attributes.price.price5,
                },
            }
        });

        return { data: newData };
    },

    async findOne(ctx) {
        ctx.query.populate = ['images', 'location', 'price'];

        const { data } = await super.findOne(ctx);

        const newData = {
            id: data.id,
            name: data.attributes.name,
            description: data.attributes.description,
            description_ru: data.attributes.description_ru,
            description_ge: data.attributes.description_ge,
            description_pl: data.attributes.description_pl,
            description_he: data.attributes.description_he,
            counter: data.attributes.counter,
            class: data.attributes.class,
            engine_type: data.attributes.engine_type,
            engine_capacity: data.attributes.engine_capacity,
            engine_power: data.attributes.engine_power,
            transmission: data.attributes.transmission,
            drive_unit: data.attributes.drive_unit,
            hit: data.attributes.hit,
            location: {
                location_code: data.attributes.location.data.attributes.location_code,
                location: data.attributes.location.data.attributes.location,
                location_ru: data.attributes.location.data.attributes.location_ru,
                location_ge: data.attributes.location.data.attributes.location_ge,
            },
            images: data.attributes.images.data.map(img => ({
                id: img.id,
                alternativeText: img.attributes.alternativeText,
                url: img.attributes.url,
            })),
            price: {
                price1: data.attributes.price.price1,
                price2: data.attributes.price.price2,
                price3: data.attributes.price.price3,
                price4: data.attributes.price.price4,
                price5: data.attributes.price.price5,
            },
        };

        return { data: newData };
    },
}));
