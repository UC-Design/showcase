import React from 'react'
import styled from 'styled-components'
import { colors } from '../config/_variables';
import Lottie from 'react-lottie'
import * as animationData from '../config/loading.json'

const Loading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
    };
    return (
        <LoadingContainer classname="loading-component">
            <Lottie
                options={defaultOptions}
            />
        </LoadingContainer>
    )
}

export default Loading

const LoadingContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    width: 100%;
    margin: 0;
    padding: 0;
    height: 100%;
    justify-content: center;
    align-content: center;

    background-color: ${colors.gradientGreyDark};
    background: ${colors.gradientGreyDark}; /* Old browsers */
    background: -moz-linear-gradient(left, ${colors.gradientGreyDark} 0%, ${colors.gradientGreyLight} 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left, ${colors.gradientGreyDark} 0%, ${colors.gradientGreyLight} 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, ${colors.gradientGreyDark} 0%, ${colors.gradientGreyLight} 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${colors.gradientGreyDark}', endColorstr='${colors.gradientGreyLight}',GradientType=1 ); /* IE6-9 */
    div {
        height: 75%;
        width: 75%;
        justify-content: center;
        align-content: center;
        svg {
            path {
                stroke: ${colors.gold};
            }
        }
    }
`