import request from '@/utils/request'

export function gameInfoApi(data, signMsg) {
  return request({
    url: '/api/game/getGameInfo.htm',
    headers: {
      signMsg
    },
    method: 'post',
    params: data
  })
}
export function gameSuccessApi(data, signMsg) { // 通关成功后
  return request({
    url: '/api/game/exchangeCoupon.htm',
    headers: {
      signMsg
    },
    method: 'post',
    params: data
  })
}

export function updateGameNumberApi(data, signMsg) {
  return request({
    url: '/api/game/updateGameNumber.htm',
    headers: {
      signMsg
    },
    method: 'post',
    params: data
  })
}
export function exchangeCouponApi(data, signMsg) { // 兑换游戏次数
  return request({
    url: '/api/game/exchangeTimes.htm',
    headers: {
      signMsg
    },
    method: 'post',
    params: data
  })
}
