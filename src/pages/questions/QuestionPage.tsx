/** @jsx jsx */
import {css, jsx} from '@emotion/react'
import React, {Fragment, useEffect, useState} from 'react'
import {Page} from '@/app/components/QA/child-components/Page'
import {getQuestion, postAnswer, QuestionData} from '@/app/components/QA/MockData/QuestionsData'
import {gray3, gray6} from '@/app/components/Styles/Styles'
import {AnswerList} from '@/app/components/QA/AnswerList'
import {Form, minLength, required, Values} from '@/app/components/QA/Form'
import {Field} from '@/app/components/QA/Field'
import {useParams} from "next/navigation";



export const QuestionPage: React.FC = () => {
    const {questionIdParams} = useParams();
    const [question, setQuestion] = useState<QuestionData | null>(null);
    useEffect(() => {
        const doGetQuestion = async (questionId: number) => {
            const foundQuestion = await getQuestion(questionId);
            setQuestion(foundQuestion);
        };
        if (questionIdParams) {
            const questionId: number = Number(questionIdParams);
            doGetQuestion(questionId);
        }
    }, [questionIdParams]);
    const handleSubmit = async (values: Values) => {
        const result = await postAnswer({
            questionId: question!.questionId,
            content: values.content,
            userName: 'Fred',
            created: new Date()
        });
        return {success: !!result};
    }
    return (
        <Page>
            <div css={css`
                background-color: white;
                padding: 15px 20px 20px 20px;
                border-radius: 4px;
                border: 1px solid ${gray6};
                box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);`}>
                <div css={css`
                    font-size: 19px;
                    font-weight: bold;
                    margin: 10px 0px 5px;`}>
                    {question === null ? '' : question.title}
                </div>
                {question !== null && (
                    <Fragment>
                        <p css={css`
                            margin-top: 0px;
                            background-color: white;`}>
                            {question.content}</p>
                        <div css={css`
                            font-size: 12px;
                            font-style: italic;
                            color: ${gray3};`}>
                            {`Asked by ${question.userName} on
              ${question.created.toLocaleDateString()}
              ${question.created.toLocaleTimeString()}`}
                        </div>
                        <AnswerList data={question.answers}/>
                        <div css={css`
                            margin-top: 20px;
                        `}>
                            <Form submitCaption="Submit Your Answer"
                                  validationRules={{
                                      content: [
                                          {validator: required},
                                          {validator: minLength, arg: 50},
                                      ]
                                  }}
                                  onSubmit={handleSubmit}
                                  failureMessage="There was a problem with your answer..."
                                  successMessage="Your answer was successfully submitted">
                                <Field name="content" label="Your Answer" type="TextArea"/>
                            </Form>
                        </div>
                    </Fragment>
                )}
            </div>
        </Page>
    );
}

export default QuestionPage;