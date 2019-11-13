function validatePhone(rule, value, callback) {
  if (!/^[0-9]{10}$/.test(value)) {
    callback({message :'Wrong format of mobile phone number'})
  } else {
    callback();
  }
}
function validateOTP(rule, value, callback) {
  if (!/^[0-9]{4}$/.test(value)) {
    callback({message :'Wrong format of OTP number'})
  } else {
    callback();
  }
}
export const phoneRules = {
  phone: [
    {required: true, message: 'please enter mobile'},
    {trigger: 'blur', validator: validatePhone}
  ]
};
export const rules = Object.assign({},phoneRules,{
  vcode: [
    {required: true, message: 'please enter otp '},
    {trigger: 'blur', validator: validateOTP}
  ],
  loginPwd: [
    {required: true, message:'please enter your password'}
  ]
});
