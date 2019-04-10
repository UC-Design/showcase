import React, { Component } from 'react'
import styled from 'styled-components'
import {colors, fonts } from '../../config/_variables'
import { GoChevronRight } from 'react-icons/go'

class Button extends Component {
  checkIcon(icon) {
    if (icon === "GoChevronRight") {
      return (
        <GoChevronRight/>
      )
    }
  }
  render() {
    return (
      <ButtonThis>
          {this.props.label}
          {this.checkIcon(this.props.icon)}
      </ButtonThis>
    );
  }
}

export default Button

const ButtonThis = styled.div`
  padding: 8px 16px;
  font-family: ${fonts.serif};
  background-color: transparent;
  color: ${colors.gold};
  border: 2px solid ${colors.gold};
  border-radius: 50px;
  font-family: ${fonts.sans};
  font-size: 1rem;
  transition: .5s;
  display: flex;
  justify-content: center;
  align-content: center;
  justify-self: center;
  align-self: center;
  svg {
    display: inline-flex;
  }
  &:hover {
      background-color: ${colors.gold};
      opacity: .5;
      color: ${colors.darkGrey}
  }
`