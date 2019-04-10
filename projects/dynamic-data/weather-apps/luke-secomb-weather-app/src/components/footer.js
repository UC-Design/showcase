// import React, { Component } from 'react'
// import styled from 'styled-components'
// import {colors, fonts } from '../config/_variables'

// class Footer extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             loading: false,
//         }

//     }
//     removeLocalDLC() {
//         localStorage.clear();
//         this.forceUpdate();
//     }
//     render () {
//         // let handleRemoveDLC = () => console.log('cheese');
//         let handleRemoveDLC = () => this.props.handleRemoveDLC();
//         // handleRemoveDLC = this.props.handleRemoveDLC();
//         console.log(this.props);
//         return (
//             <FooterContainer classname="loading-component">
//                 <ul>
//                     <li>Built by <a href="https://lukesecomb.digital">Luke Secomb</a></li>
//                     {/* <li onClick={() => this.removeLocalDLC()}>reset Weather Expansion Data</li> */}
//                     <li onClick={this.props.removeDlc && this.props.checkDlc}>reset Weather Expansion Data</li>
//                     <li>Powered by <a href="https://darksky.net/poweredby/" rel="nofollow noreferrer">Dark Sky</a></li>
//                 </ul>
//             </FooterContainer>
//         )
//     }
// }

// export default Footer

// const FooterContainer = styled.footer`
//     width: 100%;
//     margin: 0;
//     padding: 0;
//     font-family: ${fonts.sans};
//     position: relative;
//     bottom: 0;
//     left: 0;
//     ul {
//         list-style-type: none;
//         padding: 24px 48px;
//         margin: 0;
//         display: grid;
//         grid-template-columns: 1fr 1fr 1fr;
//         /* justify-content: center; */
//         opacity: .5;
//         transition: .5s;
//         &:hover {
//             opacity: 1;
//             transition: .5s;
//         }
//         li {
//             color: ${colors.white};
//             font-size: .75rem;
//             &:nth-of-type(2) {
//                 cursor: pointer;
//             }
//             a {
//                 color: ${colors.gold};
//                 text-decoration: none;
//                 transition: .5s;
//                 opacity: 1;
//                 &:hover {
//                     opacity: .5;
//                     transition: .5s;
//                 }
//             }
//             &:nth-child(1) {
//                 text-align: left;
//             }
//             &:nth-child(2) {
//                 text-align: center;
//             }
//             &:nth-child(3) {
//                 text-align: right;
//             }
//         }
//     }
// `