import React from 'react';
import styled from 'styled-components';

const Grid = ({ children, clickEvent, ...props }) => {
    return (
    <React.Fragment>
    <GridBox {...props} onClick={clickEvent}>
        {children}
    </GridBox>
    </React.Fragment>
    );
};

Grid.defaultProps = {
    children: null,
    is_flex: false,
    verSort: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    padding: false,
    margin: false,
    align: false,
    bg: false,
    clickEvent: () => {},
    laptoptStyle: () => {},
    tabletStyle: () => {},
    mobileStyle: () => {},
};

const GridBox = styled.div`
    position: ${(props) => props.position};
    ${(props) => (props.is_flex ? `display: flex; justify-content: ${props.is_flex};` : '')};
    align-items: ${(props) => props.verSort};
    width: ${(props) => props.width};
    min-width: ${(props) => props.minWidth};
    max-width: ${(props) => props.maxWidth};
    height: ${(props) => props.height};
    min-height: ${(props) => props.minHeight};
    max-height: ${(props) => props.maxHeight};
    box-shadow: ${(props) => props.shadow};
    opacity: ${(props) => props.opacity};
    ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
    ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
    ${(props) => (props.align ? `text-align: ${props.align};` : '')}
    ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
    ${(props) => (props.radius ? `border-radius: ${props.radius};` : '')}
    box-sizing: border-box;
    overflow: ${(props) => props.overflow};

    &:hover {
    background: ${(props) => props.hoverColor};
    ${(props) =>
        props.hoverShadow
        ? `box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;`
        : ''}
    }
`;

export default Grid;
