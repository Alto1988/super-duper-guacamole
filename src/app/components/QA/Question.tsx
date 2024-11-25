/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { QuestionData } from '@/app/components/QA/MockData/QuestionsData';
import { gray2, gray3 } from '../Styles/Styles';
import React from 'react'
import {Link} from 'react-router-dom'


interface Props{
  data: QuestionData;
  showContent: boolean;
}

const Question: React.FC<Props> = ({ data, showContent = true }) => (
  <div css={css` 
  padding: 10px 0px;`}>
    <div css={css` 
    padding: 10px 0px;
    font-size: 19px;`}>
      <Link css={css` 
      text-decoration: none;
      color: ${gray2};`}
      to={`questions/${data.questionId}`}></Link>
      {data.title}
    </div>
    {showContent && (
      <div css={css`
      padding-bottom: 10px;
      font-size: 15px;
      color:${gray2};`}>
        {data.content.length > 50 ? `${data.content.substring(0, 50)}...`
          : data.content}
      </div>
    )}
    <div css={css` 
    font-size:12px;
    font-style:italic;
    color:${gray3};
    `}>
      {`Asked by ${data.userName} on ${data.created.toLocaleDateString()}`}
    </div>
  </div>
);


export default Question

