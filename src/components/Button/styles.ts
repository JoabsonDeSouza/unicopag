import styled from 'styled-components/native';

interface ContainerProps {
  width?: number;
  height?: number;
  color?: string;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  backgroundOff?: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  flex-direction: row;
  width: ${({ width }) => width || 100}%;
  height: ${({ height }) => height || 56}px;
  background-color: ${({ color, theme, backgroundOff }) =>
    backgroundOff ? 'transparent' : color || theme.colors.primary};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-left: ${({ left }) => left || 0}px;
  margin-right: ${({ right }) => right || 0}px;
  margin-top: ${({ top }) => top || 0}px;
  margin-bottom: ${({ bottom }) => bottom || 0}px;
`;

export const Loading = styled.ActivityIndicator`
  margin-right: 10px;
`;

export const Text = styled.Text``;

export const ContainerIconRight = styled.View`
  margin-left: 10px;
`;
