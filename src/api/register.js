import request from '@/utils/request'

export function sendOTPApi(data) {
  return request({
    //url: '/api/user/sendSms.htm',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    url: '/api/user/h5SendSms.htm',
    method: 'post',
    params:data
  })
}
export function h5RegisterApi(data) {
  return request({
    url: '/api/user/h5Register.htm',
    method: 'post',
    params:data
  })
}
