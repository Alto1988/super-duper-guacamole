import React from 'react'
import {Page} from '@/app/components/QA/child-components/Page'
export const NotFoundPage = () => {
  return (
      // eslint-disable-next-line react/no-children-prop
    <Page title="Page Not Found" children={undefined}></Page>
  )
}
