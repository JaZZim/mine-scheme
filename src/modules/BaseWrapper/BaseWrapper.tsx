import React, { FC } from 'react';
import { Header } from 'modules/Header';
import * as Styled from './styles';

export const BaseWrapper: FC = ({ children }) => (
  <Styled.Wrapper>
    <Header />
    <Styled.Content>
      {children}
    </Styled.Content>
  </Styled.Wrapper>
);
