import Iconify  from "./Iconify";

const LoadingScreen = () => (
    <div style={{
        right: 0,
        bottom: 0,
        zIndex: 99999,
        width: '100%',
        height: '100%',
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <Iconify icon="line-md:loading-loop" width={"30px"} height={"40px"}/>
    </div>
)

export default LoadingScreen;