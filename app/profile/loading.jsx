import Image from "next/image";

const Loading = () => {
  return (
    <div className='w-full flex-center'>
      <Image
        src='/logo.png'
        width={50}
        height={50}
        alt='loader'
        className=''
      />
    </div>
  );
};

export default Loading;
