import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::location.location', ({ strapi }) =>  ({
    async find(ctx) {
        const { data } = await super.find(ctx);

        const newData = data.map(entity => {
            return {
                location_code: entity.attributes.location_code,
                location: entity.attributes.location,
                location_ru: entity.attributes.location_ru,
                location_ge: entity.attributes.location_ge,
            }
        })

        return { data: newData };
    },

    async findOne(ctx) {
        ctx.query.populate = ['images'];

        const { data } = await super.findOne(ctx);

        const newData = {
            location_code: data.attributes.location_code,
            location: data.attributes.location,
            location_ru: data.attributes.location_ru,
            location_ge: data.attributes.location_ge,
        };

        return { data: newData };
    },
}));

