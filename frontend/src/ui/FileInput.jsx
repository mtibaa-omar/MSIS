import styled from "styled-components";

const FileInput = styled.input`
  border-radius: 5px;
  width: 18rem;

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: 5px;
    border: none;
    color: #eef2ff;
    background-color: #3b82f6;
    cursor: pointer;
    transition:
      color 0.2s,
      background-color 0.2s;

    &:hover {
      background-color: #2563eb;
    }
  }
`;

export default FileInput;
