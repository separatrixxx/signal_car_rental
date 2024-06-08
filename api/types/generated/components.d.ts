import type { Schema, Attribute } from '@strapi/strapi';

export interface PricePrice extends Schema.Component {
  collectionName: 'components_price_prices';
  info: {
    displayName: 'Price';
    icon: 'car';
  };
  attributes: {
    price1: Attribute.Float & Attribute.Required;
    price2: Attribute.Float & Attribute.Required;
    price3: Attribute.Float & Attribute.Required;
    price4: Attribute.Float & Attribute.Required;
    price5: Attribute.Float & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'price.price': PricePrice;
    }
  }
}
