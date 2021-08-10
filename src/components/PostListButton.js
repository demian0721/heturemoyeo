//LIBRARY
import React from "react";
import styled from "styled-components";

//ELEMENTS
import { Grid, Button } from "../elements/index";

//HISTORY
import { history } from "../redux/configStore";

const PostListButton = (props) => {
    return (
        <React.Fragment>
            <Buttonset>
            <Grid padding="5px 0px 0px 0px">
              <Button
                width="100%"
                height="auto"
                padding="12px 0"
                margin="0px 0px 10px"
                fontSize="15px"
                bg=""
                color="#767676"
                style={{ fontWeight: "bold",
                       border: "none" }}
                hoverColor="#ccc"
                clickEvent={() => {
                    history.push("/postlist");
                  }}
              >
                전체 목록
              </Button>
            </Grid>
            <Grid padding="5px 0px">
              <Button
                width="100%"
                height="auto"
                padding="12px 0"
                bg=""
                color="#767676"
                style={{ fontWeight: "bold",
                       border: "none" }}
                hoverColor="#ccc"
                fontSize="15px"
                clickEvent={() => {
                    history.push("/postlist/my");
                  }}
              >
                초대된 모임
              </Button>
            </Grid>
            <Grid padding="5px 0px">
              <Button
                width="100%"
                height="auto"
                padding="12px 0"
                bg=""
                color="#767676"
                style={{ fontWeight: "bold",
                       border: "none" }}
                hoverColor="#ccc"
                fontSize="15px"
                clickEvent={() => {
                    history.push("/postlist/my");
                  }}
              >
                내 모임
              </Button>
            </Grid>
          </Buttonset>
        </React.Fragment>
    );
};

const Buttonset = styled.div`
  margin: 0 auto;
  text-align: center;
  display: flex;
`;

export default PostListButton;