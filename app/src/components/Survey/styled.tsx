import React from 'react';
import styled, { css } from 'styled-components';

interface IFeedbackWrapper {
    success?: boolean;
    wrong?: boolean;
}

export const Wrapper = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    position: relative;
`

export const Instructions = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 360px;
    flex-basis: 200px;
    box-sizing: border-box;
    position: relative;
    margin: 5px auto;
    justify-content: center;
    flex-direction: row;
`

export const CharacterWrapper = styled.div`
    height: 130px;
    padding: 15px;
    display: flex;
    align-content: center;
    flex: 0 1 130px;
    svg {
        height: 100%;
        width: auto;
    }
`

export const Question = styled.div`
    padding: 10px 20px;
    background-color: #fff;
    font-size: 14px;
    flex-grow: 1;
    height: auto;
    border: 1px solid #DADCE7;
    border-radius: 18px;
    max-height: 90px;
    text-align: center;
    position: relative;
    display: none;

    &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: -30px;
        margin-top: -15px;
        border: solid 15px transparent;
        border-right-color: #fff;
        z-index: 2;
    }

    &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: -34px;
        margin-top: -17px;
        border: solid 17px transparent;
        border-right-color: #DADCE7;
        z-index: 1;
    }
`

export const SurveyNav = styled.ul`
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 0;
    margin: 0;
`

export const CheckAnswer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
`

export const ContentWrapper = styled.div`
    flex-grow: 1;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
`

export const Answers = styled.ul<{ length: number, hasAnswer: boolean; optionStyle?: string; mixedCaseFriendly?: boolean; }>`
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    list-style: none;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 30px;
    max-width: 360px;
    width: 100%;
    margin: 6px auto;
    position: relative;

    ${props => props.optionStyle === 'list' && css`
        flex-direction: column;
        margin: 5px auto;
    `}

    ${props => props.mixedCaseFriendly && css`
        font-family: 'Verdana', sans-serif;
    `}
`
export const FeedbackWrapper = styled.div<IFeedbackWrapper>`
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-basis: 130px;
    flex-grow: 0;
    font-size: 28px;
    font-weight: 700;
    padding: 10px;
    box-sizing: border-box;
    margin-top: auto;

    > * {
        margin-bottom: 24px;
    }

    ${props => props.success && css`
        background-color: #F5FFE9;
        color: #508F00;
    `}

    ${props => props.wrong && css`
        background-color: #FFD9D3;
        color: #D01900;
    `}
`

export const Debug = styled.div`
    top: 0px;
    left: 15px;
    font-size: 14px;
    text-align: left;
    color: #949494;
    position: absolute;
    font-family: monospace;

    ul {
        margin-left: 0px;
        padding-left: 0;
        list-style: none;
    }

    li {
        padding: 10px;
        border-bottom: 1px solid #676767;
    }
`
