import { useNavigate } from "react-router-dom";
import MainAxios from "../../axios/MainAxios";
import AxiosApi from "../../axios/PerformanceAxios";
import { UserInfo, Button } from "../../style/performance/PerformanceUpdateStyle";
import { useEffect, useState } from "react";

const UpdateUserInfo = ({ userList }) => {



  const userEmail = localStorage.getItem('email'); // 로컬 스토리지에서 이메일을 가져옵니다.
  const userArray = userList.filter(user => user.userEmail === userEmail); // 이메일이 일치하는 회원 정보를 찾습니다.
  const user = userArray[0] || {}; // 일치하는 회원 정보를 저장합니다.
  console.log(user); // 일치하는 회원 정보를 출력합니다.
  console.log(user.profileImg);
  const [performerList, setPerformerList] = useState([]); // 퍼포머 정보를 저장할 상태를 선언합니다.
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerformerList = async () => {
      try {
        const response = await AxiosApi.getPerformerList(); // 퍼포머 정보를 가져옵니다.
        setPerformerList(response.data); // 퍼포머 정보를 상태에 저장합니다.
        console.log("전체공연자조회결과: ", response.data);
      } catch (error) {
        console.error('Error fetching performer list', error);
      }
    };
    fetchPerformerList(); // 퍼포머 정보를 가져오는 함수를 호출합니다.
  }, []);

  const performer = performerList.filter(performer => performer.performer === user.userNickname); // 이메일이 일치하는 퍼포머 정보를 찾습니다.
  console.log("퍼포머정보: ", performer); // 일치하는 퍼포머 정보를 출력합니다.



  const point = user.userPoint;
  const pointComma = point ? point.toLocaleString() : '0'; // point 값에 천단위마다 콤마를 추가

  const [allMusic, setAllMusic] = useState([]); // 모든 노래정보 저장
  useEffect(() => {
    // 컴포넌트가 마운트될 때 노래정보를 불러옵니다.
    const allMusicList = async () => {
        try {
            console.log("전체노래조회");
            const response = await MainAxios.heartSong();
            setAllMusic(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching performance list', error);
        }
    };
    allMusicList();
}, []);
  console.log("노래정보 저장값 확인 : ", allMusic)
  console.log("닉네임정보 확인 : ", user.userNickname)
  const userNickname = user.userNickname; // 이 부분에 원하는 사용자 닉네임을 넣으세요

  const totalHeartCount = allMusic.reduce((total, music) => {
    if (music.userResDto.userNickname === userNickname) {
     return total + music.musicDTO.heartCount;
    }
    return total;
  }, 0);

console.log(totalHeartCount);
console.log(allMusic.length);

const gage = `${totalHeartCount * 10  / 5}%`;

const goMyPage =() => {
  navigate("/mypage");
}

return (
  <>
    <UserInfo>
      <div className="image">
      <img
            src={user.profileImg}
            style={{ width: "100%", height: "100%", objectFit: "cover"}}
          />
      </div>
      <div className="leftInfo">
        <div className="authtitle">{user.authority}</div>
        <div className = "nick">{user.userNickname}</div>
        <div className ="heart">
          <div className="heartimg"/>
          <div className="count">{totalHeartCount}</div>
        </div>
        {/* <div className="signdate">가입일 : date</div> */}
      </div>
      <div className="rightInfo">
        <div className="top">
          <div className="Cnt">공연횟수<cnt>{performer.length}</cnt></div>
          <div className="Cnt">등록한 곡 <cnt>{allMusic.length}</cnt></div>
        </div>
        <div className="pointerZone">
          <div className="pointer" style={{ left : gage }}/>
        </div>
        <div className="mid">
          <div className="authGage">
            <div className="gageBar" style={{ width: gage }}/>
          </div>
          <div className="check">
            <div className="checker"/>
            <div className="checker"/>
            <div className="checker"/>
            <div className="checker"/>
          </div>
          <div className="auth">
            <div className="aut" style = {{transform: "translateX(-50%)"}}>일반회원</div>
            <div className="aut" style = {{transform: "translateX(-35%)"}}>아티스트</div>
            <div className="aut" style = {{transform: "translateX(-25%)"}}>뮤지션</div>
            <div className="aut" style = {{transform: "translateX(50%)"}}>스타</div>
          </div>
        </div>
      </div>
      <div className="pointZone">
        <div className="title">MY 포인트</div>
        <div className="point">{pointComma} P</div>
        <div className="buttonZone">
          <Button onClick={goMyPage}>마이페이지</Button>
        </div>
      </div>
    </UserInfo>
  </>
);

};

export default UpdateUserInfo;
