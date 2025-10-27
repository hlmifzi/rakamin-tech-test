import type { Schema, Struct } from '@strapi/strapi';

export interface JobsListCard extends Struct.ComponentSchema {
  collectionName: 'components_jobs_list_cards';
  info: {
    description: 'List card info for job card';
    displayName: 'list_card';
  };
  attributes: {
    badge: Schema.Attribute.String;
    cta: Schema.Attribute.String;
    started_on_text: Schema.Attribute.String;
  };
}

export interface JobsSalaryRange extends Struct.ComponentSchema {
  collectionName: 'components_jobs_salary_ranges';
  info: {
    description: 'Salary range with currency and display text';
    displayName: 'salary_range';
  };
  attributes: {
    currency: Schema.Attribute.String & Schema.Attribute.DefaultTo<'IDR'>;
    display_text: Schema.Attribute.String;
    max: Schema.Attribute.Integer & Schema.Attribute.Required;
    min: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'jobs.list-card': JobsListCard;
      'jobs.salary-range': JobsSalaryRange;
    }
  }
}
