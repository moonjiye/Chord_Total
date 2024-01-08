import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
  display  : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* border: 1px solid black; */
`;

const ItemBox = styled.div`
  display  : flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const InnerBox = styled.div.attrs({
    className: "InnerBox",
})`
    display: flex;
    flex-direction: ${(props) => props.$flexDirection || "row"};
    align-items: ${(props)=> props.$alignItems || "center"};
    width: ${(props)=>props.$width || "50%"};
    height:100%;
`;

const SearchForm = styled.form`
    display: flex;
    align-items: center;
    margin-right: 10px;
`;

const SearchInput = styled.input`
    padding: 8px 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: white;
    color: #333;
    font-size: 16px;
    margin-left: 10px;
    &:focus {
        outline: none;
        border-color: #008bff;
    }
`;

const SearchButton = styled.button`
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 16px;
    margin-left: 8px;
    border: none;
    background-color: #ddd;
    cursor: pointer;
    &:hover {
        border-color: #ccc;
    }
`;

const UserSearch = ({
    setSearchQuery,
    
    }) => {
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const query = e.target.search.value.trim();
        console.log(query);
        if (query !== "") {
            setSearchQuery(query);
        }
    };
    
    return (
        <>
        <ItemContainer>
            <ItemBox>
                <InnerBox
                $width="100%"
                $flexDirection="row-reverse"
                $justifyContent="flex-start">
                </InnerBox>
            </ItemBox>
            <ItemBox>
                <InnerBox
                $width="100%"
                $flexDirection="row-reverse"
                $justifyContent="flex-start">
                    <SearchForm onSubmit={handleFormSubmit}>
                        <SearchInput
                            name="search"
                            type="text"
                            placeholder="Search..."
                        />
                        <SearchButton type="submit">검색</SearchButton>
                    </SearchForm>
                </InnerBox>
            </ItemBox>
        </ItemContainer>
        </>
    );
};


export default UserSearch;