import React from "react";

const CommentCard = (props) => {
  return (
    <div>
      {props.timestamp} : {props.commentText}
    </div>
  );
};

export default CommentCard;
