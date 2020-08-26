import i18n from '../locale/i18n'

export const validatePhone = (phone) =>
    phone === '' ? i18n.t('PhoneErr') : phone.length < 9 ? i18n.t('PhoneErr') : null

export const validatePassword = (password) =>
    password.length < 6 ? i18n.t('passwordErr') : null;

export const validateTwoPasswords = (password, confirmPassword) => {
    return password != confirmPassword
        ? "غير متطابق مع الاخر"
        : null;
};

export const validateCode = (code) =>
    code === '' || code.length < 3 ? "يرجي التاكد من الكود واعاده المحاوله" : null;

export const ValditeCommercialRegister = (CommercialRegister) =>
    CommercialRegister === '' || CommercialRegister.length < 10 ? i18n.t('CommRegister') : null;

export const validateEmail = email => {
    let mailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return !mailReg.test(String(email).toLowerCase())
        ? i18n.t('emailErr')
        : null;
};

export const ValdiateCITyId = (id) => {
    id === '' ? i18n.t('CityId') : id === null ? i18n.t('CityId') : null
}
export const ValdiateDebId = (id) => {
    id === '' ? i18n.t('DepId') : id === null ? i18n.t('DepId') : null
}
export const validateUserName = userName =>
    userName.length < 2 ? i18n.t('usernameErr') : null;

export const validateAccountNum = (code) =>
    code === '' || code.length < 14 ? "رقم الحساب لا بد من ان يتألف من 14 رقم" : null;

export const valdiateMoney = (code) =>
    code === '' || code.length <= 0 ? "برجاء اضافه مبلغ صحيح" : null;