import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';

const ListContainer = styled.div`
  margin-top: 20px;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const LoadButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const WhiteboardList = ({ listWhiteboards, loadWhiteboard, deleteWhiteboard }) => {
  const [whiteboards, setWhiteboards] = useState([]);

  useEffect(() => {
    const fetchWhiteboards = async () => {
      const boards = await listWhiteboards();
      setWhiteboards(boards);
    };
    fetchWhiteboards();
  }, [listWhiteboards]);

  const handleDelete = async (cid) => {
    await deleteWhiteboard(cid);
    setWhiteboards(whiteboards.filter(board => board.ipfs_pin_hash !== cid));
  };

  return (
    <ListContainer>
      <h3>Saved Whiteboards</h3>
      {whiteboards.map((board) => (
        <ListItem key={board.ipfs_pin_hash}>
          <span>{board.metadata.name}</span>
          <div>
            <LoadButton onClick={() => loadWhiteboard(board.ipfs_pin_hash)}>Load</LoadButton>
            <DeleteButton onClick={() => handleDelete(board.ipfs_pin_hash)}>
              <FaTrash />
            </DeleteButton>
          </div>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default WhiteboardList;
