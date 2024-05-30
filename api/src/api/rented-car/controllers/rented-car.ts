import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::rented-car.rented-car', ({ strapi }) =>  ({
    async find(ctx) {
        const { data } = await super.find(ctx);

        const newData = data.map(entity => {
            const carData = entity.attributes.car && entity.attributes.car.data ? entity.attributes.car.data.id : null;
            return {
                car_id: carData,
                start_date: entity.attributes.startDate,
                finish_date: entity.attributes.finishDate,
                status: entity.attributes.status,
            }
        });

        return { data: newData };
    },

    async findOne(ctx) {
        ctx.query.populate = ['car'];

        const { data } = await super.findOne(ctx);

        const carData = data.attributes.car && data.attributes.car.data ? data.attributes.car.data.id : null;
        const newData = {
            car_id: carData,
            start_date: data.attributes.startDate,
            finish_date: data.attributes.finishDate,
            status: data.attributes.status,
        };

        return { data: newData };
    },
}));

