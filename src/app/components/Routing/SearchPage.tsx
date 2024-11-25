/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import QuestionList from "./QuestionList";
import { searchQuestions, QuestionData } from "@/app/components/QA/MockData/QuestionsData";
import { Page } from "@/app/components/QA/child-components/Page";

export const SearchPage: React.FC<RouteComponentProps> = ({ location }) => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("criteria") || "";
  useEffect(() => {
    const doSearch = async (criteria: string) => {
      const foundResults = await searchQuestions(criteria);
      setQuestions(foundResults);
    };
    doSearch(search);
  }, [search]);
  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{search}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  );
};
