export const idVal = (nickname) => {
    const _reg = /[A-Za-z0-9]{4,20}$/;

    return _reg.test(nickname);
};

export const pwdVal = (password) => {
    const _reg = /[A-Za-z0-9]{6,30}$/;

    return _reg.test(password);
};
