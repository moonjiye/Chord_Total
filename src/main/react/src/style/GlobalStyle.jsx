import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    
    body {
        margin: 0px;
        padding: 0px;
        font-family: 'Noto Sans KR', sans-serif;
        
    }

    html {
        font-size: 10px;   
    }

    :root {
        --maingreen: #61e6ca;
        --mainblue: #008bff;
        --mainsky: #82ccff;
        --mainolive: #97b0aa;
        --maindarkgreen: #354b45;
        --darknavy: #0f222d;
        --gradient: linear-gradient(to right, #61e6ca, #008bff); // background: var(--gradient); 형식으로 배경색 지정 가능
    }
`;

export default GlobalStyle;
 