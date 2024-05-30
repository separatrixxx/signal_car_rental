import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::car.car', ({ strapi }) =>  ({
    async find(ctx) {
        const { data } = await super.find(ctx);

        const newData = data.map(entity => {
            return {
                id: entity.id,
                name: entity.attributes.name,
                description: entity.attributes.description,
                description_ru: entity.attributes.description_ru,
                description_ge: entity.attributes.description_ge,
                price: entity.attributes.price,
                counter: entity.attributes.counter,
                class: entity.attributes.class,
                engine_type: entity.attributes.engine_type,
                engine_capacity: entity.attributes.engine_capacity,
                engine_power: entity.attributes.engine_power,
                mileage: entity.attributes.mileage,
                transmission: entity.attributes.transmission,
                drive_unit: entity.attributes.drive_unit,
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
            }
        });

        return { data: newData };
    },

    async findOne(ctx) {
        ctx.query.populate = ['images', 'location'];

        const { data } = await super.findOne(ctx);

        const newData = {
            id: data.id,
            name: data.attributes.name,
            description: data.attributes.description,
            description_ru: data.attributes.description_ru,
            description_ge: data.attributes.description_ge,
            price: data.attributes.price,
            counter: data.attributes.counter,
            class: data.attributes.class,
            engine_type: data.attributes.engine_type,
            engine_capacity: data.attributes.engine_capacity,
            engine_power: data.attributes.engine_power,
            mileage: data.attributes.mileage,
            transmission: data.attributes.transmission,
            drive_unit: data.attributes.drive_unit,
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
        };

        return { data: newData };
    },
}));
