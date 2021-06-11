import React from 'react';

import cn from '@utils/classnames';

const Pen = ({
  className = '',
  files,
}: {
  className?: string;
  files: Array<FileSystemFileHandle>;
}) => {
  return (
    <div className={cn(className, 'pen')}>
      <h2>Pen:</h2>
      <ul>
        {files.map((file) => (
          <li>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Pen;
