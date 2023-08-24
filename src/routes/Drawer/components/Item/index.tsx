import Icon from 'react-native-vector-icons/MaterialIcons';

import { ListProps } from 'routes/Drawer/types';

import { Button, Text } from './styles';

interface Props {
  data: ListProps;
  onPress: () => void;
}

const GetIcon = ({ name }: any) => {
  return <Icon name={name} size={30} color="white" />;
};

const Item = ({ data, onPress }: Props) => {
  return (
    <Button onPress={onPress} hasIcon={!!data.icon} active={data.active}>
      <GetIcon name={data.icon} />

      <Text style={{ marginLeft: 15 }}>{data.label}</Text>
    </Button>
  );
};

export default Item;
