// LIBRARY
import React from 'react';
import styled from 'styled-components';

const TextStyle = styled.p`
    font-size: ${(props) => props.fontSize};
    color: ${(props) => props.color};
    line-height: ${(props) => props.lineHeight};
    text-indent: ${(props) => props.textIndent};
    font-weight: ${(props) => props.fontWeight};
    margin: ${(props) => props.margin};
    margin-left: ${(props) => props.marginLeft};
    margin-top: ${(props) => props.marginTop};
    text-align: ${(props) => props.textAlign};
    letter-spacing: ${(props) => props.spacing};
    word-break: break-all;
    white-space: pre-line;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 7;
    &:hover {
    font-weight: ${(props) => props.hoverWeight};
    }
`;

const Text = ({ children, clickEvent, ...props }) => {
    return <TextStyle onClick={clickEvent}{...props}>{children}</TextStyle>;
};

Text.defaultProps = {
    color: '#495057',
    clickEvent: () => {},
};

export default Text;
