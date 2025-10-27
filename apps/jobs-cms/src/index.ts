import type { Core } from '@strapi/strapi';

export default {
  register({ strapi }: { strapi: Core.Strapi }) {},

  bootstrap: async ({ strapi }: { strapi: Core.Strapi }) => {
    try {
      const existing = await strapi.entityService.count('api::job.job');
      if (existing > 0) return;

      await strapi.entityService.create('api::job.job', {
        data: {
          title: 'Frontend Developer',
          slug: 'frontend-developer',
          status: 'active',
          salary_range: {
            min: 7000000,
            max: 8000000,
            currency: 'IDR',
            display_text: 'Rp7.000.000 - Rp8.000.000',
          },
          list_card: {
            badge: 'Active',
            started_on_text: 'started on 1 Oct 2025',
            cta: 'Manage Job',
          },
          publishedAt: new Date().toISOString(),
        },
      });
    } catch (e) {
      strapi.log.error('Bootstrap seeding failed', e);
    }
  },
};
