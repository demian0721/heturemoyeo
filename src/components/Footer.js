//Library
import { BorderTop } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom'

//Elements
import { Grid, Text, Image, Button } from "../elements/index";

//History
import { history } from "../redux/configStore";

//Icons
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';

//Components

//임포트 사용 항목 외 삭제요망

const Footer = (props) => {
  const title = props.children;

    return (
      <React.Fragment>
        <Grid
          is_flex="center"
          width="100%"
          minWidth="280px"
          height="55px"
          bg="#FFF"
          style={{
            position: "fixed",
            bottom: "0",
            zIndex: "2",
            borderTop: "0.4px solid #767676",
          }}
        >
          {title == "home" ? (
            <Grid
              width="70px"
              padding="7px 0px 5px 0px"
              align="center"
              color="#16C59B"
              hoverColor="#16C59B"
              style={{ display: "block" }}
              clickEvent={() => {}}
            >
              <Link to="/">
                <HomeOutlinedIcon />
                <p>
                  <text style={{ fontSize: "11px", fontWeight: "bold" }}>
                    홈
                  </text>
                </p>
              </Link>
            </Grid>
          ) : (
            <Grid
              width="70px"
              padding="7px 0px 5px 0px"
              align="center"
              color="#7B7B7B"
              hoverColor="#16C59B"
              style={{ display: "block" }}
              clickEvent={() => {}}
            >
              <Link to="/">
                <HomeOutlinedIcon />
                <p>
                  <text style={{ fontSize: "11px", fontWeight: "bold" }}>
                    홈
                  </text>
                </p>
              </Link>
            </Grid>
          )}

          {title == "group" ? (
            <Grid
              width="70px"
              padding="7px 0px 5px 0px"
              align="center"
              color="#16C59B"
              hoverColor="#16C59B"
              style={{ display: "block" }}
              clickEvent={() => {}}
            >
              <Link to="/postlist">
                <SearchOutlinedIcon />
                <p>
                  <text style={{ fontSize: "11px", fontWeight: "bold" }}>
                    모임
                  </text>
                </p>
              </Link>
            </Grid>
          ) : (
            <Grid
              width="70px"
              padding="7px 0px 5px 0px"
              align="center"
              color="#7B7B7B"
              hoverColor="#16C59B"
              style={{ display: "block" }}
              clickEvent={() => {window.location.href='/postlist'}}
            >
                <SearchOutlinedIcon />
                <p>
                  <text style={{ fontSize: "11px", fontWeight: "bold" }}>
                    모임
                  </text>
                </p>
            </Grid>
          )}

          {title == "friend" ? (
            <Grid
              width="70px"
              padding="7px 0px 5px 0px"
              align="center"
              color="#16C59B"
              hoverColor="#16C59B"
              style={{ display: "block" }}
              clickEvent={() => {
                window.alert("준비 중인 서비스 입니다!");
              }}
            >
              <PeopleAltOutlinedIcon />
              <p>
                <text style={{ fontSize: "11px", fontWeight: "bold" }}>
                  친구
                </text>
              </p>
            </Grid>
          ) : (
            <Grid
              width="70px"
              padding="7px 0px 5px 0px"
              align="center"
              color="#7B7B7B"
              hoverColor="#16C59B"
              style={{ display: "block" }}
              clickEvent={() => {
                window.alert("준비 중인 서비스 입니다!");
              }}
            >
              <PeopleAltOutlinedIcon />
              <p>
                <text style={{ fontSize: "11px", fontWeight: "bold" }}>
                  친구
                </text>
              </p>
            </Grid>
          )}

          {title == "chat" ? (
            <Grid
              width="70px"
              padding="7px 0px 5px 0px"
              align="center"
              color="#16C59B"
              hoverColor="#16C59B"
              style={{ display: "block" }}
              clickEvent={() => {}}
            >
              <Link to="/chat">
                <SmsOutlinedIcon />
                <p>
                  <text style={{ fontSize: "11px", fontWeight: "bold" }}>
                    대화방
                  </text>
                </p>
              </Link>
            </Grid>
          ) : (
            <Grid
              width="70px"
              padding="7px 0px 5px 0px"
              align="center"
              color="#7B7B7B"
              hoverColor="#16C59B"
              style={{ display: "block" }}
              clickEvent={() => {}}
            >
              <Link to="/chat">
                <SmsOutlinedIcon />
                <p>
                  <text style={{ fontSize: "11px", fontWeight: "bold" }}>
                    대화방
                  </text>
                </p>
              </Link>
            </Grid>
          )}

          {title == "profile" ? (
            <Grid
              width="70px"
              padding="7px 0px 5px 0px"
              align="center"
              color="#16C59B"
              hoverColor="#16C59B"
              style={{ display: "block" }}
              clickEvent={() => {}}
            >
              <Link to="/mypage">
                <FaceOutlinedIcon />
                <p>
                  <text style={{ fontSize: "11px", fontWeight: "bold" }}>
                    프로필
                  </text>
                </p>
              </Link>
            </Grid>
          ) : (
            <Grid
              width="70px"
              padding="7px 0px 5px 0px"
              align="center"
              color="#7B7B7B"
              hoverColor="#16C59B"
              style={{ display: "block" }}
              clickEvent={() => {}}
            >
              <Link to="/mypage">
                <FaceOutlinedIcon />
                <p>
                  <text style={{ fontSize: "11px", fontWeight: "bold" }}>
                    프로필
                  </text>
                </p>
              </Link>
            </Grid>
          )}
        </Grid>
      </React.Fragment>
    );
};

Footer.defaultProps = {
  children: "",
  // clickEvent: () => {history.push('/');},
};

export default Footer;
