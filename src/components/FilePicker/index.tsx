import { Button } from 'components/Button';
import React, { ChangeEvent, FC, useRef } from 'react';

export interface FilePickerProps {
  onChangeFile: (file: File) => void;
  extensions: string[];
  label: string;
}

export const FilePicker: FC<FilePickerProps> = ({ onChangeFile, extensions, label }) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileUploaded = e.target.files && e.target.files.item(0);
    if (fileUploaded) {
      onChangeFile(fileUploaded);
      e.target.value = '';
    }
  };

  const acceptExtensions = extensions.map((extension) => `.${extension}`).join(', ');

  return (
    <>
      <Button onClick={handleUpload}>
        {label}
      </Button>
      <input
        type="file"
        multiple={false}
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
        accept={acceptExtensions}
      />
    </>
  );
};
