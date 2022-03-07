import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface IStarIcon {
    filled?: boolean;
}

interface IStarWrapper {
    filled?: boolean;
}

const appear = keyframes`
    0% {
        transform: scale(0);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
`

const Wrapper = styled.div<IStarWrapper>`
    
    .star-fill {
        transform: scale(0);
        opacity: 0;
        transition: fill ease-in 0.4s;
        transform-origin: center;
        animation-fill-mode: forwards;
        animation: ${appear} 0.7s ease-in forwards;
        
        ${props => props.filled && css`
            fill: url(#paint0_linear);
        `}
    }
`

const StarIcon = (props: IStarIcon) => (
    <Wrapper filled={props.filled}>
        <svg
            width="32"
            height="30"
            viewBox="0 0 32 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15.1207 1.6229C15.499 0.924714 16.501 0.924715 16.8793 1.6229L20.7379 8.74506C20.8819 9.01089 21.1384 9.1973 21.4358 9.25212L29.4017 10.721C30.1826 10.865 30.4923 11.8179 29.9451 12.3935L24.3639 18.2641C24.1556 18.4832 24.0576 18.7848 24.0974 19.0845L25.162 27.1145C25.2663 27.9017 24.4557 28.4906 23.7393 28.1481L16.4313 24.6542C16.1586 24.5238 15.8414 24.5238 15.5687 24.6542L8.26068 28.1481C7.54428 28.4906 6.73366 27.9017 6.83803 27.1145L7.90264 19.0845C7.94237 18.7848 7.84438 18.4832 7.63606 18.2641L2.05486 12.3934C1.50774 11.8179 1.81737 10.865 2.59827 10.721L10.5642 9.25212C10.8616 9.1973 11.1181 9.01089 11.2621 8.74506L15.1207 1.6229Z"
                fill="#e7e7e7"
                stroke="white"
                strokeWidth="2"
                className="star-fill"
            />
            <defs>
                <linearGradient id="paint0_linear" x1="4" y1="4" x2="26.2857" y2="28.5714" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFD644"/>
                    <stop offset="1" stopColor="#FFBC3A"/>
                </linearGradient>
            </defs>
        </svg>
    </Wrapper>
);

export default StarIcon;