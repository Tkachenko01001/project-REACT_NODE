import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Layout = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(196, 196, 196, 0) 25%,
    #bedbb0 92.19%
  );
`;

export const RegisterFormWindow = styled.div`
  position: absolute;
  width: 100%;
  padding: 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  background-color: #151515;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  @media screen and (min-width: 375px) {
    width: 287px;
  }

  @media screen and (min-width: 768px) {
    padding: 40px;
    width: 344px;
  }
`;

export const Text = styled.span`
  font-family: 'PoppinsSemibold', sans-serif;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.36px;
  margin-right: 14px;
`;

export const AuthLink = styled(Link)`
  color: rgba(255, 255, 255, 0.3);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.36px;
  text-decoration: none;
`;
