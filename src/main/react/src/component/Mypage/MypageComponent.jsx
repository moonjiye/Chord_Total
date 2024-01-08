import {
  Button,
  ButtonBox,
  ButtonContainer,
  CardButton,
  CardContainer,
  CardMembers,
  CardTitle,
  ChatContainer,
  ChatHeader,
  ChatingContainer,
  CloseButton,
  Container,
  ContentContainer,
  Input,
  ItemList,
  ItemSlider,
  ItemSlider2,
  ItemText1,
  ItemText2,
  ItemText3,
  ItemTextContainer,
  Message,
  MessagesContainer,
  NameText,
  NextArrow,
  PerformanceBox,
  PerformanceButton,
  PerformancePicture,
  PerformancePictureBox,
  PerformanceText1,
  PerformanceText2,
  PerformanceText3,
  PerformanceText4,
  PerformanceTextBox,
  Picture,
  PrevArrow,
  RegButton,
  SendButton,
  SubTitle,
  Title,
} from "../../style/MyPageStyle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import MemberInfoAxiosApi from "../../axios/MemberInfoAxios";
import ModalComponent from "../../utils/ModalComponent";
import { ReactComponent as Edit } from "../../images/Edit.svg";
import Common from "../../utils/Common";

const MypageComponent = ({ userInfo, userMusic, userPerformance }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();
  const [chatRoomTitle, setChatRoomTitle] = useState("");
  const [email, setEmail] = useState(null);

  const [sender, setSender] = useState("");
  const [roomName, setRoomName] = useState(""); // 채팅방 이름
  const ws = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [chatList, setChatList] = useState([]);
  const [enterRoomId, setEnterRoomId] = useState("");

  const onChangMsg = (e) => {
    setInputMsg(e.target.value);
  };

  const onEnterKey = (e) => {
    if (e.key === "Enter" && inputMsg.trim() !== "") {
      e.preventDefault();
      onClickMsgSend(e);
    }
  };
  const onClickMsgSend = (e) => {
    console.log(enterRoomId);
    console.log(sender);
    console.log(inputMsg);

    ws.current.send(
      JSON.stringify({
        type: "TALK",
        roomId: enterRoomId,
        sender: sender,
        message: inputMsg,
      })
    );

    setInputMsg("");
  };
  const onClickMsgClose = () => {
    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          type: "CLOSE",
          roomId: enterRoomId,
          sender: sender,
          message: "종료 합니다.",
        })
      );
      ws.current.close();
      navigate(0);
    }
  };

  // 화면 하단으로 자동 스크롤
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const getChatRoom = async () => {
      try {
        const rsp = await MemberInfoAxiosApi.chatListByOwnerId(userInfo.id);
        const chatRoomList = rsp.data;

        // 방 목록을 업데이트
        setChatRooms(chatRoomList);

        // 룸 아이디를 추출하고 각각의 룸에 대해 세션 counts를 가져옴
        chatRoomList.forEach(async (room) => {
          const response = await MemberInfoAxiosApi.chatSessionCount(
            room.roomId
          );
          const updatedRoom = { ...room, sessionCount: response.data };

          // 업데이트된 룸 정보를 이용하여 채팅방 목록을 업데이트
          setChatRooms((prevChatRooms) =>
            prevChatRooms.map((prevRoom) =>
              prevRoom.roomId === room.roomId ? updatedRoom : prevRoom
            )
          );
        });
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    const intervalID = setInterval(getChatRoom, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [userInfo]);

  useEffect(() => {
    // 채팅방 정보 가져 오기
    const getChatRoom = async () => {
      try {
        const rsp = await MemberInfoAxiosApi.chatDetail(enterRoomId);
        setRoomName(rsp.data.name);
      } catch (error) {
        if (enterRoomId) console.log(error);
      }
    };

    getChatRoom();
  });

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(Common.SOCKET_CHAT_URL);
      ws.current.onopen = () => {
        console.log("connected to " + Common.SOCKET_CHAT_URL);
      };
      setSocketConnected(true);
    }

    ws.current.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      console.log(data.message);
      setChatList((prevItems) => [...prevItems, data]);
    };
  }, [socketConnected]);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatList]);
  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.userEmail);
      setSender(userInfo.userNickname);
    }
  }, [userInfo]);
  const enterChatRoom = (roomId) => {
    console.log(`Entering chat room ${roomId}`);
    setEnterRoomId(roomId);
    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          type: "ENTER",
          roomId: roomId,
          sender: sender,
          message: "처음으로 접속 합니다.",
        })
      );
      setChatList([]);

      loadPreviousChat(roomId);
    }
  };
  // 이전 채팅 내용을 가져오는 함수
  const loadPreviousChat = async (roomId) => {
    try {
      const res = await MemberInfoAxiosApi.recentChatLoad(roomId);
      const recentMessages = res.data;
      setChatList((prevMessages) => [...prevMessages, ...recentMessages]);
    } catch (error) {
      console.error("Failed to load previous chat:", error);
    }
  };
  // 세션 counts 가져오는 api
  const fetchSessionCounts = async () => {
    const updatedChatRooms = await Promise.all(
      chatRooms.map(async (room) => {
        const response = await MemberInfoAxiosApi.chatSessionCount(room.roomId);
        // console.log(response.data);
        return { ...room, sessionCount: response.data };
      })
    );

    setChatRooms(updatedChatRooms);
    // console.log(chatRooms);
  };
  const handleCreateChatRoom = async () => {
    const response = await MemberInfoAxiosApi.chatCreate(email, chatRoomTitle);
    console.log(response.data);
    navigate(0);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7, // 한 줄에 보여질 아이템 수
    slidesToScroll: 7, // 슬라이드할 때 한 번에 넘어갈 아이템 수
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 768, // 화면 크기가 768px 이하일 때
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
        },
      },
    ],
  };
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <ContentContainer>
        <NameText>
          {userInfo && userInfo.userNickname}
          <Edit />
        </NameText>
        <SubTitle>
          노래 {userMusic ? userMusic.length : 0}
          <RegButton>음원 등록</RegButton>
        </SubTitle>
        {userMusic && userMusic.length >= 10 ? (
          <Slider {...settings}>
            {userMusic.map((music, index) => (
              <ItemSlider key={index}>
                <ItemTextContainer>
                  <Picture bgimg={music.musicDTO.thumbnailImage} />
                  <ItemText1>{music.musicDTO.musicTitle}</ItemText1>
                  <ItemText2>
                    {music.userResDto && music.userResDto.userNickname}
                  </ItemText2>
                  <ItemText3>{music.musicDTO.genre}</ItemText3>
                </ItemTextContainer>
              </ItemSlider>
            ))}
          </Slider>
        ) : (
          <ItemList>
            {userMusic &&
              userMusic.map((music) => (
                <div key={music.musicId}>
                  <Picture bgimg={music.musicDTO.thumbnailImage} />
                  <ItemTextContainer>
                    <ItemText1>{music.musicDTO.musicTitle}</ItemText1>
                    <ItemText2>
                      {music.userResDto && music.userResDto.userNickname}
                    </ItemText2>
                    <ItemText3>{music.musicDTO.genre}</ItemText3>
                  </ItemTextContainer>
                </div>
              ))}
          </ItemList>
        )}
        <SubTitle>
          공연{" "}
          {userPerformance && userPerformance.performances
            ? userPerformance.performances.length
            : 0}
          <RegButton>공연 등록</RegButton>
        </SubTitle>
        {userPerformance &&
        userPerformance.performances &&
        userPerformance.performances.length >= 5 ? (
          <Slider {...settings2}>
            {userPerformance.performances.map((performance, index) => (
              <ItemSlider2 key={index}>
                <PerformanceBox>
                  <PerformancePictureBox>
                    <PerformancePicture src={performance.performanceImage} />
                  </PerformancePictureBox>
                  <PerformanceTextBox>
                    <PerformanceText1>
                      {performance.performanceName}
                    </PerformanceText1>
                    <PerformanceText2>{performance.venue}</PerformanceText2>
                    <PerformanceText3>
                      {performance.nicknames.join(", ")}
                    </PerformanceText3>
                    <PerformanceText4>
                      {performance.performanceDate}
                    </PerformanceText4>
                    <ButtonBox>
                      <PerformanceButton>공연 종료</PerformanceButton>
                      <RegButton>자세히</RegButton>
                    </ButtonBox>
                  </PerformanceTextBox>
                </PerformanceBox>
              </ItemSlider2>
            ))}
          </Slider>
        ) : userPerformance && userPerformance.performances ? (
          userPerformance.performances.map((performance, index) => (
            <ItemSlider2 key={index}>
              <PerformanceBox>
                <PerformancePictureBox>
                  <PerformancePicture src={performance.performanceImage} />
                </PerformancePictureBox>
                <PerformanceTextBox>
                  <PerformanceText1>
                    {performance.performanceName}
                  </PerformanceText1>
                  <PerformanceText2>{performance.venue}</PerformanceText2>
                  <PerformanceText3>
                    {performance.nicknames.join(", ")}
                  </PerformanceText3>
                  <PerformanceText4>
                    {performance.performanceDate}
                  </PerformanceText4>
                  <ButtonBox>
                    <PerformanceButton>공연 종료</PerformanceButton>
                    <RegButton>자세히</RegButton>
                  </ButtonBox>
                </PerformanceTextBox>
              </PerformanceBox>
            </ItemSlider2>
          ))
        ) : null}
        <SubTitle>
          채팅방
          <ModalComponent
            open={<RegButton>채팅 등록</RegButton>}
            content={
              <Container>
                <Title>채팅방 생성</Title>
                <Input
                  type="text"
                  value={chatRoomTitle}
                  onChange={(e) => setChatRoomTitle(e.target.value)}
                />
                <ButtonContainer>
                  <Button onClick={handleCreateChatRoom}>확인</Button>
                </ButtonContainer>
              </Container>
            }
            openButtonStyle={{
              bgColor: "rgba(0,0,0,0)",
              textColor: "black",
            }}
            close="닫기"
          />
        </SubTitle>
        <ChatingContainer>
          {chatRooms.map((room) => (
            <CardContainer key={room.roomId}>
              <div>
                <CardTitle>{room.name}</CardTitle>
                <CardMembers>채팅방 인원: {room.sessionCount}명</CardMembers>
              </div>
              <ModalComponent
                open={
                  <CardButton onClick={() => enterChatRoom(room.roomId)}>
                    입장하기
                  </CardButton>
                }
                content={
                  <ChatContainer>
                    <ChatHeader>{roomName}</ChatHeader>
                    <MessagesContainer ref={chatContainerRef}>
                      {chatList.map((chat, index) => (
                        <Message key={index} isSender={chat.sender === sender}>
                          {`${chat.sender} > ${chat.message}`}
                        </Message>
                      ))}
                    </MessagesContainer>
                    <div>
                      <Input
                        placeholder="메세지 전송"
                        value={inputMsg}
                        onChange={onChangMsg}
                        onKeyUp={onEnterKey}
                      />
                      <SendButton onClick={onClickMsgSend}>전송</SendButton>
                    </div>
                    <CloseButton onClick={onClickMsgClose}>
                      채팅 종료 하기
                    </CloseButton>
                  </ChatContainer>
                }
                openButtonStyle={{
                  bgColor: "rgba(0,0,0,0)",
                  textColor: "black",
                }}
                // close="닫기"
              />
            </CardContainer>
          ))}
        </ChatingContainer>
      </ContentContainer>
    </>
  );
};

export default MypageComponent;
