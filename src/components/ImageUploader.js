import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUpload, FaCheck } from 'react-icons/fa';

const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background-color: ${props => props.uploaded ? '#28a745' : '#007bff'};
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.uploaded ? '#218838' : '#0056b3'};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileName = styled.span`
  margin-left: 10px;
  font-size: 0.9em;
`;

const ImageUploader = ({ onUpload }) => {
  const [fileName, setFileName] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setUploaded(true);
      onUpload(file);
    }
  };

  return (
    <div>
      <UploadButton uploaded={uploaded}>
        {uploaded ? <FaCheck /> : <FaUpload />}
        {uploaded ? 'Uploaded' : 'Upload Image'}
        <HiddenInput type="file" accept="image/*" onChange={handleFileChange} />
      </UploadButton>
      {fileName && <FileName>{fileName}</FileName>}
    </div>
  );
};

export default ImageUploader;
