import AppMain from '@/layout/components/AppMain'

const baseRouter = {
  path: 'base',
  component: AppMain,
  redirect: '/system/base/dictionary',
  name: 'base',
  meta: {
    title: '基础配置',
    icon: 'fa fa-toggle-off'
  },
  children: [
    {
      path: 'dictionary ',
      component: () => import('@/views/system/base/dictionary'),
      name: 'dictionary',
      meta: {
        title: '数据字典',
        roles: ['admin']
      }
    },
    {
      path: 'workdays ',
      component: () => import('@/views/system/base/workdays'),
      name: 'workdays',
      meta: {
        title: '工作日设置',
        roles: ['admin']
      }
    },
    {
      path: 'querySettings ',
      component: () => import('@/views/system/base/querySettings'),
      name: 'querySettings',
      meta: {
        title: '查询条件配置',
        roles: ['admin']
      }
    }
  ]
}
export default baseRouter
