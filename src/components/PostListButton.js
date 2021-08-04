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
                bg="#A7AAAD"
                hoverColor="#ccc"
                clickEvent={() => {
                    history.push("/postlist");
                  }}
              >
                전체 모임 글(구인중!)
              </Button>
            </Grid>
            <Grid padding="5px 0px">
              <Button
                width="100%"
                height="auto"
                padding="12px 0"
                bg="#A7AAAD"
                hoverColor="#ccc"
                fontSize="15px"
                clickEvent={() => {
                    history.push("/postlist/my");
                  }}
              >
                나의 모임들
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