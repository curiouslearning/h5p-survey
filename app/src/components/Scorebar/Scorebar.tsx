import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Star } from '../../icons';

interface IScorebarInner {
    width?: number;
}

const Wrapper = styled.div`
    border: 1px solid #DADCE7;
    height: 42px;
    width: 100%;
    max-width: 230px;
    box-sizing: border-box;
    padding: 15px;
    border-radius: 44px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`

const ScoreBarContainer = styled.div`
    position: relative;
    z-index: 1;
    height: 12px;
    background-color: #D3FAA1;
    border-radius: 18px;
    flex: 1;
`

const ScoreBarInner = styled.div<IScorebarInner>`
    position: absolute;
    z-index: 2;
    background-color: #7FC02D;
    height: 12px;
    width: ${props => props.width}%;
    border-radius: 18px;
    transition: ease width 0.7s;
    padding-left: ${props => (props.width > 0) ? '10px' : '0px'};
`

const Score = styled.div`
    flex-grow: 0;
    flex-basis: 50px;
    font-weight: 700;
    font-size: 16px;
`

const StarWrapper = styled.div`
    flex: 0 0 32px;
    height: 30px;
    align-self: center;
    margin-left: -10px;
    z-index: 5;
`

let animationTimeout: any = null 

const Scorebar = (props: any) => {
    const [percentageWidth, setPercentageWidth] = useState(0);
    const [fullScore, setFullScore] = useState(false);

    const calculateWidth = () => {
        animationTimeout = setTimeout(() => {
            setPercentageWidth(Math.round((props.score / props.maxScore) * 100) || 0);
            if (props.score === props.maxScore) {
                setFullScore(true);
            }
        }, 400);
    }

    useEffect(() => {
        try {
            calculateWidth();

        } catch (err: any) {
            console.log({err})
        }
        // Clean up
        return () => {
            if (animationTimeout) {
                clearTimeout(animationTimeout);
            }
        }
    }, [props.score]);
    
    return (
        <Wrapper>
            <ScoreBarContainer>
                <ScoreBarInner width={percentageWidth} />
            </ScoreBarContainer>
            <StarWrapper>
                <Star filled={fullScore}/ >
            </StarWrapper>
            <Score>
                {props.score}/{props.maxScore}
            </Score>
        </Wrapper>
    )
}

export default Scorebar;