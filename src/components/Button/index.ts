import styled from 'styled-components';

export const Button = styled.button`
  height: 32px;
  padding: 4px 12px;
  border-radius: 16px;
  background: none;
  font-weight: bolder;
  font-size: 14px;
  text-transform: uppercase;
  border: none;
  color: #303952;
  background: #f19066;
  cursor: pointer;

  &:hover {
    background: #e15f41;
  }

  &:disabled {
    background: #e88e78;
    cursor: not-allowed;
  }
`;
