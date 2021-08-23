//EMAIL(ID) 
// export const idVal = (email) => {
//     const _reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

//     return _reg.test(email);
// };

//PHONE(ID)
export const idVal = (phone) => {
    const _reg = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;

    return _reg.test(phone);
};

//PASSWORD
export const pwdVal = (password) => {
    const _reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    return _reg.test(password);
};

//NAME
export const nameVal = (name) => {
    const _reg = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;

    return _reg.test(name);
};

//NICKNAME
export const nickVal = (nickname) => {
    const _reg = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;

    return _reg.test(nickname);
};

