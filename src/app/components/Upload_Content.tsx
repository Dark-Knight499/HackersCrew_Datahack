import React, { useState } from 'react';
import { FileUploadDemo } from './UploadFile';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useRouter } from 'next/navigation';

interface FileType {
  name: string;
  // Add other properties of the file object as needed
}

// Define the props for FileUploadDemo component
interface FileUploadDemoProps {
  onFileUpload: (uploadedFile: FileType) => void;
  accept: string;
}

// Extend FileUploadDemo to include the props
const TypedFileUploadDemo: React.FC<FileUploadDemoProps> = FileUploadDemo;

const Upload_Content: React.FC = () => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<FileType | null>(null);
  const [uploadOption, setUploadOption] = useState<'pdf' | 'text' | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('Form submitted successfully');
      if (file) {
        console.log('File uploaded:', file.name);
      } else {
        console.log('Description submitted:', description);
      }
      router.push("/");
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleFileUpload = (uploadedFile: FileType) => {
    setFile(uploadedFile);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleOptionSelect = (option: 'pdf' | 'text') => {
    setUploadOption(option);
    setFile(null);
    setDescription('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex space-x-4 justify-center">
          <Button
            onClick={() => handleOptionSelect('pdf')}
            className={uploadOption === 'pdf' ? 'bg-blue-600' : 'bg-gray-300'}
          >
            Upload PDF
          </Button>
          <Button
            onClick={() => handleOptionSelect('text')}
            className={uploadOption === 'text' ? 'bg-blue-600' : 'bg-gray-300'}
          >
            Upload Text
          </Button>
        </div>
        {uploadOption === 'pdf' && (
          <TypedFileUploadDemo
            onFileUpload={handleFileUpload}
            accept=".pdf"
          />
        )}
        {uploadOption === 'text' && (
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter description here..."
              value={description}
              onChange={handleDescriptionChange}
              className="min-h-[100px] w-full pb-96 mb-96"
            />
          </div>
        )}
        <div className="pb-96 mb-96">
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }}
            className="w-full"
            disabled={!file && description.trim() === ''}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Upload_Content;