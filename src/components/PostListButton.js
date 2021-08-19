//LIBRARY
import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom'

//ELEMENTS
import { Grid, Button } from "../elements/index";

//HISTORY
import { history } from "../redux/configStore";

const PostListButton = (props) => {
  const title = props.children;
  return (
    <React.Fragment>
      <Buttonset>
        <Grid>
          {title == "all" ? (
            <Link to="/postlist">
              <MButton
                className="custom_transition"
                style={{ borderBottom: "2px solid #16C59B", color: "#16C59B" }}
              >
                전체 목록
              </MButton>
            </Link>
          ) : (
            <Link to="/postlist">
              <MButton
                className="custom_transition"
              >
                전체 목록
              </MButton>
            </Link>
          )}
        </Grid>
        <Grid>
          {title == "invited" ? (
            <Link to="/postlist/invited">
              <MButton
                className="custom_transition"
                style={{ borderBottom: "2px solid #16C59B", color: "#16C59B" }}
              >
                초대된 모임
              </MButton>
            </Link>
          ) : (
            <Link to="/postlist/invited">
              <MButton
                className="custom_transition"
              >
                초대된 모임
              </MButton>
            </Link>
          )}
        </Grid>
        <Grid>
          {title == "my" ? (
            <Link to="/postlist/my">
              <MButton
                className="custom_transition"
                style={{ borderBottom: "2px solid #16C59B", color: "#16C59B" }}
              >
                내 모임
              </MButton>
            </Link>
          ) : (
            <Link to="/postlist/my">
              <MButton
                className="custom_transition"
              >
                내 모임
              </MButton>
            </Link>
          )}
        </Grid>
      </Buttonset>
    </React.Fragment>
  );
};

const Buttonset = styled.div`
  margin: 0px 18px;
  text-align: center;
  display: flex;
`;

const MButton = styled.button`
  width: 100%;
  height: auto;
  font-weight: bold;
  padding: 10px 0px 8px 0px;
  font-size: 15px;
  background-color: white;
  color: #767676;
  border-bottom: 2px solid white;
  &:hover {
    color: #16c59b;
    border-bottom: 2px solid #16c59b;
  }
`;

PostListButton.defaultProps = {
  children: "",
};

export default PostListButton;
