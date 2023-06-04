import styled from '@emotion/styled';

export const Formulario = styled.form`
  max-width: 600px;
  width: 95%;
  margin: 5rem auto 0 auto;
`;

export const Campo = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  font-size: 1.8rem;
  width: 100px;
`;

export const InputContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  flex: 1;
  padding: 1rem;
  border: ${({ error }) => (error ? '1px solid red' : '1px solid #ccc')};
  
`;

export const IconoValidacion = styled.span`
  margin-left: 1rem;
  font-size: 1.5rem;
  color: ${({ valido }) => (valido ? 'green' : 'transparent')};
`;

export const Error = styled.p`
  background-color: #fff;
  color: red;
  font-weight: bold;
  font-size: 1.4rem;
  text-align: center;
  text-transform: uppercase;
  padding: 0.5rem;
  margin-left: 1rem;
`;

export const ImputSubmit = styled.input`
  background-color: red;
  color: #fff;
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  font-size: 1.8rem;
  border: none;
  font-family: 'PT Sans', sans-serif;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }
`;
