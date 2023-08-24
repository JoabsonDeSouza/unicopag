import { Platform, FlatList } from 'react-native';
import styled from 'styled-components/native';

export const UserName = styled.Text`
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  margin-left: px;
  color: ${(props: { theme: { colors: { white: any } } }) =>
    props.theme.colors.white};
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props: { theme: { colors: { dark: any } } }) =>
    props.theme.colors.dark};
`;

export const Header = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 29px;
  margin-top: ${Platform.OS === 'ios' ? 25 : 70}px;
  margin-bottom: 45px;
  width: ${Platform.OS === 'ios' ? 80 : 100}%;
  align-self: center;
`;

export const ContainerClose = styled.TouchableOpacity``;

export const ContainerUser = styled.View`
  width: 100%;
  flex-direction: row;
  padding-left: 10%;
  align-items: center;
`;

export const UserPictureWrapper = styled.View`
  background-color: ${(props: { theme: { colors: { secondary: any } } }) =>
    props.theme.colors.secondary};

  justify-content: center;
  align-items: center;

  margin-right: 15px;
  width: 34px;
  height: 34px;
  border-radius: 17px;
`;

export const UserPicture = styled.Image`
  background-color: ${(props: { theme: { colors: { secondary: any } } }) =>
    props.theme.colors.secondary};

  width: 45px;
  height: 45px;
  border-radius: 36px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-right: 10px;
`;

export const ContainerCompanies = styled.View`
  margin-top: 5%;
  margin-bottom: 20%;
  height: 45px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  text-align: center;
  padding-bottom: 6px;
  font-size: 10px;
  color: ${({ theme }: any) => theme.colors.dark_gray};
`;

export const ContainerButton = styled.View`
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
`;

export const CompaniesCard = styled.View`
  border-radius: 8px;
  border-width: 1px;
  border-color: gray;
  width: 80%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const CompanyName = styled.Text`
  font-size: 16px;
  line-height: 26px;
  color: ${(props: { theme: { colors: { white: any } } }) =>
    props.theme.colors.white};
`;

export const CompanyItem = styled.TouchableOpacity`
  flex-direction: row;
  width: 90%;
  height: 45px;
  align-items: center;
  justify-content: center;
  padding-bottom: 5px;
  padding-top: 5px;
`;

export const CompanyList = styled(FlatList)``;
