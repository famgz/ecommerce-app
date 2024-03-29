import { clampId, copyToClipboard } from '@/app/_libs/utils';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ClampedId({ _id }) {
  const id = clampId(_id);

  return (
    <div title={_id} className='w-fit flex items-center'>
      {id}
      <div
        onClick={() => copyToClipboard(_id)}
        className='text-center p-1 cursor-pointer'
        title='copy ID to clipboard'
      >
        <FontAwesomeIcon icon={faCopy} className='size-4 text-gray-500' />
      </div>
    </div>
  );
}
