import {
  UserInfo,
  Button,
} from "../../style/performance/PerformanceUpdateStyle";

const UpdateUserInfo = () => {
  const point = 13201;
  const pointComma = point.toLocaleString(); // point 값에 천단위마다 콤마를 추가

  return (
    <>
      <UserInfo>
        <div className="image">{/* 프로필 이미지가 들어갈 부분 */}</div>
        <div className="leftInfo">
          <div className="authtitle">등급</div>
          <div className="nick">닉네임닉네임닉네임</div>
          <div className="heart">
            <div className="heartimg" />
            <div className="count">1000</div>
          </div>
          <div className="signdate">가입일 : date</div>
        </div>
        <div className="rightInfo">
          <div className="top">
            <div className="Cnt">
              공연횟수<cnt>10 </cnt>
            </div>
            <div className="Cnt">
              등록한 곡 <cnt>10</cnt>
            </div>
          </div>
          <div className="pointerZone">
            <div className="pointer" />
          </div>
          <div className="mid">
            <div className="authGage">
              <div className="gageBar" />
            </div>
            <div className="check">
              <div className="checker" />
              <div className="checker" />
              <div className="checker" />
              <div className="checker" />
            </div>
            <div className="auth">
              <div className="aut" style={{ transform: "translateX(-50%)" }}>
                일반회원
              </div>
              <div className="aut" style={{ transform: "translateX(-35%)" }}>
                아티스트
              </div>
              <div className="aut" style={{ transform: "translateX(-25%)" }}>
                뮤지션
              </div>
              <div className="aut" style={{ transform: "translateX(50%)" }}>
                스타
              </div>
            </div>
          </div>
        </div>
        <div className="pointZone">
          <div className="title">MY 포인트</div>
          <div className="point">{pointComma} P</div>
          <div className="buttonZone">
            <Button>충전하기</Button>
            <Button>환전하기</Button>
          </div>
        </div>
      </UserInfo>
    </>
  );
};

export default UpdateUserInfo;
