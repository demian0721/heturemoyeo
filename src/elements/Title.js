// LIBRARY
import React from 'react';
import styled from 'styled-components';

const TitleStyle = styled.h2`
    font-size: ${(props) => props.fontSize};
    margin: ${(props) => props.margin};
    margin-bottom: ${(props) => props.marginBottom};
    line-height: ${(props) => props.lineHeight};
    text-align: ${(props) => props.textAlign};
    font-weight: ${(props) => props.fontWeight};
`;

const Title = ({ children, ...props }) => {
    return <TitleStyle {...props}>{children}</TitleStyle>;
};

Title.defaultProps = {
    fontSize: '20px',
    lineHeight: 1.5,
    fontWeight: 700,
};

export default Title;
