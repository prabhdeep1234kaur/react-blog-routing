import { useState, useEffect } from 'react'; 

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined, height: undefined
    });

    useEffect(()=>{

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        handleResize();

        //addiig event to listen when the window is resized because it will called upon resizing the window
        window.addEventListener("resize", handleResize);

        //useEffect has a cleanup function when dependencies change
        /*const cleanUp = () => {
            //console.log("Clean up runs if useEffect depenency change");
            window.removeEventListener("resize", handleResize);
        }*/
        return () => window.removeEventListener("resize", handleResize);
        

    },[]); //load time: only loads on page load

    return windowSize; //return for custome hook
}

export default useWindowSize