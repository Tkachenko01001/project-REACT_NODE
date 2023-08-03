import styled from '@emotion/styled';
import { Form, Field } from 'formik';

export const Input = styled(Field)`
  width: 316px;
  border-radius: 8px;
  padding: 18px 14px;
  border: 1px solid #bedbb0;
  opacity: 0.4;
  margin-bottom: 14px;
  background-color: #1f1f1f;
  color: #ffffff;
  box-shadow: 0px 4px 16px 0px rgba(22, 22, 22, 0.08);

  font-family: 'PoppinsMedium', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.28px;

  transition: opacity 250ms linear;

  :last-of-type {
    margin-bottom: 24px;
  }

  &::placeholder {
    color: #ffffff;
  }

  :active,
  :hover,
  :focus {
    outline: 0;
    outline-offset: 0;
    opacity: 1;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: #ffffff;
    box-shadow: 0 0 0 30px #1f1f1f inset !important;
  }
`;

export const FormikForm = styled(Form)`
  display: grid;
  margin-top: 40px;
`;

export const Button = styled.button`
  display: block;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 49px;
  background-color: #bedbb0;
  color: #161616;

  font-family: 'PoppinsMedium', sans-serif;
  font-weight: 500;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;

  text-align: center;
  cursor: pointer;
  padding: 14px 0px;
  border: 0px;
  border-radius: 8px;

  transition: background-color 250ms linear, box-shadow 250ms linear;

  &:hover {
    background-color: #9dc888;
  }
`;

export const ShowHidePass = styled.span`
  position: absolute;
  top: 35%;
  right: 18px;
  transform: translateY(-35%);
  opacity: 0.4;
  justify-content: space-between;
  align-items: center;

  text-align: center;
  cursor: pointer;
  border: 0px;
`;
export const Password = styled.div`
  position: relative;
`;
