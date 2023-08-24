import styled from 'styled-components/native';
import { Appbar } from 'react-native-paper';

export const Container = styled(Appbar.Header)`
  background-color: ${(props) => props.theme.colors.dark};
  align-items: center;
  justify-content: flex-end;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  height: 10px;
  margin-bottom: 20px;
`;

export const IconContainer = styled.TouchableOpacity`
  position: absolute;
  left: 0px;
`;
