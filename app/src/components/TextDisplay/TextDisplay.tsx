import React from 'react';
import styled, { css } from 'styled-components';
import {} from 'styled-components/cssprop'

interface IOptionStyled {
    selected?: boolean;
    disabled?: boolean;
}

const Wrapper = styled('div')<IOptionStyled>`
    display: flex;
    flex-basis: auto;
    height: 20px;
    box-sizing: border-box;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 20px;
    flex-shrink: 0;
    max-width: 270px
`

const TextDisplay = (props: any) => {
    const text = props.text
    console.log(`Prompt Text: ${text}`)
    const generateMarkup = (htmlString: string) => {
        return { __html: htmlString }
    }


    return (
      <Wrapper>
      <p dangerouslySetInnerHTML={generateMarkup(text)} />
      </Wrapper>
    )
}

export default TextDisplay;
