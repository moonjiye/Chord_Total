import "react-quill/dist/quill.snow.css";

import {
  CancelButton,
  CategorySelect,
  Line,
  NoneLogin,
  StyledReactQuill,
  WriteBorder,
  WriteButton,
  WriteContainer,
  WriteHeading,
  WriteHeadingText,
  WriteSection,
} from "../../style/CommunityPostWriteStyle";
import { useState, useEffect, useRef } from "react";
import AxiosApi from "../../axios/CommunityAxios";
import { useNavigate } from "react-router-dom";

const WriteComponent = () => {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const quillRef = useRef(null);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const rsp = await AxiosApi.cateList();
        setCategories(rsp.data);
        setSelectedCategory(rsp.data[0].categoryId);
      } catch (error) {
        console.log(error);
      }
    };

    const quillInstance = quillRef.current.getEditor();
    const changeHandler = function () {
      // 편집기 내용에서 이미지와 동영상 태그 찾기
      const Delta = quillInstance.getContents();
      const mediaTags = [];

      Delta.ops.forEach((op) => {
        if (op.insert && op.insert.image) {
          mediaTags.push(op.insert.image);
        }
        if (op.insert && op.insert.video) {
          mediaTags.push(op.insert.video);
        }
      });

      // content에서 이미지와 동영상 태그 제거하고 상태 업데이트
      const textOnly = quillInstance.getText();
      setText(textOnly);
      console.log(textOnly);
    };

    quillInstance.on("text-change", changeHandler);

    getCategories();

    return () => {
      // Cleanup function
      quillInstance.off("text-change", changeHandler);
    };
  }, []);
  const PostRegister = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    if (!email && (!nickName.trim() || !password.trim())) {
      alert("닉네임과 비밀번호를 입력하세요.");
      return;
    }
    const communityDTO = {
      email: email,
      title: title,
      content: content,
      text: text,
      categoryId: selectedCategory,
      nickName: nickName,
      password: password,
    };
    try {
      const response = await AxiosApi.communityPost(communityDTO);
      console.log(response.data);
      if (response.status === 200) {
        alert("게시글이 등록되었습니다.");
        navigate("/");
      }
    } catch (error) {
      alert("게시글 등록에 실패했습니다.");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // 헤더 레벨을 드롭다운 메뉴로
      ["bold", "italic", "underline", "strike"], // 텍스트 스타일 버튼
      [{ color: [] }, { background: [] }], // 색상 선택을 드롭다운 메뉴로
      [{ font: [] }], // 폰트 선택을 드롭다운 메뉴로
      [{ align: [] }], // 정렬 선택을 드롭다운 메뉴로
      ["link", "image", "video"], // 링크, 이미지, 동영상 업로드 버튼
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      ["clean"], // 포맷 초기화 버튼
    ],
  };
  return (
    <>
      <WriteContainer>
        <WriteSection>
          <WriteHeading>
            <WriteHeadingText>게시글 작성</WriteHeadingText>
          </WriteHeading>
          <Line />
          <CategorySelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </CategorySelect>
          {!email && (
            <NoneLogin>
              <WriteBorder
                width={"50%"}
                type="text"
                placeholder="닉네임"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
              <WriteBorder
                width={"50%"}
                type="password"
                placeholder="패스워드"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </NoneLogin>
          )}
          <WriteBorder
            placeholder="제목을 입력해주세요."
            onChange={(e) => setTitle(e.target.value)}
          />
          <StyledReactQuill
            ref={quillRef}
            defaultValue={content}
            onChange={(value) => setContent(value)}
            modules={modules}
          />
          <CancelButton onClick={() => navigate("/")}>
            <div className="front">취소</div>
            <div className="back">cancel</div>
          </CancelButton>
          <WriteButton onClick={PostRegister}>
            <div className="front">등록</div>
            <div className="back">submit</div>
          </WriteButton>
        </WriteSection>
      </WriteContainer>
    </>
  );
};

export default WriteComponent;
