// LIBRARY
import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    color: ${(props) => props.color};
    padding: ${(props) => props.padding};
    margin: ${(props) => props.margin};
    border-radius: ${(props) => props.radius};
    font-size: ${(props) => props.fontSize};
    background: ${(props) => props.bg};
    box-shadow: ${(props) => props.shadow};
    box-sizing: border-box;
    border: 1px solid ${(props) => props.borderColor};
    cursor: pointer;
    display: ${(props) => props.display};
    justify-content: center;
    align-items: ${(props) => props.align};

    &:hover {
    background: ${(props) => props.hoverBg};
    color: ${(props) => props.hoverColor};
    }
`;

const Button = ({ children, clickEvent, ...props }) => {
    return (
        <ButtonStyle onClick={clickEvent} {...props}>
            {children}
        </ButtonStyle>
    );
};

Button.defaultProps = {
    display: 'inline-flex',
    width: 'auto',
    height: 'auto',
    fontSize: '16px',
    color: '#fff',
    padding: 0,
    bg: '#333333',
    hoverBg: '#f3f3f3',
    hoverColor: '#000',
    borderColor: '#dddddd',
    align: 'center',
    clickEvent: () => { }
};

export default Button;
