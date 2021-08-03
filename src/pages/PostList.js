//LIBRARY
import React, { useEffect } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import TodayIcon from "@material-ui/icons/Today";
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { postActions } from "../redux/modules/post";

//ELEMENTS
import { Grid, Input, Button } from "../elements/index";

//HISTORY
import { history } from "../redux/configStore";

//COMPONENTS
import Footer from "../components/Footer";
import Header from "../components/Header";
import PostGroupCard from "../components/PostGroupCard";

const PostList = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postActions.getPostsDB());
  }, []);
  const PostList = useSelector((state) => state.post.list);

  return (
    <React.Fragment>
      <Grid>
        <Header />
      </Grid>

      <Grid
        width="360px"
        margin="50px auto"
        // padding="55px 40px 100.2px"
        // shadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
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
        <Grid padding="18px" bg="#EFEFEF">
          <Grid
            padding="8px 8px"
            is_flex
            bg="white"
            style={{ border: "1px solid #ccc", justifyContent:"space-between", marginBottom:"10px" }}
          >
            <input placeholder="제목, 내용, 태그 또는 날짜" />
            <TodayIcon color="action" />
          </Grid>

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
              >
                나의 모임들
              </Button>
            </Grid>
          </Buttonset>

          {PostList.map((l, index) => {
            return <PostGroupCard key={l.id} idx={index} {...l} />;
          })}

          <Grid padding="5px 0px">
            <Button
              width="60px"
              height="60px"
              bg="#A7AAAD"
              color="black"
              radius="50px"
              //    borderColor="1px solid black"
              fontSize="10px"
              clickEvent={() => {
                history.push("/postwrite");
              }}
              style={{ cursor: "pointer", float: "right" }}
            >
              추가하기 <br /> (글쓰기버튼)
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Footer />
      </Grid>
    </React.Fragment>
  );
};

// const Td = styled.td`
//   padding-left: 5px;
// `;
// const Th = styled.th`
//   padding-right: 5px;
// `;
// const Table = styled.table`
//   margin: 5px;
// `;

// const WriteButton = styled.button`
//   width: 60px;
//   height: 60px;
//   background-color: #A7AAAD;
//   border-radius: 50px;
//   border: 1px solid black;
//   float: right;
//   font-size: 10px;
// `;

const Buttonset = styled.div`
  margin: 0 auto;
  text-align: center;
  display: flex;
`;

// const PlaceImg = styled.img`
//   width: 85px;
//   height: 85px;
//   margin: 5px;
//   background-color: white;
// `;

// const PostCard = styled.div`
//   display: flex;
//   justify-content: space-between;
//   background-color: #A7AAAD;
//   padding: 5px;
//   margin: 15px auto;
//   font-size: 12px;
// `;

export default PostList;
