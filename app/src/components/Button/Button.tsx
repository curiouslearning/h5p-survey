import React from 'react';
import styled, { css } from 'styled-components';

interface IButtonStyled {
    primary?: boolean;
    success?: boolean;
    warning?: boolean;
    transparent?: boolean;
    iconLeft?: boolean;
    onClick?: void;
}

const Wrapper = styled.button<IButtonStyled>`
    height: 55px;
    line-height: 25px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 38px;
    background: #999393;
    padding: 10px 30px;
    box-sizing: border-box;
    border: none;
    font-family: 'Nunito', sans-serif;
    display: inline-flex;
    align-items: center;
    width: auto;
    max-width: 250px;
    text-align: center;

    &:hover {
        cursor: pointer;
    }

    ${props => props.primary && css`
        background-color: #3985F8;
        color: #fff;
        box-shadow: 0px 4px 0px 0px #045FEA;
    `}

    ${props => props.success && css`
        background-color: #508F00;
        color: #fff;
        box-shadow: 0px 4px 0px 0px #396700;
    `}

    ${props => props.warning && css`
        background-color: #E75D4A;
        color: #fff;
        box-shadow: 0px 4px 0px 0px #D01900;
    `}
    
    ${props => props.transparent && css`
        background-color: transparent;
        color: #000;
        border: 1px solid #DADCE7;
    `}

    svg {
        margin-left: 15px;
    }

    ${props => props.iconLeft && css`
        svg {
            margin-left: 0;
            margin-right: 10px;
        }
    `}
`

const Button = (props: any) => (
    <Wrapper
        primary={props.primary}
        success={props.success}
        warning={props.warning}
        transparent={props.transparent}
        onClick={props.onClick}
        iconLeft={props.iconLeft}
    >
        { props.children }
    </Wrapper>
)

export default Button;