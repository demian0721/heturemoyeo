//LIBRARY
import React, { useState } from 'react';
import { css } from 'styled-components';

//ELEMENTS
import { Text, Title, Input, Grid, Button } from '../elements';

//HISTORY
import { history } from '../redux/configStore';

//REDUX-ACTION & REACT-HOOK
import { userActions } from '../redux/modules/user';
import { useDispatch } from 'react-redux';

const LogIn = (props) => {
    const dispatch = useDispatch();

    const [userInfo, setUserInfo] = useState({ loginid: '', password: '' });
    const [warningText, setWarningText] = useState('');

    const login = () => {
        if (!userInfo.loginid) {
            setWarningText('아이디가 입력되지 않았습니다.');
            return;
        }

        if (!userInfo.password) {
            setWarningText('패스워드가 입력되지 않았습니다.');
            return;
        }

        dispatch(userActions.loginAction(userInfo));
    };

    return (
        <React.Fragment>
            <div   style={{paddingTop:"110px"}}/>
            <Grid
                width="820px"
                is_flex="space-between"
                margin="50px auto"
                padding="30px 40px"
                shadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                tabletStyle={() => {
                    return css`
            width: 95%;
            `;
                }}
                mobileStyle={() => {
                    return css`
            padding: 15px 20px;
            width: 100%;
            `;
                }}
            >
                <Grid padding="16px">
                    <Title>LOGIN</Title>

                    <Grid padding="16px 0px">
                        <Input
                            placeholder="아이디를 입력해주세요."
                            changeEvent={(event) => {
                                setUserInfo({ ...userInfo, loginid: event.target.value });
                            }}
                            padding="14px 17px"
                            keyPress={(event) => {
                                if (event.key === 'Enter') {
                                    login();
                                }
                            }}
                        />
                    </Grid>

                    <Grid padding="16px 0px 20px 0px">
                        <Input
                            placeholder="패스워드를 입력해주세요."
                            type="password"
                            changeEvent={(event) => {
                                setUserInfo({ ...userInfo, password: event.target.value });
                            }}
                            padding="14px 17px"
                            keyPress={(event) => {
                                if (event.key === 'Enter') {
                                    login();
                                }
                            }}
                        />
                    </Grid>
                    <Text textAlign="center" fontSize="12px" lineHeight="2" textIndent="15px" color="red">
                        {warningText}
                    </Text>
                    <Grid padding="5px 0px">
                        <Text fontSize="12px" lineHeight="2" textIndent="15px">
                            혹시 회원이 아니신가요?
                        </Text>
                        <Button
                            width="100%"
                            height="auto"
                            padding="12px 0"
                            bg="#EFEFEF"
                            hoverColor="#ccc"
                            color="inherit"
                            clickEvent={() => {
                                history.push('/signup');
                            }}
                        >
                            회원가입 하러가기
                        </Button>
                    </Grid>

                    <Grid padding="16px 0px 0px 0px">
                        <Button width="100%" height="auto" padding="12px 0" margin="0px 0px 30px" clickEvent={login}>
                            로그인 하기
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

LogIn.defaultProps = {};

export default LogIn;
