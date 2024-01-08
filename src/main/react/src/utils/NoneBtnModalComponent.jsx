import { useState } from "react";
import styled from "styled-components";

// 모달 전체 틀
export const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: "Noto Sans KR", sans-serif;
`;

// Modal 표시시 뒷배경 처리
export const ModalBackground = styled.div`
  z-index: 5; //위치지정 요소
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
// 사용법
/*
사용하고자 하는 파일에서 아래와 같이 useState를 선언합니다.
ex// const [isModalOpen, setIsModalOpen] = useState(false);
모달컴포넌트를 선언할 때 
<NoneBtnModalComponent 
      isOpen={isModalOpen} // useState로 선언한 변수를 isOpen에 넣습니다.
      setIsOpen={setIsModalOpen} // useState로 선언한 변수를 setIsOpen에 넣습니다.
      content="공연 등록이 완료되었습니다." // 모달창에 표시할 내용을 content에 넣습니다.
      close={{ func: closeModalAndNavigate, text: "닫기"}}  // 모달창을 닫을 때 실행할 함수와 버튼에 표시할 텍스트를 close에 넣습니다.
      func 또는 text 하나씩 단독사용도 가능합니다.
      customButton="확인" // 모달창에 표시할 버튼 텍스트를 customButton에 넣습니다. 안 써도 됩니다.
      closeButtonStyle={{ bgColor: "blue", textColor: "white" }} // 모달창을 닫을 때 버튼의 배경색과 글자색을 설정합니다. 따로 사용하지 않으면
      기본 스타일이 적용됩니다. 배경과 글자색만 쓸 수 있습니다.
    />
    아래와 같이 설정합니다.
*/
export const NoneBtnModalComponent = ({
  isOpen,
  setIsOpen,
  content,
  customButton,
  close,
  closeButtonStyle,
}) => {
  const closeModalHandler = () => {
    setIsOpen(false);
    if (close && close.func) {
      close.func();
    }
  };
  const customButtonHandler = () => {
    if ( customButton && customButton.func) {
      customButton.func();
    }
  }

  return (
    <>
      <ModalContainer>
        {isOpen ? (
          <ModalBackground onClick={closeModalHandler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <div className="desc">{content}</div>
              {customButton && (
                <ExitButton onClick={customButtonHandler}>
                  {customButton && customButton.text}
                </ExitButton>
              )}
              <ExitButton onClick={closeModalHandler} {...closeButtonStyle}>
                {close && close.text}
              </ExitButton>
            </ModalView>
          </ModalBackground>
        ) : null}
      </ModalContainer>
    </>
  );
};

export default NoneBtnModalComponent;
