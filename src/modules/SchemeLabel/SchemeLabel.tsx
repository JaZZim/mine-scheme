import React, { FC } from 'react';
import { useAppSelector } from 'store';
import { schemeSelector } from 'store/reducers/scheme';
import { Label } from 'components/Label';

export const SchemeLabel: FC = () => {
  const { info } = useAppSelector(schemeSelector);

  if (!info?.title) {
    return null;
  }

  return (
    <Label>{info.title}</Label>
  );
};
