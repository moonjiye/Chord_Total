import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

const KAKAO = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  /* height: 300px; */
`;

const Content = styled.div`
  width: 100%;
  height: 50%;
`;

const Input = styled.input`
  border: ${(props) => props.border || "none"};
  border-radius: 20px;
  width: ${(props) => props.width || "50%"};
  height: ${(props) => props.height || "30%"};
  margin-right: 15%;
  margin-bottom: ${(props) => props.marginBottom || "10%"};
`;

const Button = styled.button`
  border: none;
  border-radius: 10px;
  width: 30%;
  height: 3rem;
  cursor: pointer;
`;

// 카카오 주소 찾기
const KakaoAddr = (props) => {
  const [isTrue, setIsTrue] = useState(false);
  // 카카오 props
  const { onAddress, onDetailAddress } = props;

  // 주소 입력
  const [address, setAddress] = useState("");
  // 상세 주소 입력
  const [detailAddress, setDetailAddress] = useState("");
  const onChangeDetailAddress = (e) => {
    setDetailAddress(e.target.value);
  };

  // 주소 입력
  const handleComplete = (data) => {
    // 선택한 주소 정보 처리
    console.log(data);
    // R타입이 true
    if (data.addressType === "R") {
      setAddress(data.address);
    } else {
      alert("주소를 다시 입력하시오.");
    }
  };

  //
  useEffect(() => {
    //
    onAddress(address);
    onDetailAddress(detailAddress);
  }, [address, detailAddress, onAddress, onDetailAddress]);

  // 상세 주소 저장
  const saveAddr = () => {
    if (address !== null && detailAddress !== null) {
      alert("주소가 저장되었습니다.");
    } else {
      if (address === null) {
        alert("주소를 입력하시오");
      } else {
        alert("상세 주소를 입력하시오");
      }
    }
  };
  return (
    <KAKAO>
      <Content>
        <Input
          type="text"
          onClick={() => setIsTrue(true)}
          placeholder="주소를 입력합니다."
          value={address}
          width="50%"
          border="1px solid gray"
          height="3rem"
        />
        <Button onClick={() => setIsTrue(true)}>주소 찾기</Button>
        {isTrue && <DaumPostcode onComplete={handleComplete} />}
      </Content>
      <Content>
        <Input
          type="text"
          onClick={() => setIsTrue(true)}
          value={detailAddress}
          width="50%"
          height="3rem"
          border="1px solid gray"
          placeholder="상세 주소를 입력합니다."
          onChange={onChangeDetailAddress}
          marginBottom="0%"
        />
        <Button onClick={saveAddr}>주소 저장</Button>
      </Content>
    </KAKAO>
  );
};

export default KakaoAddr;
