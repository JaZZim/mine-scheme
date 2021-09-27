import React, { FC } from 'react';
import { FileUploader } from 'modules/FileUploader';
import { SchemeLabel } from 'modules/SchemeLabel';
import { BoundingBoxControl } from 'modules/BoundingBoxControl';
import * as Styled from './styles';

export const Header: FC = () => (
  <Styled.BaseHeader>
    <Styled.HeaderSection>
      <SchemeLabel />
    </Styled.HeaderSection>
    <Styled.HeaderSection>
      <BoundingBoxControl />
      <FileUploader />
    </Styled.HeaderSection>
  </Styled.BaseHeader>
);
