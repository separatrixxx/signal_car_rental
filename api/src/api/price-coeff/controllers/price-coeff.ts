/**
 * price-coeff controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::price-coeff.price-coeff', ({ strapi }) =>  ({
    async find(ctx) {
        const { data } = await super.find(ctx);

        const newData = data.map(entity => {
            return {
                coeff1: entity.attributes.coeff1,
                coeff2: entity.attributes.coeff2,
                coeff3: entity.attributes.coeff3,
            }
        });

        return newData;
    },

    async findOne(ctx) {
        const { data } = await super.findOne(ctx);

        const newData = {
            coeff1: data.attributes.coeff1,
            coeff2: data.attributes.coeff2,
            coeff3: data.attributes.coeff3,
        };

        return newData;
    },
}));
