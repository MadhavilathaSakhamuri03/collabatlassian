import React from 'react';
import { Button, message } from 'antd';
import { syncData } from '../../api/syncApi';

const SyncButton = ({  onSync }) => {
  const handleSync = async () => {
    try {
      const response = await syncData();
      message.success(response.message);
      onSync();
    } catch (error) {
      message.error('Synchronization failed.');
    }
  };

  return (
    <Button type="primary" onClick={handleSync}>
      Sync Data
    </Button>
  );
};

export default SyncButton;
