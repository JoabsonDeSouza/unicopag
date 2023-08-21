import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: { theme: { colors: { dark: any } } }) =>
    props.theme.colors.dark};
  align-items: center;
  justify-content: center;
`;

export const ContainerImage = styled.View`
  width: 100%;
  height: auto;
`;

export const ContainerLogo = styled.View`
  position: absolute;
  top: 42%;
`;

export const Image = styled.Image`
  margin-bottom: 40px;
  width: 100%;
`;
