import { ErrorMessage } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';

type FileInputProps = {
  name: string;
};

const FileInput: React.FC<FileInputProps> = ({ name }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const preventDefaultBehavior = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUpload = () => {
    console.log('Uploading file:', file);
  };

  return (
    <div className="inputFile" data-aos="fade-up" data-aos-duration="600">
      <input type="file" id="file-input" onChange={handleFileInputChange} />
      <label htmlFor="file-input">Upload Pitch Deck (Optional)</label>

      <section onDrop={handleFileDrop} onDragOver={preventDefaultBehavior}>
        <section>
          {/* Using next/image for optimized image loading */}
          <Image
            src="/images/fileUpload.png" // Place your image in the public/images folder
            alt="file upload icon"
            width={40}
            height={40}
          />
          <p className="titory">
            You can drag or
            {' '}
            <span onClick={handleUpload}>upload a file</span>
          </p>
        </section>
      </section>
      <blockquote>
        <ErrorMessage component="div" name={name} className="form-error" />
      </blockquote>
    </div>
  );
};

export default FileInput;
