import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { height, width } = Dimensions.get('window');

export const Container = styled.View`
  position: absolute;
  width: ${width}px;
  height: ${height}px;
  background-color: ${(props: { theme: { colors: { dark: any } } }) =>
    props.theme.colors.dark};
  align-items: center;
`;

export const Image = styled.Image`
  margin-bottom: 10px;
`;

export const ContainerLogo = styled.View`
  margin-top: 140px;
  margin-bottom: 70px;
`;

export const ContainerFields = styled.View`
  flex: 1;
  margin-top: 30px;
  width: 90%;
  align-items: center;
`;
