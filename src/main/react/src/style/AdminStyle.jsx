import styled from "styled-components"

export const Container = styled.div`
   background-color: #e7e7e7;
   display: flex;
`;

export const SideMenu = styled.div`
   width: 20rem;
   height: 100vh;
   background-color: var(--mainblue);
   display: flex;
   flex-direction: column;
   align-items: center;
   button {
      width: 100%;
      height: 5rem;
      border: none;
      background-color: var(--mainblue);
      color: white;
      font-size: 1.5rem;
      font-weight: 500;
      &:hover {
         background-color: white;
         color: var(--mainblue);
      }
      &:active {
         box-shadow: inset 0 1rem 4rem  var(--mainsky);
         color: var(--mainblue);
      }
   }
`;

export const InfoBox = styled.div`
   flex: 1;
   height: 100vh;
   display: flex;
   flex-direction: column;
   align-items: center;
   .top {
      width: 90%;
      height: 8rem;
      display: flex;
      .left{
         width: auto;
         margin-right: 4rem;
         height: 100%;
         display: flex;
         flex-direction: column;
         justify-content: flex-end;
       
         .title{
            text-align: bottom;
            font-size: 3rem;
            font-weight: 900;
            color: #555555;
         }
      }
      .right{
         flex:1;
         display: flex;
         height: 100%;
         align-items: flex-end;
         justify-content: space-between;
         button{
            width: auto;
            height: 3rem;
            border-radius: 0.8rem;
            background-color: var(--mainblue);
            border: none;
            font-size: 1.3rem;
            font-weight: 500;
            padding: 2rem;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
         }
         .buttonzone{
            display: flex;
            gap: 1rem;
            width: auto;
         }

      }
   }
   .info{
      flex: 1;
      width: 90%;
      margin: 2rem 0rem;
      background-color: white;
      border-radius: 1.2rem;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
   
   }
`;