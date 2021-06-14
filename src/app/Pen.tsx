import React from 'react';

import cn from '@utils/classnames';
import PenFile from '@app/PenFile';
import { usePenFiles } from '@app/FilesContext';

import './Pen.css';

const Pen = ({ className = '' }: { className?: string }) => {
  const { files, reloadFiles } = usePenFiles();

  React.useEffect(() => {
    reloadFiles();
  }, []);

  return (
    <div className={cn(className, 'pen')}>
      <h2>Audio Files on your pen:</h2>
      <ul className="pen__list">
        {files.map(file => (
          <li className="pen__file">
            <PenFile file={file} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pen;
