import React from "react";
import styled from "styled-components";

const Message = ({
  content,
  className,
  $role,
  isInputting = false,
  isLoading = false,
  timestamp,
}) => {
    console.log($role);
    console.log(content);
  return (
    <MessageComponent className={className} $role={$role}>
      <MessageProfileComponent $role={$role}>
        <span className="emoji">{$role === "user" ? "" : "🚨"}</span>
        <span className="timestamp">{timestamp}</span>
      </MessageProfileComponent>
      <MessageContent>
        {isInputting || isLoading ? (
          <span>...</span>
        ) : (
          <span>
            {content
            .replace(/\\n/g, "\n")
            .split("\n")
            .map((line, index) => (
              <span key={index}>
                  {line}
                  <br />
                  <br />
              </span>
            ))
            }
          </span>
        )}
      </MessageContent>
    </MessageComponent>
  );
};

export const MessageComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;

  ${(props) =>
    props.$role === "user" &&
    `
      align-items: flex-end;
    `}
`;

export const MessageProfileComponent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  ${(props) =>
    props.$role === "user" &&
    `
      flex-direction: row-reverse;
    `}

  && .emoji {
    font-size: 20px;
  }

  && .timestamp {
    margin: 0 5px;
    font-size: 0.8em;
    color: #888;
  }
`;

const MessageContent = styled.div`
  border: 1px solid #FF4F4D;
  color: #FF4F4D;
  border-radius: 20px;
  padding: 10px;
  max-width: 60%;
  word-wrap: break-word;
`;

export default Message;