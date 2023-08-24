/* eslint-disable react/destructuring-assignment */
import { Types } from 'theme/theme';

import { Container, Loading, Text, ContainerIconRight } from './styles';

interface ButtonProps {
  color?: string;
  height?: number;
  width?: number;
  textColor?: string;
  backgroundOff?: boolean;
  variant?: Types;
  children?: any;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  onPress: () => void;
  loading?: boolean;
  iconRight?: any;
}

const Button = (props: ButtonProps) => {
  return (
    <Container {...props} disabled={props.loading} activeOpacity={0.85}>
      {props.loading && <Loading color={props.color || '#fff'} />}
      <Text
        style={{
          color: props.color || '#fff',
          fontWeight: '600',
          fontSize: 15,
          lineHeight: 18,
        }}>
        {props.children}
      </Text>
      {props.iconRight && (
        <ContainerIconRight>{props.iconRight}</ContainerIconRight>
      )}
    </Container>
  );
};

export default Button;
