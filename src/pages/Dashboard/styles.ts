import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: { theme: { colors: { dark: any } } }) =>
    props.theme.colors.dark};
  padding-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ContainerValues = styled.View`
  width: 80%;
  align-self: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
`;

interface CardIconProps {
  color?: string;
}
export const CardIcon = styled.View<CardIconProps>`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: ${({ color }: any) => color || '#66b03250'};
  margin-right: 10px;
  align-items: center;
  justify-content: center;
`;
