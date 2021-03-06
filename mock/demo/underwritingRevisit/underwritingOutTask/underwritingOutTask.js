import Mock from 'mockjs'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    dateTime: '@dateTime(\'yyyy-MM-dd HH:mm:ss\')',
    num: /^110260000[0-9]\d{5}/,
    name: '@cname',
    'sex|1': ['男', '女'],
    'idCard|1': ['110101198001010037', '230101198001010093', '230101198001010130', '220101198001010091'],
    mobile: /^1[3568][0-9]\d{8}/,
    phone: /^0[1-4]\d{2}-[1-9]\d{7}/,
    'identifier|1': ['client4', 'client2', '', 'client3']
  }))
}

export default [
  {
    url: '/underwritingOutTask/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 10 } = config.query
      const pageList = List.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: List.length,
          items: pageList
        }
      }
    }
  }
]
