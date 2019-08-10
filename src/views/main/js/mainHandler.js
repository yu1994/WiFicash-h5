import FastClick from 'fastclick'
import Toast from '@/components/toast'
import Spinner from '@/components/spinner'
import Dialog from '@/components/dialog'
import AsyncValidator from 'async-validator'
import { sendOTPApi, h5RegisterApi } from '@/api/register.js'
import { phoneRules, rules } from "../../../utils/mainValidate";
import { getRequest, md5PasswordEncrypt } from "../../../utils";

const [toast, spinner] = [new Toast(), new Spinner()];
window.onload = function () {
  FastClick.attach(document.body);
  const [phone, otp, sendOTP, password, register] = [
    document.querySelector('#phone'),
    document.querySelector('#otp'),
    document.querySelector('#sendOTP'),
    document.querySelector('#password'),
    document.querySelector('#register')
  ];
  const noteParams = {
    channelId: 3,
    type: 'register'
  };
  const registerParams = {
    channelId: 3,
    client: 'H5',
    invitationCode: '',
    phone: '',
    vcode: '',// 短信验证码
    loginPwd: ''
  };
  toast.mount(document.querySelector('#toast'));
  spinner.mount(document.querySelector('#spinner'));
  //spinner.show()
  const validator = new AsyncValidator(phoneRules);
  function noteControl() {
    let time = null, step = 60;
    time = setInterval(function () {
      step--;
      sendOTP.innerHTML = '('+step +'s) send';
      if (step <= 0){
        sendOTP.removeAttribute('disabled');
        sendOTP.innerHTML = 'OTP';
        clearInterval(time);
        time = null;
      }
    },1000)
  }
  sendOTP.addEventListener('click', function () { /* 获取验证码 */
    validator.validate({phone: phone.value}, (errors, fields) => {
      if (!errors) {
        const otpPar = Object.assign({},{phone: phone.value},noteParams);
        spinner.show();
        sendOTPApi(otpPar).then( res=> {
          sendOTP.setAttribute('disabled', 'true');
          spinner.close();
          noteControl();
        }).catch( () =>{
          spinner.close();
        })
      } else {
        toast.toggle(errors[0].message);
      }
    });
  }, false);
  register.addEventListener('click', function () { /* 注册 */
    registerParams.phone = phone.value;
    registerParams.vcode = otp.value;
    registerParams.loginPwd = password.value;
    new AsyncValidator(rules).validate(registerParams, (errors, fields) => {
      if (!errors) {
        registerParams.invitationCode = getRequest().invitationCode;
        registerParams.loginPwd = md5PasswordEncrypt(registerParams.loginPwd,registerParams);
        h5RegisterApi(registerParams).then( res => {
          const dialog = new Dialog();
          dialog.mount(document.querySelector('#goPlay'));
        })
      } else {
        toast.toggle(errors[0].message)
      }
    });
  }, false)
};
