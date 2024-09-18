import styled from 'styled-components'
import chroma from 'chroma-js'

const MainApp = styled.div`
  background-color: ${chroma('white').darken(0.25).css()};
  height: 100vh;
`

// const TabContainer = styled.div`
//   overflow-y: hidden;
//   height: 80vh;
//   padding-top: 0.75rem;
//   padding-right: 0.5rem;
//   padding-left: 0.5rem;
// `

const ViewContainer = styled.div`
  padding-top: 0.5rem;
  overflow-x: hidden;
  background-color: ${chroma('white').css()};
  margin-right: 4rem;
  margin-left: 4rem;
  height: 90vh;
`

export default {
  MainApp,
  ViewContainer
}
