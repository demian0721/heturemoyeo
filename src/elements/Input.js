// LIBRARY
import React from 'react';
import styled from 'styled-components';

const InputStyle = styled.input`
    --lightcolor: #6c757d;

    width: ${(props) => props.width};
    background: ${(props) => props.bg};
    padding: ${(props) => props.padding};
    margin: ${(props) => props.margin};
    border-radius: ${(props) => props.radius};
    font-size: ${(props) => props.fontSize};
    box-shadow: ${(props) => props.shadow};
    border: 1px solid #ccc;
    box-sizing: border-box;

    &:focus {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px inset;
    outline: none;
    border: none;
    }

    &::placeholder {
    color: var(--lightcolor);
    }

    &::-webkit-input-placeholder {
    color: var(--lightcolor);
    }

    &:-ms-input-placeholder {
    color: var(--lightcolor);
    }
`;

const Input = ({ placeholder, type, value, changeEvent, keyUp, keyPress, ...props }) => {
    return (
    <InputStyle
        {...props}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={changeEvent}
        onKeyUp={keyUp}
        onKeyPress={keyPress}
    />
    );
};

Input.defaultProps = {
    width: '100%',
    bg: '#fff',
    padding: '8px 15px',
    margin: 0,
    fontSize: '16px',
    type: 'text',
    changeEvent: () => {},
    keyUp: () => {},
    keyPress: () => {},
    placeholder: '텍스트를 입력해주세요',
    className: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
};

export default Input;
