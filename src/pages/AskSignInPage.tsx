import React, { useEffect } from "react";
import { Page } from "@/app/components/QA/child-components/Page";
import { Form, minLength, required, Values, SubmitResult } from "../app/components/QA/Form";
import { Field } from "../app/components/QA/Field";
import { PostQuestionData, QuestionData } from "@/app/components/QA/MockData/QuestionsData";
import {
  postQuestionActionCreator,
  AppState,
  clearPostedQuestionActionCreator,
} from "../app/redux-files/Store";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import {AnyAction} from "redux";

//Start of interfaces
interface Props {
  postQuestion: (question: PostQuestionData) => Promise<void>;
  postQuestionResult?: QuestionData;
  clearPostedQuestion: () => void;
}

//End of interfaces

export const AskSignInPage: React.FC<Props> = ({
  postQuestion,
  postQuestionResult,
  clearPostedQuestion,
}) => {
  //Start of events
  const handleSubmit = async (values: Values): Promise<SubmitResult> => {
    try {
      await postQuestion({
        title: values.title,
        content: values.content,
        userName: "Fred",
        created: new Date(),
      });
      return {success: true};
    } catch {
      return {success: false};
    }
  };
  useEffect(() => {
    return function cleanup() {
      clearPostedQuestion();
    };
  }, [clearPostedQuestion]);

  //End of Events

  let submitResult: SubmitResult | undefined;
  if (postQuestionResult) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitResult = { success: true };
  }
  return (
    <Page title="Ask a question">
      <Form
        submitCaption="Submit Your Question"
        validationRules={{
          title: [{ validator: required }, { validator: minLength, arg: 10 }],
          content: [{ validator: required }, { validator: minLength, arg: 50 }],
        }}
        onSubmit={handleSubmit}
        failureMessage="There was a problem..."
        successMessage="Your question was successfully submitted"
      >
        <Field name="title" label="Title" />
        <Field name="content" label="Content" type="TextArea" />
      </Form>
    </Page>
  );
};

const mapStateToProps = (store: AppState) => {
  return {
    postQuestionResult: store.questions.postedResult,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<never, never, AnyAction>) => {
  return {
    postQuestion: (question: PostQuestionData) =>
      dispatch(postQuestionActionCreator(question)),
    clearPostedQuestion: () => dispatch(clearPostedQuestionActionCreator()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AskSignInPage);
