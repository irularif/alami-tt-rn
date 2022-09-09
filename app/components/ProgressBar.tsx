import colors from "@assets/colors";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated, StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const ProgressBar = () => {
  const countInterval: any = useRef(null);
  const [count, setCount] = useState(0);
  const [pause, setPause] = useState(false);
  const animated = useRef(new Animated.Value(0)).current;
  const load = (count: number) => {
    Animated.timing(animated, {
      toValue: count,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const toggle = () => {
    setPause((old) => !old);
  };

  const runInterval = useCallback(() => {
    if (pause) {
      clearInterval(countInterval.current);
    } else {
      countInterval.current = setInterval(
        () => setCount((old) => old + Math.floor(Math.random() * 10) + 1),
        1000
      );
    }
  }, [pause]);

  useEffect(() => {
    runInterval();

    return () => {
      clearInterval(countInterval.current);
    };
  }, [pause]);

  useEffect(() => {
    load(count);
    if (count >= 100) {
      setCount(100);
      clearInterval(countInterval);
    }
  }, [count]);

  const width = animated.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  const style = StyleSheet.flatten([
    StyleSheet.absoluteFill,
    // @ts-ignore
    Styles.fillBar,
    {
      // @ts-ignore
      width,
    },
  ]);

  return (
    <TouchableOpacity onPressIn={toggle} onPressOut={toggle}>
      <View style={Styles.progressBar}>
        <Animated.View style={style} />
        <Text style={Styles.label}>{count}%</Text>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  progressBar: {
    height: 20,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    borderColor: colors.divider,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  fillBar: { backgroundColor: colors.primary, width: "0%" },
  label: {
    fontSize: 10,
  },
});

export default ProgressBar;
