import { useState, useCallback } from 'react';
import axios from 'axios';

const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.REACT_APP_PINATA_SECRET_API_KEY;

const usePinata = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = useCallback(async (file) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      });

      setIsLoading(false);
      return response.data.IpfsHash;
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.error || err.message);
      throw err;
    }
  }, []);

  const mintNFTMetadata = useCallback(async (metadata) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        metadata,
        {
          headers: {
            'Content-Type': 'application/json',
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY,
          },
        }
      );
      setIsLoading(false);
      return response.data.IpfsHash;
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.error || err.message);
      throw err;
    }
  }, []);

  const getFileUrl = useCallback((cid) => {
    return `https://gateway.pinata.cloud/ipfs/${cid}`;
  }, []);

  const saveWhiteboard = useCallback(async (whiteboardData) => {
    const jsonString = JSON.stringify(whiteboardData);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const file = new File([blob], 'whiteboard.json');
    return await uploadFile(file);
  }, [uploadFile]);

  const loadWhiteboard = useCallback(async (cid) => {
    const url = getFileUrl(cid);
    const response = await fetch(url);
    return await response.json();
  }, [getFileUrl]);

  const listWhiteboards = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://api.pinata.cloud/data/pinList?status=pinned',
        {
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY,
          },
        }
      );
      return response.data.rows.filter(pin => pin.metadata.name === 'Whiteboard');
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, []);

  const deleteWhiteboard = useCallback(async (cid) => {
    try {
      await axios.delete(`https://api.pinata.cloud/pinning/unpin/${cid}`, {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      });
    } catch (err) {
      setError(err.message);
    }
  }, []);

 
  

  return { uploadFile, getFileUrl, saveWhiteboard, loadWhiteboard, listWhiteboards, deleteWhiteboard, mintNFTMetadata, isLoading, error };

 
};

export default usePinata;
