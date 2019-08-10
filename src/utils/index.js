import $md5 from 'js-md5'
export function $scrollAnimation (element, speed, sign) {
  if (typeof window.requestAnimationFrame === 'function') {
    if (location.href.indexOf(sign.slice(1, sign.length)) !== -1) {
      return false
    }
    let rect = element.getBoundingClientRect()
    // 获取元素相对窗口的top值，此处应加上窗口本身的偏移
    let top = window.pageYOffset + rect.top
    let currentTop = 0
    let requestId
    // 采用requestAnimationFrame，平滑动画
    const step = function (timestamp) {
      currentTop += speed
      if (currentTop <= top) {
        window.scrollTo({ top: currentTop,
          behavior: 'smooth' })
        requestId = window.requestAnimationFrame(step)
      } else {
        window.cancelAnimationFrame(requestId)
      }
    }
    window.requestAnimationFrame(step)
  } else {
    return false
  }
}
export function rem(pwidth = 750, prem = 100) {
  const html = document.getElementsByTagName('html')[0];
  const oWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
  if (oWidth >= 640) {
    html.style.fontSize = '150px'
  } else html.style.fontSize = oWidth / pwidth * prem + 'px'
}
export function getRequest() {
  const url = location.search
  const theRequest = new Object()
  if (url.indexOf('?') !== -1) {
    const str = url.substr(1)
    const strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return theRequest
}
export function sortEncrypt(obj) {
  let newKey = Object.keys(obj).sort();
  let newObj = {

  };
  console.log(newKey)
  for (let i = 0, len = newKey.length; i < len; i++){
    newObj[newKey[i]] = obj[newKey[i]]
  }
  let STR = '';
  for (let i in newObj){
    STR += i+'='+newObj[i]+'|'
  }
  return STR.substr(0, STR.length-1)
}
export function md5PasswordEncrypt(v,params) {
  return $md5(v.toString());
 //return $md5("oQIhAP24Kb3Bsf7IE14wpl751bQc9VAPsFZ+LdB4riBgg2TDAiEAsSomOO1v8mK2VWhEQh6mttgN"+v+sortEncrypt(params))
}
export function md5Activity(params) {
  return $md5("oQIhAP24Kb3Bsf7IE14wpl751bQc9VAPsFZ+LdB4riBgg2TDAiEAsSomOO1v8mK2VWhEQh6mttgN"+sortEncrypt(params))
}
