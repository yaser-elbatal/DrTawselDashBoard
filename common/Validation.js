export const validatePhone = (phone) =>
    phone === '' ? "يرجى ادخال رقم هاتف صحيح" : phone.length < 9 ? "يرجى ادخال رقم هاتف صحيح" : null

export const validatePassword = (password) =>
    password.length < 6 ? "كلمة المرور يجب ان تكون 6 أرقام او أكثر" : null;

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