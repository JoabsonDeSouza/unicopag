import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.colors.dark};
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  margin-bottom: 10px;
`;

export const ContainerLogo = styled.View`
  margin-bottom: 10px;
  margin-top: 20px;
  align-items: center;
`;

export const ContainerFields = styled.View`
  margin-top: 15px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  color: ${({ theme }: any) => theme.colors.gray};
  font-size: 13px;
  line-height: 16px;
`;

export const ContainerCheckBox = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerError = styled.View`
  border-radius: 8px;
  background-color: #963f4c70;
  justify-content: center;
  padding-left: 20px;
  width: 90%;
  margin-top: 20px;
  min-height: 70px;
`;
