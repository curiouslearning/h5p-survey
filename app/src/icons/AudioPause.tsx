import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const PauseIcon = () => {
    // used to prevent different SVGS ending up with the same mask id's
    const uniqMaskId = uuidv4();
    return (
        <svg width="700" height="700" viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M300.5 234C286.969 234 276 244.969 276 258.5V440.5C276 454.031 286.969 465 300.5 465C314.031 465 325 454.031 325 440.5V258.5C325 244.969 314.031 234 300.5 234ZM399.5 234C385.969 234 375 244.969 375 258.5V440.5C375 454.031 385.969 465 399.5 465C413.031 465 424 454.031 424 440.5V258.5C424 244.969 413.031 234 399.5 234Z" fill="#A340FF"/>
            <mask id={`${uniqMaskId}`} mask-type="alpha" maskUnits="userSpaceOnUse" x="276" y="234" width="148" height="231">
                <path fillRule="evenodd" clipRule="evenodd" d="M300.5 234C286.969 234 276 244.969 276 258.5V440.5C276 454.031 286.969 465 300.5 465C314.031 465 325 454.031 325 440.5V258.5C325 244.969 314.031 234 300.5 234ZM399.5 234C385.969 234 375 244.969 375 258.5V440.5C375 454.031 385.969 465 399.5 465C413.031 465 424 454.031 424 440.5V258.5C424 244.969 413.031 234 399.5 234Z" fill="#A340FF"/>
            </mask>
            <g mask={`url(#${uniqMaskId}`}>
                <path d="M214.5 434.5C332.1 447.3 435.167 314.5 472 246.5L451.5 477L258.5 467L214.5 434.5Z" fill="#8D13FE"/>
            </g>
        </svg>
    );
}

export default PauseIcon;