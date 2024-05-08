import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::rented-car.rented-car', ({ strapi }) =>  ({
    async find(ctx) {
        const { data } = await super.find(ctx);

        const newData = data.map(entity => {
            return {
                car_id: entity.attributes.car.data.id,
                start_date: entity.attributes.startDate,
                finish_date: entity.attributes.finishDate,
                status: entity.attributes.status,
            }
        })

        return { data: newData };
    },

    async findOne(ctx) {
        ctx.query.populate = ['car'];

        const { data } = await super.findOne(ctx);

        const newData = {
            car_id: data.attributes.car.data.id,
            start_date: data.attributes.startDate,
            finish_date: data.attributes.finishDate,
            status: data.attributes.status,
    };

        return { data: newData };
    },
}));

