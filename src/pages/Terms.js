// LIBRARY
import React, { Component } from "react";
import styled from "styled-components";
import "../Signup.scss";
import { Link } from "react-router-dom";

// Elements
import { Grid, Button, Toggle, Vehicles } from "../elements";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

export class Terms extends Component {
  constructor() {
    super();
    this.state = {
      totalCheck: false,
      allCheck: false,
      firstCheck: false,
      secondCheck: false,
      thirdCheck: false,
      color: "white",
      bg: "#B9B9B9",
      hoverColor: "white",
      hoverBg: "#B9B9B9",
    };
  }

  // componentDidUpdate에서 각 체크박스 상태변경에 따른 조건문을 설정하여, 
  // 체크박스 전체 혹은 '필수'라고 적힌 체크박스만 체크 표시하였을 때 다음 페이지로 이동 가능
  // 체크박스는 Material-UI에서 제공하는 컴포넌트 사용
  componentDidUpdate() {
    if (
      this.state.firstCheck == true &&
      this.state.secondCheck == true &&
      this.state.thirdCheck == true &&
      this.state.totalCheck == false
    ) {
      this.setState({ totalCheck: true });
    }

    if (
      this.state.firstCheck == true &&
      this.state.secondCheck == true &&
      this.state.allCheck == false
    ) {
      this.setState({
        allCheck: true,
        color: "white",
        bg: "#16C59B",
        hoverColor: "#16C59B",
        hoverBg: "white",
      });
    }

    if (
      this.state.totalCheck == true &&
      (this.state.firstCheck == false ||
        this.state.secondCheck == false ||
        this.state.thirdCheck == false)
    ) {
      this.setState({ totalCheck: false });
    }

    if (
      this.state.allCheck == true &&
      (this.state.firstCheck == false || this.state.secondCheck == false)
    ) {
      this.setState({
        totalCheck: false,
        allCheck: false,
        color: "white",
        bg: "#B9B9B9",
        hoverColor: "white",
        hoverBg: "#B9B9B9",
      });
    }
  }

  // render 함수 내에서 삼항 연산자를 사용하여 조건마다 체크박스의 style가 변경됨
  // 예시 하나로, CheckCircleIcon은 '약관 전체 동의'에서 체크되었을 때, RadioButtonUncheckedIcon은 '약관 전체 동의'에서 체크되지 않았을 때를 의미
  // 각 onClick 이벤트가 실행될 때 state가 변경되는 동시에 체크박스의 style도 변경됨
  // Toggle 기능을 가진 컴포넌트를 생성하여 '자세히보기' 클릭시 각 약관동의 사항에 해당되는 내용을 on/off 할 수 있음
  render() {
    return (
      <Style>
        <Grid
          minWidth="280px"
          maxWidth="300px"
          margin="0px auto"
        >
          <Grid 
            padding="18px" 
            height=""
            >
            <div className="Signup">
              <div className="signupContainer">
                <div className="signupBoard">
                  <div className="joinInfoBoard">
                    <section className="infoSection">
                      <div className="joinInfoWrap">
                        <div className="joinInfoTitle">
                          <div className="infoTitle">
                            <span style={{ marginTop: "7px" }}>
                              헤쳐모여 사용자 약관 전체 동의
                            </span>
                            {this.state.totalCheck == true ? (
                              <CheckCircleIcon
                                style={{
                                  color: "#16C59B",
                                  width: "30px",
                                  height: "30px",
                                  textAlign: "center",
                                }}
                                onClick={() =>
                                  this.setState({
                                    totalCheck: false,
                                    firstCheck: false,
                                    secondCheck: false,
                                    thirdCheck: false,
                                    allCheck: false,
                                    color: "white",
                                    bg: "#B9B9B9",
                                    hoverColor: "white",
                                    hoverBg: "#B9B9B9",
                                  })
                                }
                              />
                            ) : (
                              <RadioButtonUncheckedIcon
                                style={{
                                  color: "#16C59B",
                                  width: "30px",
                                  height: "30px",
                                  textAlign: "center",
                                }}
                                onClick={() =>
                                  this.setState({
                                    totalCheck: true,
                                    firstCheck: true,
                                    secondCheck: true,
                                    thirdCheck: true,
                                    allCheck: true,
                                    color: "white",
                                    bg: "#16C59B",
                                    hoverColor: "#16C59B",
                                    hoverBg: "white",
                                  })
                                }
                              />
                            )}
                          </div>
                        </div>

                        <div className="firstAgreement">
                          <div className="keyAgreement">
                            서비스 이용 약관 동의 (필수)
                          </div>
                          <div className="valueAgreement">
                            <span>
                              {this.state.firstCheck == true ? (
                                <CheckBoxIcon
                                  style={{ color: "#16C59B" }}
                                  onClick={() =>
                                    this.setState({ firstCheck: false })
                                  }
                                />
                              ) : (
                                <CheckBoxOutlineBlankIcon
                                  style={{ color: "#16C59B" }}
                                  onClick={() =>
                                    this.setState({ firstCheck: true })
                                  }
                                />
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="firstAgrForm">
                          <Toggle>
                            <Vehicles
                              infoTitle="개인정보 수집 및 이용 동의"
                              first="1. 수집항목 : [필수] 이름, 아이디(휴대폰 번호), 암호화된 비밀번호, 닉네임"
                              second="2. 수집 및 이용목적 : 헤쳐모여 서비스(이하 '서비스')는 사용자 본인 확인 등의 회원관리, 보안 및 프라이버시 측면에서 사용자가 안심하고 이용할 수 있는 서비스 이용환경 구축, 서비스 방문 및 관심사 등에 기반한 맞춤형 서비스 제공, 이벤트 정보 및 참여기회 제공 등을 목적으로 합니다."
                              third="3. 보관기간 : 회원탈퇴 등 개인정보 이용목적 달성 시까지 보관합니다. 단, 상법 및 ‘전자상거래 등에서의 소비자 보호에 관한 법률’ 등 관련 법령에 의하여 일정 기간 보관이 필요한 경우에는 해당 기간 동안 보관합니다."
                              fourth="4. 동의 거부권 등에 대한 고지 : 정보주체는 개인정보의 수집 및 이용 동의를 거부할 권리가 있으나, 이 경우 서비스 이용이 제한될 수 있습니다."
                            />
                          </Toggle>
                          <div className="secondAgreement">
                            <div className="keyAgreement">
                              개인정보 취급방침 동의 (필수)
                            </div>
                            <div className="valueAgreement">
                              <span>
                                {this.state.secondCheck == true ? (
                                  <CheckBoxIcon
                                    style={{ color: "#16C59B" }}
                                    onClick={() =>
                                      this.setState({ secondCheck: false })
                                    }
                                  />
                                ) : (
                                  <CheckBoxOutlineBlankIcon
                                    style={{ color: "#16C59B" }}
                                    onClick={() =>
                                      this.setState({ secondCheck: true })
                                    }
                                  />
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="secondAgrForm">
                          <Toggle>
                            <Vehicles
                              infoTitle="제 1조 (총칙)"
                              first="1. 개인정보란 생존하는 개인에 관한 정보로서 당해 정보에 포함되어 있는 성명에 의하여 당해 개인을 식별할 수 있는 정보 (당해 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함합니다.) 를 말합니다."
                              second="2. '헤쳐모여'는 귀하의 개인정보 보호를 매우 중요시하며, ‘정보통신망 이용촉진 및 정보보호에 관한 법률’ 상의 개인정보 보호규정 및 정보통신부가 제정한 ‘개인정보 보호지침’을 준수하고 있습니다."
                              third="3. '헤쳐모여'는 개인정보취급방침을 정하고 이를 귀하께서 언제나 쉽게 확인할 수 있게 공개하도록 하고 있습니다."
                              fourth="4. '헤쳐모여'는 개인정보 처리방침의 지속적인 개선을 위하여 개정하는데 필요한 절차를 정하고 있으며, 개인정보 처리방침을 회사의 필요한 사회적 변화에 맞게 변경할 수 있습니다. 그리고 개인정보처리방침을 개정하는 경우 버전번호 등을 부여하여 개정된 사항을 귀하께서 쉽게 알아볼 수 있도록 하고 있습니다."
                            />
                          </Toggle>
                          <div className="thirdAgreement">
                            <div className="keyAgreement">
                              마케팅 정보 수신 동의 (선택)
                            </div>
                            <div
                              className="valueAgreement"
                              style={{ fontWeight: "" }}
                            >
                              <span>
                                {this.state.thirdCheck == true ? (
                                  <CheckBoxIcon
                                    style={{ color: "#16C59B" }}
                                    onClick={() =>
                                      this.setState({ thirdCheck: false })
                                    }
                                  />
                                ) : (
                                  <CheckBoxOutlineBlankIcon
                                    style={{ color: "#16C59B" }}
                                    onClick={() =>
                                      this.setState({ thirdCheck: true })
                                    }
                                  />
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="thirdAgrForm">
                          <Toggle>
                            <Vehicles
                              infoTitle="'헤쳐모여' 프로모션 및 이벤트,
                        마케팅 정보 안내 등을 주 목적으로 하며 수신 동의 시
                        휴대폰 번호에 수신 동의 처리됩니다.
                        동의하실 경우에 회원가입과 서비스 이용이 가능하며 동의하신
                        이후에 정보 수신 시 안내에 따라 수신 동의를 철회할 수
                        있습니다."
                            />
                          </Toggle>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <Grid padding="15px 0px 5px" margin="10px 0px 0px 0px">
              <Link to="/signup">
                <Button
                  width="100%"
                  height="auto"
                  padding="12px 0"
                  bg={this.state.bg}
                  hoverBg={this.state.hoverBg}
                  radius="5px"
                  color={this.state.color}
                  className="custom_transition"
                  hoverColor={this.state.hoverColor}
                  fontSize="15px"
                  style={{ fontWeight: "bold", border: "none" }}
                  disabled={!this.state.allCheck}
                >
                  동의하고 가입하기
                </Button>
              </Link>
            </Grid>
            <Grid padding="15px 0px 5px">
              <Link to="/login">
                <Button
                  width="100%"
                  height="auto"
                  padding="12px 0"
                  bg="#16C59B"
                  radius="5px"
                  color="#FFFFFF"
                  className="custom_transition"
                  hoverColor="#16C59B"
                  fontSize="15px"
                  style={{ fontWeight: "bold", border: "none" }}
                >
                  취소
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Style>
    );
  }
}

const Style = styled.div`
  top: 10%;
  position: absolute;
  margin: auto;
  width: 100vw;
`;

export default Terms;
