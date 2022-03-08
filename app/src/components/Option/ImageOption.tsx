declare var H5P: any;
// declare var Unity: any;

H5P = H5P || {};
// Unity = Unity || {};

import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks'
import styled, { css } from 'styled-components';
import {} from 'styled-components/cssprop'

interface IOptionStyled {
    selected?: boolean;
    disabled?: boolean;
}

const Wrapper = styled('li')<IOptionStyled>`
    flex-basis: calc(50% - 10px);
    max-height: 128px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 20px;
    flex-shrink: 0;
    margin-bottom: 30px;

    button {
        background-color: #f7f7f7;
        font-size: inherit;
        font-family: inherit;
        flex-grow: 1;
        border-radius: 10px;
        border: 2px solid #969696;
        max-height: 150px;
        padding: 5px;
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

const ImageOption = (props: any) => {
    const { image } = props.data;
    const isWebview = useAppSelector(state => state.config.isWebview);
    const generateMarkup = (htmlString: string) => {
        return { __html: htmlString }
    }

    const handleAnswer = () => {
        props.onClick(props);
    }

    const handleImageErrored= () => {
      if (isWebview) {
        try {
          Unity.call('FatalError');
        } catch (err) {
          console.error(err);
        }
      }
    }

    return (
        <Wrapper selected={props.selected} disabled={props.disabled}>
            <button onClick={handleAnswer} disabled={props.disabled}>
              <img
                src={image}
                style={{width: "128px", height: "128px"}}
                onError={handleImageErrored}
                />
            </button>
        </Wrapper>
    )
}

export default ImageOption;
