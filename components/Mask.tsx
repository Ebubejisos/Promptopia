import Image from 'next/image';

interface PropType {
  isMasked: boolean;
  handleClick: () => void;
}

const Mask = ({ isMasked, handleClick }: PropType) => {
  return (
    <>
      <Image
        src={
          isMasked
            ? '/assets/icons/eye-outline.svg'
            : '/assets/icons/eye-off-outline.svg'
        }
        alt='mask'
        title={isMasked ? 'unmask' : 'mask'}
        width={5}
        height={5}
        className='h-4 w-4 -translate-x-6 cursor-pointer self-center'
        onClick={handleClick}
      />
    </>
  );
};

export default Mask;
