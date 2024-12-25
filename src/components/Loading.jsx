import { RotatingLines } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className='min-h-[calc(100vh-400px)] w-full flex items-center justify-center'>
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default Loading;