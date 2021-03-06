import Layout from '@/layout'

const chartRouter =
  {
    path: '/schedule',
    component: Layout,
    redirect: '/schedule/class1',
    name: 'schedule',
    meta: {
      title: '排班管理',
      icon: 'fa fa-calendar'
    },
    children: [
      {
        path: 'class1',
        component: () => import('@/views/schedule/class1.vue'),
        name: 'scheduleClass',
        meta: {
          title: '班次管理',
          roles: ['admin']
        }
      },
      {
        path: 'group',
        component: () => import('@/views/schedule/group.vue'),
        name: 'scheduleGroup',
        meta: {
          title: '班组管理',
          roles: ['admin']
        }
      },
      {
        path: 'adjust ',
        component: () => import('@/views/schedule/adjust.vue'),
        name: 'scheduleAdjust',
        meta: {
          title: '排班调整',
          roles: ['admin']
        }
      },
      {
        path: 'timetable',
        component: () => import('@/views/schedule/timetable.vue'),
        name: 'scheduleTimetable',
        meta: {
          title: '班表管理',
          roles: ['admin']
        }
      }
    ]
  }

export default chartRouter
