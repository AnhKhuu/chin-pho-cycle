'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

import { Modal } from './modal';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title='Are you sure?'
      description='This action cannot be undone.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex w-full items-center justify-end space-x-2 pt-6'>
        <Button
          disabled={loading}
          variant='outline'
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant='destructive'
          onClick={(e) => {
            e.preventDefault();
            onConfirm();
            onClose();
          }}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export { AlertModal };
