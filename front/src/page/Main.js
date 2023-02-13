import React, { useEffect, useState } from "react";
import HeaderBox from "../component/HeaderBox";
import MainBodyBox from "../component/MainBodyBox";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import { mainInfo } from "../redux/reducers/question";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import { questionAction } from "../redux/actions/questionAction";
const Item = styled(Container)(({ theme }) => ({
  backgroundColor: "#f6edff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const mainbodylist = [
  {
    title: "Real-Time Collaboration",
    mention: "코딩하면서 생긴 궁금증을 해결하고 싶어요",
    img: "/img/main1.png",
  },
  {
    title: "Check Your Error",
    mention:
      "왜 틀린건지,무엇을 잘못한건지, 다른 방법이 궁금한지, 찾지말고 물어보세요",
    img: "/img/main2.png",
  },
  {
    title: "Make Your Answer",
    mention:
      "Make Your Answer,1:1로 해설을 듣고,1:1로 필기를 받고,1:1로 정답을 만들어서,당신만의 정답을 만드세요",
    img: "/img/main3.png",
  },
];

const Main = () => {
  const [donequestion, setdonequestion] = useState(0);
  const [doingquestion, setdoingquestion] = useState(0);
  const dispatch = useDispatch();
  const questionList = useSelector((state) => state.question.questions);
  const usercount = useSelector((state) => state.question.usercount);
  const getallQuestions = () => {
    dispatch(questionAction.getQuestions());
  };
  const getuserCount = () => {
    dispatch(questionAction.userCount());
  };
  const distinctUser = () => {
    for (let i = 0; i < questionList.length; i++) {
      if (questionList[i]["progress"] == 0) {
        setdoingquestion(i);
        console.log(i,'true')
      } else {
        setdonequestion(i);
      }
    }
  };
  useEffect(() => getallQuestions(), []);
  useEffect(() => getuserCount(), []);
  useEffect(() => distinctUser(), [questionList]);

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#f6edff" }}>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={4}>
          <Item>
            <PeopleIcon sx={{ fontSize: 50 }}></PeopleIcon>
            <HeaderBox icon="faUser" title="전체회원" number={usercount} />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <LibraryBooksIcon sx={{ fontSize: 50 }}></LibraryBooksIcon>
            <HeaderBox
              icon="faGraduationCap"
              title="진행중인질문"
              number={doingquestion}
            />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <SchoolIcon sx={{ fontSize: 50 }}></SchoolIcon>
            <HeaderBox icon="Book" title="완료된질문" number={donequestion} />
          </Item>
        </Grid>
        <Grid item xs={12} sx={{ flexGrow: 1, backgroundColor: "#ffffff" }}>
          <Item sx={{ flexGrow: 1, backgroundColor: "#ffffff" }}>
            {" "}
            {mainbodylist.map((item) => (
              <MainBodyBox
                title={item.title}
                mention={item.mention}
                img={item.img}
                key={item.title}
              />
            ))}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
