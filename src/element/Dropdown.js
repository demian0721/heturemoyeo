import React, { useState } from 'react';
import styled from 'styled-components';

// ELEMENTS
import { Button } from '../elements/index';

// ICON
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const DropDownStyle = styled.ul`
    width: 100%;
    position: relative;
    border-radius: 5px;
    padding: 10px 0;
    box-sizing: border-box;
    background: #fff;
    line-height: 2;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    z-index: 9;
    list-style: none;

    li {
    cursor: pointer;
    padding: 0 15px;
    box-sizing: border-box;

    &:hover {
        background: #eee;
    }
}
`;

const Dropdown = (props) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen((preOpen) => !preOpen);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                clickEvent={handleToggle}
                width="100%"
                height="auto"
                padding="12px 0"
            >
                {props.text}
            </Button>

            {open && (
                <ClickAwayListener onClickAway={handleClose}>
                    <DropDownStyle {...props}>
                        {props.contents.map((content, idx) => {
                            return (
                                <li
                                    key={Date.now() + idx}
                                    onClick={() => {
                                        props.clickEvent[idx]();
                                        handleClose();
                                    }}
                                >
                                    {content}
                                </li>
                            );
                        })}
                    </DropDownStyle>
                </ClickAwayListener>
            )}
        </>
    );
};

Dropdown.defaultProps = {
    top: '48px',
    pos: '100%',
};

export default Dropdown;
