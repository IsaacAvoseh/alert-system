import React from 'react';
import useSound from 'use-sound';


const Sound = () => {

    const [play, { stop, pause }] = useSound();

    return (
        <>
            <button onClick={() => play()}>play</button>
            <button onClick={() => stop()}>fhfh</button>
            <button onClick={() => pause()}>jfjfj</button>
        </>
    );
    

}

export default Sound;
