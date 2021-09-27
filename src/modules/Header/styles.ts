import styled from 'styled-components';

export const BaseHeader = styled.header`
  min-height: 64px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #303952;
`;

export const HeaderSection = styled.div`
  & > * {
    margin: 0 8px;
  }
`;
