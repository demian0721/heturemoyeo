// LIBRARY
import { NoEncryption } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';

// ELEMENTS
import { Grid, Title, Text, Button } from '../elements/index';

const Overlay = () => {
    return (
        <>
            <OverlayWindow>
                <OverlayBox>
                    <Grid style={{position:"absolute", top:"20px", left:"270px"}}padding="0px 40px 0px 0px">
                    <Button padding="12px" width="70px">닫기</Button>
                    </Grid>
                    <Title>타이틀</Title>
                    <Text>오버레이 테스트 중</Text>
                </OverlayBox>
            </OverlayWindow>
        </>
    )
}

const OverlayWindow = styled.div`
    position:absolute;
    bottom:140px;
    left:0px;
    right:0px;
    z-index:100;
`
const OverlayBox = styled.div`
    position:absolute;
    width:100%;
    bottom:1;
    left: 0;
    background-color:#fff;
    color:#7f7f7f;
    padding:20px;
    border:1px solid #ccc;
    z-index:101;
`

export default Overlay
