// LIBRARY
import React from "react";
import styled from "styled-components";

// ELEMENTS
import { Grid, Text } from "../elements/index";

// HISTORY
import { history } from "../redux/configStore";

const PostListCard = (props) => {
  return (
      <PostCard
      onClick={() => {
        history.push("/postdetail/" + props.postId);
      }} style={{width:"325px"}}>
        <Grid
          margin="5px"
          width="60%"
          align="left"
        >
          <Text fontSize="12px" fontWeight="bold" color="black" marginTop="5px">
            제목
            <span style={{ fontWeight: "normal", marginLeft: "10px" }}>
              {props.title}
            </span>
          </Text>
          <Text fontSize="12px" fontWeight="bold" color="black" marginTop="5px">
            인원
            <span style={{ fontWeight: "normal", marginLeft: "10px" }}>
              현재 {props.currentMember} 명/총 {props.maxMember} 명
            </span>
          </Text>
          <Text fontSize="12px" fontWeight="bold" color="black" marginTop="5px">
            날짜
            <span style={{ fontWeight: "normal", marginLeft: "10px" }}>
              {props.startDate}
            </span>
          </Text>
          <Text fontSize="12px" fontWeight="bold" color="black" marginTop="5px">
            장소
            <span style={{ fontWeight: "normal", marginLeft: "10px" }}>
              {props.place}
            </span>
          </Text>
        </Grid>
        <PlaceImage />
      </PostCard>
  );
};

const PlaceImage = styled.img`
  width: 85px;
  height: 85px;
  margin: 5px;
  background-color: white;
`;

const PostCard = styled.button`
  display: flex;
  justify-content: space-between;
  background-color: #a7aaad;
  padding: 5px;
  margin: 15px 0px;
  font-size: 12px;
`;

export default PostListCard;
