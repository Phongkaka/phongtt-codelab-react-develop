import styled from 'styled-components'

export default styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    display: block;
    content: "";
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 6px solid #292929;
    border-left-color: rgba(41, 41, 41, 0.5);
    border-right-color: rgba(41, 41, 41, 0.5);
    animation: rotation 1s infinite linear;
  }
`
