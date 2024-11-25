/**@jsx jsx */
import { jsx, css } from "@emotion/react";
import { QuestionData } from "@/app/components/QA/MockData/QuestionsData";
import { gray5, accent2 } from "../Styles/Styles";
import Question from "../QA/Question";
import React from "react";

interface Props {
  data: QuestionData[];
  showContent?: boolean;
  renderItem?: (item: QuestionData) => JSX.Element;
}

const QuestionList: React.FC<Props> = ({ data, showContent, renderItem }) => {
  // console.log("Rendering QuestionList", data, renderItem);
  return (
    <ul
      css={css`
        list-style: none;
        margin: 10px 0 0 0;
        padding: 0px 20px;
        background-color: #fff;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border-top: 3px solid ${accent2};
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
      `}
    >
      {data.map((question) => (
        <li key={question.questionId}>
          {/* if something bad happens look at this bit of code
          not entirely sure the ins and outs of this one */}
          {renderItem ? (
            renderItem(question)
          ) : (
            <Question data={question} showContent={true} />
          )}
        </li>
      ))}
      <li
        css={css`
          border-top: 1px solid ${gray5};
          :first-of-type {
            border-top: none;
          }
        `}
      ></li>
    </ul>
  );
};

export default QuestionList;
