/* global kakao */

// LIBRARY
import React, { useRef, useState, useEffect, Fragment } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { geolocated, geoPropTypes } from "react-geolocated";
import _ from "lodash";
import 'react-datepicker/dist/react-datepicker.css';
import "../react-datepicker.css";

// TOKEN
import { getToken } from "../common/token";

// HISTORY
import { history } from "../redux/configStore";

// REDUX
import { postActions } from "../redux/modules/post";

// COMPONENTS
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostEdition from "../components/PostEdition";

// ELEMENTS
import { Grid,} from "../elements/index";

// ICON

import useOutsideClick from "../hooks/useOutsideClick";

const PostWrite = (props) => {

  const dispatch = useDispatch();

  const modalRef = useRef();

  useEffect(() => {dispatch(postActions.postDetailInfo(props.match.params.postid)) }, [])

  const PostContent = useSelector((state) => state.post.postDetail);
  const is_loaded = useSelector((state) => state.post.is_loaded);

  useEffect(() => {
    if (!getToken()) {
      history.replace("/login");
    }
  }, []);

  return (
    <Style>
        <Grid width="100vw" height="" >
          <Header id="write">게시글 수정</Header>
        </Grid>
        {is_loaded && <PostEdition Details={PostContent}/>}
        <Footer />
    </Style>
  );
};

const Style = styled.div`
  align-items: center;
  width: 100vw;
  height: 100%;
  background-color: #EFEFEF;
  //styled component use
`;

PostWrite.propTypes = { ...PostWrite.propTypes, ...geoPropTypes };

export default geolocated({
  positionOptions: { enableHighAccuracy: false },
  userDecisionTimeout: 500,
})(PostWrite);
