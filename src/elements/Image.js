// LIBRARY
import React from 'react';
import styled from 'styled-components';

const ImageStyle = styled.img`
    display: block;
    cursor: pointer;
    max-width: 100%;
    height: auto;
    width: ${(props) => props.width};
`;

const Image = ({ clickEvent, ...props }) => {
    const { src, alt } = props;

    if (src) return <ImageStyle onClick={clickEvent} src={src} alt={alt} />;
    else return null;
};

Image.defaultProps = {
    clickEvent: () => {},
    width: 'auto',
};

export default Image;
