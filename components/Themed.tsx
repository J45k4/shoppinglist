/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from 'react';
import { Pressable, StyleProp, Text as DefaultText, View as DefaultView, ViewStyle } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[style]} {...otherProps} />;
}

export const Button = (props: {
  title: string,
  onPress: () => void,
  style?: {
    fontSize?: number,
    width?: number,
    height?: number,
    marginLeft?: number,
    marginRight?: number,
    paddingTop?: number,
    paddingBottom?: number,
    flex?: number
  }
}) => {
  return (
    <Pressable style={{
      ...props.style,
      backgroundColor: "#aadbf6",
      width: props.style?.width,
      height: props.style?.height,
      marginLeft: props.style?.marginLeft,
      marginRight: props.style?.marginRight,
      paddingTop: props.style?.paddingTop,
      paddingBottom: props.style?.paddingBottom,
      flex: props.style?.flex,
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    }} onPress={props.onPress}>
      <Text style={{
        color: "black",
        fontSize: props.style?.fontSize
      }}>
        {props.title}
      </Text>
    </Pressable>
  )
}