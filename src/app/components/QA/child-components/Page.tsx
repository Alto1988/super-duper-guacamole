/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { PageTitle } from './PageTitle';
import React from 'react'
interface Props{
  title?: string;
  children: React.ReactNode;
}
export const Page: React.FC<Props> = ({ title, children }) => (
  <div css={css` 
  margin:50px auto 20px auto;
  padding: 30px 20px;
  max-width: 600px;`}>
    {title ?? <PageTitle>{title}</PageTitle>}
    {children}
  </div>
)