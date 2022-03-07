import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const PlayIcon = () => {
    // used to prevent different SVGS ending up with the same mask id's
    const uniqMaskId = uuidv4();
    return (
        <svg width="700" height="700" viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M438.09 337.498L276.529 237.049C266.529 231.246 254 238.461 254 250.022L254 450.141C254 462.082 267.274 469.236 277.248 462.67L438.809 363C448.118 356.872 447.73 343.091 438.09 337.498Z" fill="#40A1FF"/>
                <mask id={`${uniqMaskId}`} mask-type="alpha" maskUnits="userSpaceOnUse" x="254" y="235" width="192" height="231">
                <path d="M438.09 337.498L276.529 237.049C266.529 231.246 254 238.461 254 250.022L254 450.141C254 462.082 267.274 469.236 277.248 462.67L438.809 363C448.118 356.872 447.73 343.091 438.09 337.498Z" fill="#40A1FF"/>
            </mask>
            <g mask={`url(#${uniqMaskId})`}>
                <path d="M222 453.5C338.4 412.3 377.167 307 382 259.5L477.5 330.5L467.5 381.5L266 498L222 453.5Z" fill="#188AF9"/>
            </g>
        </svg>

    );
}

export default PlayIcon;