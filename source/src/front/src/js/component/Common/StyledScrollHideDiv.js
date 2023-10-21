import styled from "@emotion/styled";


const StyledScrollHideDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 50px;
  overflow-y: auto;
  width: 100%;
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE and Edge

  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, and Opera
  }
`;


export default StyledScrollHideDiv;