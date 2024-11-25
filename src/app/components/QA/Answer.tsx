/**@jsx jsx */
import {css, jsx} from '@emotion/react'
import React from 'react'
import {AnswerData} from '@/app/components/QA/MockData/QuestionsData'
import {gray3} from '../Styles/Styles'

interface Props {
    data: AnswerData;
}

export const Answer: React.FC<Props> = ({data}) => {
    return (
        <div css={css`
            padding: 10px 0px;`}>
            <div css={css`
                padding: 10px 0px;
                font-size: 13px;
            `}>
                {data.content}
            </div>
            <div css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};`}>
                {`Answer by ${data.userName} on
        ${data.created.toLocaleDateString()}
        ${data.created.toLocaleTimeString()}`}
            </div>
        </div>
    )
}
