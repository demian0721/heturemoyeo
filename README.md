## :mag: 항해99 실전 프로젝트 **헤쳐모여**

![image](https://user-images.githubusercontent.com/83893777/133616407-26be250e-70bc-4957-9e5b-a2968364b983.png)


[사이트 링크 바로가기](https://moyeora.org/) / [시연 영상 보기](https://youtu.be/MpwPiutwqaY)



## 🚩 목차
1. [프로젝트 개요](#-프로젝트-개요)
2. [사용 패키지](#-package)
3. [기능 소개](#-기능-소개)
4. [역할 분담](#-역할-분담)



## 🎬 프로젝트 개요
실시간 위치 기반 소모임 플랫폼!
- 👫 우리동네, 같은 취미를 가진 사람을 만나고 싶으신가요?
- 🗺 사소한 일상에서부터 다양하고 색다른 경험까지 찾을 수 있는 곳!
- 🎮당신과의 만남을 기다리고 있는 이웃을 만나보세요.



## 🗓 프로젝트 기간
2021년 7월 23일 ~ 2021년 9월 02일



## 📋 [API Document](https://docs.google.com/spreadsheets/d/1_zMxl_czR4sAvctT4WjlYpJnrBMlpKr5b2o5Cim8Nxs/edit#gid=328670061)



## 📂 [Notion](https://trusted-sail-28c.notion.site/99-9-b3c6d3acc4cd489d8abda6c0b7f3c714)



## 💁🏻‍♂️ 팀원 소개
- Front-end: 김유진, 주재인, 황준연
- Back-end: 이용우(팀장), 이해웅, 임관식
- Designer: 정지우, 서정화



## 🛠 Package

- 상태관리: react-redux, react-recoilState
- 스타일: styled-components, tailWindCSS
- 라우터: react-router-dom, connected-react-router
- 미들웨어: redux-thunk, redux-logger
- 달력: react-datepicker, moment
- 통신: Axios, Socket.IO
- 그 외: kakaoMap API



## 📚 프로젝트 아키텍처
![image](https://user-images.githubusercontent.com/83893777/133617758-e91c20fc-e991-4d38-814b-3e746c753951.png)

## 📌 유저 피드백 및 개선사항

**1. Socket 부하 테스트**

부하테스트의 필요성 인식

- 현재 서버가 버틸 수 있는 부하량을 확인하여, 적절한 서버의 구성이 필요하다고 생각하였습니다.
- 실시간으로 사용자의 위치를 입력 및 조회하는 기능의 한도를 확인할 수 있어야 안전한 서버 구현이 가능할 것으로 생각하였습니다.

부하테스트 진행 방식

- Artillery 모듈에서는 Socket.Io-v3의 Header를 지원하지 않아 사용자 인증을 받을 수 없었습니다.
- 차선책으로 자체 제작한 더미 소켓 클라이언트를 생성하여 테스트하였습니다.
- 1,000명의 소켓을 테스트했을 때 EC2: 20%, Redis: 9%의 CPU 할당량을 보였습니다.
- 1,000명의 소켓을 테스트했을 때 Redis의 메모리 할당량이 1%에서 1.6%로 상승하였습니다.
![image](https://user-images.githubusercontent.com/83893777/133619517-176c29ad-6e82-45bb-bd7f-3ffbc80715a1.png)

**2. 첫 로그인시 튜토리얼 적용**

보다 직관적인 서비스 이용의 필요성 인식

- 서비스 초기 유저 피드백 중에서 가장 많은 이야기가 나왔던 것이 서비스 이용방법을 이해하기 어렵다는 점이었습니다.
- 개발자의 입장에서 생각하기엔 직관적이라고 생각했던 UI/UX 들이 유저들 입장에서는 다를 수 있음을 인지하였습니다.

개선 방법

- 회원 가입이 완료되면 브라우저 저장소에 첫 로그인에 관한 정보를 저장합니다.
- 첫 로그인이 확인되면 짧은 튜토리얼을 제공하고 유저가 모두 확인하고 나면 서비스 이용이 가능하게 조치하였습니다.
![firstLogin](https://user-images.githubusercontent.com/83893777/133628655-f751a957-c25c-44e0-bfec-24f09b6d1c1e.gif)


**3. 유저 마커 표시반경 설정 UI 제작**

서비스 초기 이용자 수가 적을 때의 문제점

- 기획의도(주변 이웃과의 만남) 및 서버의 부하를 막기위해 주변에 표시되는 유저 마커의 표시 반경을 설정해 두었습니다.
- 이용자 수가 많지 않을 때, 사이트에 접속 시 주변에 아무도 없는 듯한 느낌이 들 수 있음을 인지했습니다.
- 그밖에 타 지역의 유저들도 보고 싶다는 유저 피드백들이 있었습니다.

개선 방법

- 표시반경을 유저가 설정할 수 있는 UI를 제작하였습니다.
- 해당 UI의 설정은 로컬스토리지에 저장되어 유저가 재차 로그인하여도 설정이 변하지 않도록 구성하였습니다.
- 이용자 수가 충분이 증가하기 전까지는 서버의 부하가 발생하지 않는다는 점을 근거로 표시반경을 700km까지 확장할 수 있도록 했습니다.
![markerRedius](https://user-images.githubusercontent.com/83893777/133628113-f2147080-1084-4bdd-b74f-c4d79532b348.gif)






## 💡 기능 소개

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



## 💪 역할 분담

- 김유진: 프로필, 회원정보 수정, 모임 상세, 모임 수정, 헤더&푸터 페이지에 따른 버튼, CSS 통일 및 세부 조정, 상태메세지 및 회원정보 수정


- 주재인: 튜토리얼, 메인 페이지 KakaoMAP API 적용, 지도 마커 출력, 마커 클릭 이벤트(오버레이 내 각종 정보 출력), 주변 표시 반경 설정, 모임 초대, 대화방 목록, 실시간 대화기능,
          유저 추방 및 확정, 모임 탈퇴, 모임글 작성 시 지도 불러오기 / 좌표의 주소값 받아오기, 온라인 모임 여부 체크기능, 메인페이지, 대화방목록, 대화방 내 UI CSS 적용
          
          
- 황준연: 로그인, 약관동의, 회원가입, 비밀번호 찾기, 게시글 전체목록, 나의 모임, 작성 페이지 UI 컴포넌트 설계 및 CSS 적용
        '회원가입' 또는 '비밀번호 찾기'하는 경우 핸드폰 번호 인증, 프로필 이미지 업로드 기능, 키워드 검색 기능, 작성페이지 날짜 선택 제한
