import { useState } from "react";
import styled from "styled-components";

// 모달 전체 틀
export const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.height ? props.height : "100%")};
  font-family: "Noto Sans KR", sans-serif;
`;

// Modal 표시시 뒷배경 처리
export const ModalBackground = styled.div`
  z-index: 10; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(6px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

// Modal 오픈 버튼
export const ModalButton = styled.button`
  background-color: ${(props) => props.bgColor || "var(--mainblue)"};
  color: ${(props) => props.textColor || "white"};
  text-decoration: none;
  border: none;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  padding: ${(props) => props.padding || "1rem"};
  border-radius: 30px;
  font-size: ${(props) => props.fontSize || "1.5rem"};
  font-weight: 600;
  line-height: ${(props) => props.lineHeight || "auto"};
  cursor: grab;
`;

export const ExitButton = styled(ModalButton)`
  background-color: ${(props) => props.bgColor || "var(--mainblue)"};
  color: ${(props) => props.textColor || "white"};
  border-radius: 5rem;
  text-decoration: none;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.div.attrs((props) => ({ role: "dialog" }))`
  // Modal창 CSS를 구현합니다.
  display: flex;
  background-color: rgba(0, 0, 0, 0);
  align-items: center;
  flex-direction: column;
  border-radius: 2rem;
  width: auto;
  min-width: 30rem;
  max-width: 100rem;
  padding: 1rem;
  height: auto;
  background-color: #ffffff;
  > div.desc {
    margin: 4rem;
    font-size: 1.8rem;
  }
`;

export const ModalComponent = ({
  open,
  content,
  customButton,
  close,
  openButtonStyle,
  closeButtonStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false); // 모달창 열림 여부

  const openModalHandler = () => {
    // isOpen을 true로 설정, 모달창이 열림
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ModalContainer>
        <ModalButton onClick={openModalHandler} {...openButtonStyle}>
          {/* 클릭하면 Modal이 열린 상태(isOpen)를 boolean 타입으로 변경하는 메소드가 실행되어야 합니다. */}
          {open}
          {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때는 ModalBtn의 내부 텍스트가 'Opened!' 로 Modal이 닫힌 상태(isOpen이 false인 상태)일 때는 ModalBtn 의 내부 텍스트가 'Open Modal'이 되도록 구현 */}
        </ModalButton>
        {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때만 모달창과 배경이 뜰 수 있게 구현 */}
        {isOpen ? (
          <ModalBackground onClick={openModalHandler}>
            {/* event 버블링을 막는 메소드 */}
            <ModalView onClick={(e) => e.stopPropagation()}>
              <div className="desc">{content}</div>
              {customButton && (
                <ExitButton onClick={openModalHandler}>
                  {customButton}
                </ExitButton>
              )}
              <ExitButton onClick={openModalHandler} {...closeButtonStyle}>
                {close}
              </ExitButton>
            </ModalView>
          </ModalBackground>
        ) : null}
      </ModalContainer>
    </>
  );
};

export default ModalComponent;
