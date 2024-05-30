/**
 * company-info controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::company-info.company-info', ({ strapi }) =>  ({
    async find(ctx) {
        const { data } = await super.find(ctx);

        const newData = data.map(entity => {
            return {
                about_text: entity.attributes.about_text,
                about_text_ru: entity.attributes.about_text_ru,
                about_text_ge: entity.attributes.about_text_ge,
                phone: entity.attributes.phone,
                email: entity.attributes.email,
                address: entity.attributes.address,
                address_ru: entity.attributes.address_ru,
                address_ge: entity.attributes.address_ge,
                location: entity.attributes.location,
            }
        });

        return { data: newData };
    },

    async findOne(ctx) {
        const { data } = await super.findOne(ctx);

        const newData = {
            about_text: data.attributes.about_text,
            about_text_ru: data.attributes.about_text_ru,
            about_text_ge: data.attributes.about_text_ge,
            phone: data.attributes.phone,
            email: data.attributes.email,
            address: data.attributes.address,
            address_ru: data.attributes.address_ru,
            address_ge: data.attributes.address_ge,
            location: data.attributes.location,
        };

        return { data: newData };
    },
}));

