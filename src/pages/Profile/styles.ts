import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: { theme: { colors: { dark: any } } }) =>
    props.theme.colors.dark};
  align-items: center;
  padding-top: 30%;
`;

export const ContainerItems = styled.View`
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 20px;
`;

export const Image = styled.Image`
  margin-bottom: 40px;
  width: 100%;
`;

export const BackIcon = styled.Pressable`
  width: 50px;
  height: 50px;
  position: absolute;
  left: 15px;
  top: 10%;
`;
