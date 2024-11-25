/**@jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/react";
import { PrimaryButton } from "../Styles/Styles";
import QuestionList from "../Routing/QuestionList";
import { QuestionData } from "@/app/components/QA/MockData/QuestionsData";
import { Page } from "@/app/components/QA/child-components/Page";
import { PageTitle } from "@/app/components/QA/child-components/PageTitle";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  getUnansweredQuestionsActionCreator,
  AppState,
} from "../../redux-files/Store";

interface Props extends RouteComponentProps {
  getUnansweredQuestions: () => Promise<void>;
  questions: QuestionData[] | null;
  questionsLoading: boolean;
}

const QADashboard: React.FC<Props> = ({
  history,
  questions,
  questionsLoading,
  getUnansweredQuestions,
}) => {
  useEffect(() => {
    if (questions === null) {
      getUnansweredQuestions();
    }
  }, [questions, getUnansweredQuestions]);
  const handleAskQuestionClick = () => {
    history.push("/ask");
  };
  return (
    <Page>
      <div
        css={css`
          margin: 50px auto 20px auto;
          padding: 30px 20px;
          max-width: 600px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <PageTitle>Unanswered Questions</PageTitle>
          <PrimaryButton onClick={handleAskQuestionClick}>
            Ask a question
          </PrimaryButton>
        </div>
        {/* <QuestionList data={questions || []}/> */}
      </div>
      {questionsLoading ? (
        <div
          css={css`
            font-size: 16px;
            font-style: italic;
          `}
        >
          Loading...
        </div>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  );
};

const mapStateToProps = (store: AppState) => {
  return {
    questions: store.questions.unanswered,
    questionLoading: store.questions.loading,
  };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getUnansweredQuestions: () =>
      dispatch(getUnansweredQuestionsActionCreator()),
  };
};

// export default QADashboard
export default connect(mapStateToProps, mapDispatchToProps)(QADashboard);
