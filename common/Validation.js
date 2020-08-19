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
    code === '' || code.length < 4 ? "يرجي التاكد من الكود واعاده المحاوله" : null;

export const validateEmail = email => {
    let mailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return !mailReg.test(String(email).toLowerCase())
        ? ' يرجى ادخال بريد الكتروني صحيح'
        : null;
};
export const validateUserName = userName =>
    userName.length < 3 ? 'اسم المستخدم مكون من 3 احرف او اكثر' : null;

export const validateAccountNum = (code) =>
    code === '' || code.length < 14 ? "رقم الحساب لا بد من ان يتألف من 14 رقم" : null;

export const valdiateMoney = (code) =>
    code === '' || code.length <= 0 ? "برجاء اضافه مبلغ صحيح" : null;