import React, { FC } from "react";

interface ThreadBodyProps {
  body?: string;
}

const ThreadBody: FC<ThreadBodyProps> = ({ body }) => {
  return (
    <div className="thread-body-container">
      <strong>Body</strong>
      <div className="thread-body-editor">
        {body}
      </div>
    </div>
  );
};

export default ThreadBody;
