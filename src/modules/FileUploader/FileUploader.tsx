import React, { FC } from 'react';
import { FilePicker } from 'components/FilePicker';
import { uploadMineScheme } from 'store/reducers/scheme';
import { useAppDispatch } from 'store';

export const FileUploader: FC = () => {
  const dispatch = useAppDispatch();

  const handleChangeFile = (file: File) => {
    dispatch(uploadMineScheme(file));
  };

  return (
    <FilePicker
      label="Upload scheme"
      extensions={['json']}
      onChangeFile={handleChangeFile}
    />
  );
};
