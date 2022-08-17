import styled from '@emotion/styled';

const LoadingPageStyle = styled.div`
.loader,
.loader:after {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
.loader {
  margin: 0 auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(4,140,240, 0.2);
  border-right: 1.1em solid rgba(4,140,240, 0.2);
  border-bottom: 1.1em solid rgba(4,140,240, 0.2);
  border-left: 1.1em solid #038cf0;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`;

export default LoadingPageStyle;
