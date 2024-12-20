import {
  getUnansweredQuestions,
  QuestionData,
  postQuestion,
  PostQuestionData,
} from "@/app/components/QA/MockData/QuestionsData";
import {
  Action,
  ActionCreator,
  Dispatch,
  Reducer,
  combineReducers,
  Store,
  createStore,
  applyMiddleware,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";

//Start of Interfaces
interface QuestionsState {
  readonly loading: boolean;
  readonly unanswered: QuestionData[] | null;
  readonly postedResult?: QuestionData;
}

export interface AppState {
  readonly questions: QuestionsState;
}
//Start of Action Interfaces
export type GettingUnansweredQuestionsAction = Action<"GettingUnansweredQuestions">;

export interface GotUnansweredQuestionsAction
  extends Action<"GotUnansweredQuestions"> {
  questions: QuestionData[];
}

export interface PostedQuestionAction extends Action<"PostedQuestion"> {
  result: QuestionData | undefined;
}
//End of Action Interfaces

//End of Interfaces

//Define Types
type QuestionsActions =
  | GettingUnansweredQuestionsAction
  | GotUnansweredQuestionsAction
  | PostedQuestionAction;

//End of Types

const initialQuestionState: QuestionsState = {
  loading: false,
  unanswered: null,
};
//Beginning of the action creators
export const getUnansweredQuestionsActionCreator: ActionCreator<
  ThunkAction<Promise<void>, QuestionData[], null, GotUnansweredQuestionsAction>
> = () => {
  return async (dispatch: Dispatch) => {
    const gettingUnansweredQuestionsAction: GettingUnansweredQuestionsAction = {
      type: "GettingUnansweredQuestions",
    };
    dispatch(gettingUnansweredQuestionsAction);
    const questions = await getUnansweredQuestions();
    const gotUnansweredQuestionAction: GotUnansweredQuestionsAction = {
      questions,
      type: "GotUnansweredQuestions",
    };
    dispatch(gotUnansweredQuestionAction);
  };
};

export const postQuestionActionCreator: ActionCreator<
  ThunkAction<
    Promise<void>,
    QuestionData,
    PostQuestionData,
    PostedQuestionAction
  >
> = (question: PostQuestionData) => {
  return async (dispatch: Dispatch) => {
    const result = await postQuestion(question);
    const postedQuestionAction: PostedQuestionAction = {
      type: "PostedQuestion",
      result,
    };
    dispatch(postedQuestionAction);
  };
};

export const clearPostedQuestionActionCreator: ActionCreator<PostedQuestionAction> =
  () => {
    const postedQuestionAction: PostedQuestionAction = {
      type: "PostedQuestion",
      result: undefined,
    };
    return postedQuestionAction;
  };

//End of creators

//Start of reducer
const neverReached = (never: never) => {};

const questionsReducer: Reducer<QuestionsState, QuestionsActions> = (
  state = initialQuestionState,
  action
) => {
  switch (action.type) {
    case "GettingUnansweredQuestions": {
      return {
        ...state,
        unanswered: null,
        loading: true,
      };
    }
    case "GotUnansweredQuestions": {
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      };
    }
    case "PostedQuestion": {
      return {
        ...state,
        unanswered: action.result
          ? (state.unanswered || []).concat(action.result)
          : state.unanswered,
        postedResult: action.result,
      };
    }
    default:
      neverReached(action);
  }
  return state;
};

export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}

const rootReducer = combineReducers<AppState>({
  questions: questionsReducer,
});
