import { Button } from 'components/Button';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { schemeSelector, setShowBoundingBox } from 'store/reducers/scheme';
import { SchemeStatus } from 'store/reducers/scheme/state';

export const BoundingBoxControl: FC = () => {
  const dispatch = useAppDispatch();
  const { isShowBoundingBox, status } = useAppSelector(schemeSelector);

  const toggleShowBoundingBox = () => {
    dispatch(setShowBoundingBox(!isShowBoundingBox));
  };

  const actionLabel = isShowBoundingBox ? 'Hide' : 'Show';

  return (
    <Button
      onClick={toggleShowBoundingBox}
      disabled={status !== SchemeStatus.UPLOADED}
    >
      {actionLabel}
      {' '}
      bounding box
    </Button>
  );
};
