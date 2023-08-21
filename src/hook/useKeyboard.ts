import { useState, useRef, useEffect } from 'react';
import { Keyboard } from 'react-native';

export default function useKeyboard() {
  const [keyboardOffset, setKeyboardOffset] = useState<number>(0);
  const onKeyboardShow = (event: any) => {
    setKeyboardOffset(event.endCoordinates.height);
  };
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardShow
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardHide
    );

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);

  return keyboardOffset;
}
