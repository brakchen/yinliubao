import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:wrench',
      order: -1,
      title: $t('page.feature.title'),
    },
    name: 'Tools',
    path: '/',
    children: [
      {
        name: 'ShortLink',
        path: '/shortLink',
        component: () => import('#/views/tools/shortlink/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('page.feature.shortLink'),
        },
      },
    ],
  },
];

export default routes;
