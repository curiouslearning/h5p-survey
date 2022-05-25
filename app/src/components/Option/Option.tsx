declare var H5P: any;
// declare var Unity: any;

H5P = H5P || {};
// Unity = Unity || {};

import React from 'react';
import styled, { css } from 'styled-components';
import {} from 'styled-components/cssprop'

interface IOptionStyled {
    selected?: boolean;
    disabled?: boolean;
}

const Wrapper = styled('li')<IOptionStyled>`
    flex-basis: calc(50% - 10px);
    max-height: 78px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 20px;
    flex-shrink: 0;

    button {
        background-color: #f7f7f7;
        font-size: inherit;
        font-family: inherit;
        flex-grow: 1;
        border-radius: 10px;
        border: 2px solid #969696;
        height: 58px;
        padding: 10px;
        margin: 10px;
        color: #525464;

        &:hover {
            ${ props => !props.disabled && css`
                cursor: pointer;
                border-width: 3px;
                border-bottom-width: 6px;
            `}
        }

        ${props => props.selected && css`
            border-width: 3px;
            border-bottom-width: 6px;
        `}

        ${props => props.disabled && css`
            pointer-events: none;
        `}
    }

    &:first-child {
        button {
            background-color: #FFEACD;
            border-color: #FED9A7;

            ${props => props.selected && css`
                border-color: #D88415;
            `}
        }
    }

    &:nth-child(2) {
        button {
            background-color: #F2E2FF;
            border-color: #E7CAFF;

            ${props => props.selected && css`
                border-color: #AB66E4;
            `}
        }
    }

    &:nth-child(3) {
        button {
            background-color: #E9FFCC;
            border-color: #D3FAA1;
            ${props => props.selected && css`
                border-color: #7FC02D;
            `}
        }
    }

    &:nth-child(4) {
        button {
            background-color: #FFD9D3;
            border-color: #FFBDB4;
            ${props => props.selected && css`
                border-color: #E76F5F;
            `}
        }
    }
`

const Option = (props: any) => {
    const { text } = props.data
    const generateMarkup = (htmlString: string) => {
        return { __html: htmlString }
    }

    const handleAnswer = () => {
        props.onClick(props);
    }

    return (
        <Wrapper selected={props.selected} disabled={props.disabled}>
            <button dangerouslySetInnerHTML={generateMarkup(text)} onClick={handleAnswer} disabled={props.disabled} />
        </Wrapper>
    )
}

export default Option;
