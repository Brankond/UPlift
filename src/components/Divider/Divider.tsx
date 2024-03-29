// external dependencies
import {View, ViewProps, StyleSheet} from 'react-native';

// internal dependencies
import {ThemeContext} from 'contexts';
import {useContext} from 'react';

type DividerProps = ViewProps;

const Divider = ({style}: DividerProps) => {
  const {theme} = useContext(ThemeContext);
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.tintedGrey[800],
          height: StyleSheet.hairlineWidth,
          opacity: 0.3,
          marginVertical: 20,
        },
        style,
      ]}></View>
  );
};

export {Divider};
