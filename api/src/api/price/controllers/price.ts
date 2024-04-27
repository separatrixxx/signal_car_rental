import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::price.price', ({ strapi }) =>  ({
    async find(ctx) {
        const { data } = await super.find(ctx);

        const newData = data.map(entity => {
            return {
                price: entity.attributes.price,
                start_location: entity.attributes.start_location.data.attributes.location_code,
                finish_location: entity.attributes.finish_location.data.attributes.location_code,
            }
        })

        return { data: newData };
    },

    async findOne(ctx) {
        ctx.query.populate = ['start_location', 'finish_location'];

        const { data } = await super.findOne(ctx);

        const newData = {
            price: data.attributes.price,
            start_location: data.attributes.start_location.data.attributes.location_code,
            finish_location: data.attributes.finish_location.data.attributes.location_code,
        };

        return { data: newData };
    },
}));
