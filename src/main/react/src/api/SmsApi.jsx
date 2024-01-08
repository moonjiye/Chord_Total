import React, { useState } from "react";
import styled from "styled-components";

const STYLE = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
`;

const Button = styled.button`
  position: absolute;
  border: none;
  border-radius: 5px;
  right: 10px;
  top: 10px;
`;

const P = styled.p`
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
  margin-top: 2%;
  margin-left: 5%;
  color: black;
  margin-bottom: 5%;
`;

const Input = styled.input`
  border: 1px solid gray;
  border-radius: 10px;
  width: 60%;
  height: 40%;
`;

const SendButton = styled.button`
  border: none;
  border-radius: 10px;
  height: 40%;
  margin-left: 3%;
  cursor: pointer;
`;

// SMS를 보내는 기능을 담당하는 함수형 컴포넌트
const SmsApi = (props) => {
  // 속성
  const { close, tel, send, cn, cnum, onChangeCnum } = props;

  return (
    <STYLE>
      <Content>
        <P>
          입력하신 휴대 전화 번호로 인증번호를 보내기 위해, `인증번호` 버튼을
          눌러주세요.
        </P>
        <Button onClick={close}>&times;</Button>
      </Content>
      {/* 수신자 전화번호 입력란 */}
      <Content>
        <Input type="text" value={tel} />
        {/* SMS 전송 버튼 */}
        <SendButton onClick={send}>인증번호</SendButton>
      </Content>
      {/* SMS 내용 입력란 */}
      <Content>
        <Input
          type="text"
          value={cnum}
          onChange={onChangeCnum}
          placeholder="인증번호 입력"
        />
        <SendButton onClick={cn}>인증확인</SendButton>
      </Content>
    </STYLE>
  );
};

export default SmsApi;
