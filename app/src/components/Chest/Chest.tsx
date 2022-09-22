import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
declare var H5P: any;

import {
    ChestClosed,
    ChestOpened,
} from './animations/';

const Wrapper = styled.div`
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    mergin-right: 20px;

    audio {
        display: none;
    }
`

const successAnimations = ['chest-opened'];

const timeoutValue: number = 1000;
let animationEndTimeout = (): void => {};

const Chest = (props: any) => {
    const { animate, success, successfulAnimation, successfulAudio } = props;
    const [animation, setAnimation] = useState('none');
    const animationAudio = useRef(successfulAudio);

    useEffect(() => {
        clearTimeout(animationEndTimeout);
        if (animate) {
            if (successfulAnimation == 'chest-opened') {
                setAnimation(successfulAnimation);
                
                if (success && animationAudio.current) {
                    animationAudio.current.play();
                }
            } else {
                setAnimation('none');
            }
            // animationEndTimeout = setTimeout(() => {
            // }, timeoutValue);
            if (typeof Unity !== 'undefined') {
                Unity.call("Debug: Chest animation end called.");
            }
            props.onAnimationEnd();
        }
        return () => {
            clearTimeout(animationEndTimeout);
        };
    }, [animate]);

    return (
        <Wrapper>
            { (!animate || animation == 'none') && <ChestClosed/> }

            { animate && animation === 'chest-opened' && <ChestOpened/>}

            <audio ref={animationAudio} controls style={{ display: 'none' }} src={props.successfulAudio}></audio>
        </Wrapper>
    );
}

export default Chest;