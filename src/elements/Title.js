// LIBRARY
import React from 'react';
import styled from 'styled-components';

const TitleStyle = styled.h2`
    font-size: ${(props) => props.fontSize};
    margin: ${(props) => props.margin};
    line-height: ${(props) => props.lineHeight};
    text-align: ${(props) => props.textAlign};
    font-weight: 700;
`;

const Title = ({ children, ...props }) => {
    return <TitleStyle {...props}>{children}</TitleStyle>;
};

Title.defaultProps = {
    fontSize: '20px',
    lineHeight: 1.5,
};

export default Title;
