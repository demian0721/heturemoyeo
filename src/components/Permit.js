// LIBRARY
import React from 'react';
import { useSelector } from 'react-redux';

const Permit = (props) => {
    const isLogin = useSelector((state) => state.user.is_login);

    if (isLogin) {
    return <>{props.children}</>;
    }

    return null;
};

Permit.propTypes = {};

export default Permit;
