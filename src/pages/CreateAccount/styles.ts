import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props: { theme: { colors: { dark: any } } }) =>
    props.theme.colors.dark};
  align-items: center;
  justify-content: center;
`;

export const PageLayout = styled(WebView)`
  width: ${width}px;
  height: ${height}px;
  margin-top: 30px;
`;
