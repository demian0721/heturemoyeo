# 헤쳐모여

![image](https://user-images.githubusercontent.com/83893777/131950347-de552a25-2e38-4774-9665-392b61539473.png)

[사이트 링크 바로가기](https://moyeora.org/) / [시연 영상 보기](https://youtu.be/MpwPiutwqaY)

## 목차

1. [프로젝트 개요](#-프로젝트-개요)
2. [사용 패키지](#-package)
3. [기능 소개](#-기능-소개)
4. [역할 분담](#-역할-분담)

***

## 🎬 프로젝트 개요

위치기반 소모임 플랫폼

***

## 🛠 Package

- 상태관리: react-redux, react-recoilState
- 스타일: styled-components, tailWindCSS
- 라우터: react-router-dom, connected-react-router
- 미들웨어: redux-thunk, redux-logger
- 통신: Axios, Socket.IO
- 그 외: kakaoMap API

***

## 💡 기능소개

- 로그인/회원가입/로그인유지 (JWT토큰&세션스토리지토큰방식)
- 첫 로그인 시, 서비스의 사용방법에 대한 이해를 돕기 위해 도움말 팝업 출력 (튜토리얼 기능)
- Geolocation 정보와 Socket.IO 통신을 활용해, 로그인한 유저들의 마커를 지도에 실시간으로 생성
- 모임 게시글 작성시 해당 모임이 열리는 장소에 마커 생성
- 작성자가 다른 유저를 모임에 초대할 수 있고, 초대받은 유저에게 문자 알림 전송
- GeoRedis 활용, 내 주변 반경 거리를 설정하여 유저 마커 표시 범위를 선택/설정
- 각 마커들의 관계 / 종류 등에 분기를 적용하여, 마커의 종류에 따라 차별화된 정보를 오버레이 형태로 출력
- 유저 마커 클릭 시 최종 접속 시간 제공 (초,분,시,일 전 형태)
- 모임 게시글 작성 중, 지도를 로드하여 위치를 선택하면 해당 좌표의 주소를 자동으로 입력
- 전체 모임목록, 초대받은 목록, 참여한 모임 목록, 검색 목록을 분류해서 제공
- 모임에 참여하는 경우 대화방으로 입장, 내가 참여중인 대화방 목록 제공
- Socket.IO 통신을 활용한 실시간 대화 기능 적용
- 각 모임의 무분별한 글삭제 및 인원 변동(탈퇴/추방)을 방지하기 위한 일정 확정 기능
- 유저 프로필 수정 (닉네임-중복체크포함-, 비밀번호 변경, 취향(태그), 프로필 이미지)
- 고객 피드백 소통 창구 (구글폼 활용)
- 내가 작성한 모임 게시글의 경우 수정/삭제 가능하며 대화방 내 불량 유저 추방 권한 부여
- 모임 탈퇴

***

## 💪 역할 분담

- 김유진: 
- 주재인: 튜토리얼, 메인 페이지 KakaoMAP API 적용, 지도 마커 출력, 마커 클릭 이벤트(오버레이 내 각종 정보 출력), 주변 표시 반경 설정, 모임 초대, 대화방 목록, 실시간 대화기능,
- 유저 추방 및 확정, 모임 탈퇴, 
- 황준연:

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
