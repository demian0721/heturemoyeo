export const idVal = (nickname) => {
    const _reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    return _reg.test(nickname);
};

export const pwdVal = (password) => {
    const _reg = /[A-Za-z0-9]{6,30}$/;

    return _reg.test(password);
};
