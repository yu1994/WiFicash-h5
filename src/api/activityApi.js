import request from '@/utils/request'

export function activityApi(data, signMsg) {
  return request({
    url: '/api/prize/startPrize.htm',
    headers: {
      signMsg
    },
    method: 'post',
    params:data
  })
}
