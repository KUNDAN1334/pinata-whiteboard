import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEthereum } from 'react-icons/fa';
import usePinata from '../hooks/usePinata';

const MinterContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Title = styled.h3`
  margin-bottom: 15px;
  color: #007bff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
  min-height: 100px;
`;

const MintButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const NFTMinter = ({ getWhiteboardImage }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const { uploadFile, mintNFTMetadata } = usePinata();

  const handleMint = async (e) => {
    e.preventDefault();
    setIsMinting(true);

    try {
      // Get the whiteboard image as a blob
      const imageBlob = await getWhiteboardImage();

      // Upload the image to IPFS
      const imageCID = await uploadFile(new File([imageBlob], 'whiteboard.png'));

      // Create metadata
      const metadata = {
        name,
        description,
        image: `ipfs://${imageCID}`,
      };

      // Mint the NFT (upload metadata to IPFS)
      const metadataCID = await mintNFTMetadata(metadata);

      alert(`NFT minted successfully! Metadata CID: ${metadataCID}`);
    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('Failed to mint NFT. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <MinterContainer>
      <Title>Mint Your Whiteboard as NFT</Title>
      <Form onSubmit={handleMint}>
        <Input
          type="text"
          placeholder="NFT Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextArea
          placeholder="NFT Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <MintButton type="submit" disabled={isMinting}>
          {isMinting ? 'Minting...' : (
            <>
              <FaEthereum /> Mint NFT
            </>
          )}
        </MintButton>
      </Form>
    </MinterContainer>
  );
};

export default NFTMinter;