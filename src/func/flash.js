import Torch from 'react-native-torch';
import {Button, View, Platform} from 'react-native';
import {useEffect, useState} from 'react';

export default Flash = ({torch}) => {
  useEffect(() => {
    Torch.switchState(torch);
  }, [torch]);

  return null;
};
