//LIBRARY
import React from "react";
import styled from "styled-components";

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
            <MButton
              className="custom_transition"
              style={{ borderBottom: "2px solid #16C59B", color: "#16C59B" }}
              onClick={() => {
                history.push("/postlist");
              }}
            >
              전체 목록
            </MButton>
          ) : (
            <MButton
              className="custom_transition"
              onClick={() => {
                history.push("/postlist");
              }}
            >
              전체 목록
            </MButton>
          )}
        </Grid>
        <Grid>
          {title == "invited" ? (
            <MButton
              className="custom_transition"
              style={{ borderBottom: "2px solid #16C59B", color: "#16C59B" }}
              onClick={() => {
                history.push("/postlist/invited");
              }}
            >
              초대된 모임
            </MButton>
          ) : (
            <MButton
              className="custom_transition"
              onClick={() => {
                history.push("/postlist/invited");
              }}
            >
              초대된 모임
            </MButton>
          )}
        </Grid>
        <Grid>
          {title == "my" ? (
            <MButton
              className="custom_transition"
              style={{ borderBottom: "2px solid #16C59B", color: "#16C59B" }}
              onClick={() => {
                history.push("/postlist/my");
              }}
            >
              내 모임
            </MButton>
          ) : (
            <MButton
              className="custom_transition"
              onClick={() => {
                history.push("/postlist/my");
              }}
            >
              내 모임
            </MButton>
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
