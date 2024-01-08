// import React, { useState } from "react";
// import styled from "styled-components";
// import Searchicon from "../../images/SearchIcon.png";

// // const StyledSearchBox = styled.div`
// //   height: 8rem;
// //   width: 80rem;
// //   position: absolute;
// //   display: flex;
// // `;

// const InputBox = styled.div`
//   height: 8rem;
//   border: none;
//   position: relative;
//   display: flex;
//   width: 81rem;
// `;

// const SearchInput = styled.input`
//   background-color: #ffffff;
//   border: 1px solid #008bff;
//   border-radius: 3rem;
//   box-shadow: inset 0px 4px 4px #00000040;
//   height: 5rem;
//   left: 2rem;
//   position: relative;
//   display:flex;
//   top: 14px;
//   width: 72rem;
//   padding: 0 2rem;
//   font-size: 1.4rem;

//   /* 호버 효과 스타일 */
//   &:hover {
//     transform: scale(1.005);
//     cursor: pointer; /* 호버 시 마우스 커서 변경 */

//     /* 클릭 시 테두리 없애기 */
//     &:focus {
//       outline: none;
//     }

// `;

// const SearchButton = styled.button`
//   background-color: #008bff;
//   border-radius: 2rem;
//   color: white;
//   height: 4rem;
//    display: flex;
//   position: relative;
//   align-items: center;
//    top: 2rem;
//    right:4rem;
//   width: 4rem;
//   border: none;
//   transition: transform 0.3s ease; /* 호버 시 변화를 부드럽게 만들기 위한 transition 속성 */

//   /* 호버 효과 스타일 */
//   &:hover {
//     transform: scale(1.1); /* 호버 시 크기를 1.1배로 확대 */
//     cursor: pointer; /* 호버 시 마우스 커서 변경 */

//     /* 클릭 효과 스타일 */
//   &:active {
//     transform: scale(0.9); /* 클릭 시 크기를 0.9배로 축소 */
//   }
// `;

// const SearchIcon = styled.img`
//   width: 3rem;
//   height: 3rem;
//   position: relative;
//   display: flex;
//   // left: 0.4rem;
// `;

// const SearchBox = () => {
//   const [searchValue, setSearchValue] = useState("");

//   const handleInputChange = (e) => {
//     setSearchValue(e.target.value);
//   };

//   const handleSearch = () => {
//     console.log("검색어:", searchValue);
//     // 검색 버튼 클릭 시 동작할 내용을 작성합니다.
//     // 예를 들어, 검색 기능 구현 등
//   };

//   return (
//     // <StyledSearchBox>
//     <InputBox>
//       <SearchInput
//         type="text"
//         placeholder="관심있는 인디가수의 이름이나 곡 이름을 검색하세요."
//         value={searchValue}
//         onChange={handleInputChange}
//       />
//       <SearchButton onClick={handleSearch}>
//         <SearchIcon alt="검색돋보기" src={Searchicon} />
//       </SearchButton>
//     </InputBox>
//     // </StyledSearchBox>
//   );
// };

// export default SearchBox;
