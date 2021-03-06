import Mock from 'mockjs'

const List = []
const count = 10

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'prov|1': ['北京市', '天津市', '河北省', '河南省', '山东省'],
    'city|1': ['朝阳区', '保定市', '塘沽', '郑州市', '济南'],
    name: '@cname()',
    'group|1': ['信用卡单位', '教育机构'],
    id: '@increment',
    callInNo: /^1[385][1-9]\d{8}/,
    setId: /^1[029][1-5]\d{8}/,
    setName: '@cname()',
    'rate|1': ['20%', '70%', '80%'],
    mark: '@integer(30,100)',
    'status|1': ['是', '否'],
    date: '@date(\'yyyy-MM-dd\')',
    num: '@integer(2,10)',
    time: '@time(\'HH:mm:ss\')',
    timer_clock: '00:00:09'
  }))
}

export default [
  {
    url: '/chart17/list',
    type: 'get',
    response: config => {
      const { name, idNo, page = 1, limit = 20, sort } = config.query
      let mockList = List.filter(item => {
        if (name && item.name !== name) return false
        if (idNo && item.idNo !== idNo) return false
        return true
      })
      if (sort === '-id') {
        mockList = mockList.reverse()
      }
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  }
]

