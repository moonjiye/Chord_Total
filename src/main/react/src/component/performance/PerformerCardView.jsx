import { useNavigate } from "react-router-dom"
import styled from "styled-components";

const CardView = styled.div`
  width: 40rem;
  height: 12.3rem;
  display: flex;
  align-items: center;
  margin-top: 3rem;
  @media screen and (max-width: 767px) {
        width: 80vw;
        height: 30vw;
        margin-top: 5vw;
    }
`

const ProfileImage = styled.img`
  width: 12.3rem;
  height: 12.3rem;
  border-radius: 50%;
  background-color: lightgray;
  @media screen and (max-width: 767px) {
        width: 20vw;
        height: 20vw;
        margin-top: 5vw;
              }
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.05s ease-in-out;
            }

`

const Nickname = styled.div`
  font-size: 2.3rem;
  font-weight: 500;
  margin-left: 2rem;
  color: black;
  @media screen and (max-width: 767px) {
    font-size: 4vw;
    margin-left: 4vw;
            }
  &:hover {
    cursor: pointer;
  }

`

const PerformerCardView = ({
  profileImage,
  nickname,
  email,
  loginEmail
}) => {
  console.log("퍼포머 카드뷰 : ", "profileImage : ", profileImage, "nickname : ", nickname)
  const navigate = useNavigate();

  const handlePerformerClick = () => {
    if (loginEmail === email) {navigate("/mypage");
  } else {
    navigate(`/otherpage/${email}`);
  }
};

return (
  <>
    <CardView>
      <ProfileImage onClick={handlePerformerClick} src={profileImage} alt={`${nickname} 프로필`}/>
      <Nickname onClick={handlePerformerClick}>{nickname}</Nickname>

    </CardView>
  </>  
)
}

export default PerformerCardView;
