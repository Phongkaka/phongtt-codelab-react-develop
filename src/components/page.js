import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

const Div = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: calc(100% - 230px);
  padding-right: 30px;
  position: fixed;
  right: 0;
  top: 80px;
`

export default function ({ children, toolbar, className, triangeStyle, ...props }) {
  return (
    <>
      <Div
        {...props}
        className={classNames(toolbar && 'with-toolbar', className)}
      >
        {children}
      </Div>
    </>
  )
}
