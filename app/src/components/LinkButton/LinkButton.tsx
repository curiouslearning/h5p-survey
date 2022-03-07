import React from 'react';
import styled, { css } from 'styled-components';

interface IButtonStyled {
    primary?: boolean;
    success?: boolean;
    warning?: boolean;
    transparent?: boolean;
    iconLeft?: boolean;
    href: any;
    children?: any;
    onClick?: any;
}

const Wrapper = styled.a<IButtonStyled>`
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
    text-decoration: none;

    &:hover {
        cursor: pointer;
    }

    ${props => props.primary && css`
        background-color: #3985F8;
        color: #fff;
        box-shadow: 0px 4px 0px 0px #045FEA;
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

const LinkButton = (props: IButtonStyled) => (
    <Wrapper
        primary={props.primary}
        success={props.success}
        warning={props.warning}
        transparent={props.transparent}
        iconLeft={props.iconLeft}
        href={props.href}
        onClick={props.onClick}
    >
        { props.children }
    </Wrapper>
)

export default LinkButton;