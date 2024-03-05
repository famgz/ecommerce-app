import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {/* show button */}
      <button
        className='btn-white'
        type='button'
        onClick={() => setShowConfirm(true)}
      >
        <FontAwesomeIcon icon={faTrash} className='size-3' />
        {label}
      </button>

      {/* delete confirmation modal */}
      {showConfirm && (
        <div className='fixed bg-black/80 inset-0 flex items-center h-full justify-center'>
          <div className='flex flex-col gap-4 items-center bg-white p-4 rounded-lg'>
            <div className=''>Are you sure you want to delete?</div>
            <div className='flex gap-2 w-full mt-4'>
              <button
                type='button'
                className='btn-primary w-full'
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                type='button'
                className='btn-white w-full'
                onClick={() => {
                  setShowConfirm(false);
                  onDelete();
                }}
              >
                Yes,&nbsp;delete!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
