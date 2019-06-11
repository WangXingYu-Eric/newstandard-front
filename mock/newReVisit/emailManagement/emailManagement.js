import Mock from 'mockjs'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    fbserviceno: /^11001023[0-9]\d{5}/,
    appno: /^11001023[0-9]\d{5}/,
    policyno: /^8611001023[0-9]\d{5}/,
    'mailstatus|1': ['需发信函', '已发信函', '已收信函', '邮寄信函', '上门信函', '信函件返回'],
    'enddepartment|1': ['营业部', '经代部'],
    'fbnowstatus|1': ['已回访', '未回访', '已预约'],
    'calltype|1': ['电话回访', '线上回访'],
    agentname: '@cname',
    agentcode: /^23023[1-9]\d{5}/,
    'salesorg|1': ['淘宝', '京东', '苏宁'],
    'riskname|1': ['弘康多倍保', '健康一生医疗保险A款', '弘康弘利相传', '常乐泰保险', '智能大白定售'],
    'lastcallres|1': ['完成', '未完成'],
    count: /^[1-9]\d{1}/,
    userno: /^[1-9]\d{3}/,
    mailsenddate: '@dateTime(\'yyyy-MM-dd HH:mm:ss\')',
    lastprobtime: '@dateTime(\'yyyy-MM-dd HH:mm:ss\')',
    lastprobreply: '@ctitle',
    'corpcode|1': ['北京分公司', '江苏分公司', '河南分公司']
  }))
}

export default [
  {
    url: '/emailManagement/list',
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
  },
  {
    url: '/emailManagement/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/emailManagement/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]