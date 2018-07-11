import React from 'react'
import styled from 'styled-components'

import {
  CardBody,
  CardBodyBold,
} from '../../../Atoms'

const Row = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0px 20px 0px;  
  `

export default props => (
  <Row>
    <CardBodyBold>{props.label}:</CardBodyBold>
    <CardBody>{props.children}</CardBody>
  </Row>
)
