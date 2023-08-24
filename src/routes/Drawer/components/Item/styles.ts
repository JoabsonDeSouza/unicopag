import styled, { css } from 'styled-components/native';

interface ButtonProps {
  hasIcon: boolean;
  active: boolean;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  align-items: center;
  flex-direction: row;
  background-color: ${(props: {
    [x: string]: any;
    theme: { colors: { dark: any; primary: any } };
  }) => (props.active ? props.theme.colors.primary : props.theme.colors.dark)};
  margin-bottom: 5px;
  padding-left: 10px;
  width: 80%;
  margin-left: 10%;
  border-radius: 8px;
  height: 40px;
`;

export const Text = styled.Text`
  font-size: 14px;
  font-weight: 500;
  line-height: 26px;
  color: ${({ theme }: any) => theme.colors.white};
`;
