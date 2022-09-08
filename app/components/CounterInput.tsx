import colors from "@assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface CounterInputProps {
  maxValue?: number;
  value: number;
  onChange: (value: number) => void;
}

const CounterInput = (props: CounterInputProps) => {
  const { maxValue, value, onChange } = props;
  const [_value, _setValue] = useState(value);

  const onChangeText = useCallback((value: string) => {
    let v = Number(value.replace(/[^0-9]/g, ""));
    if (!!maxValue && v > maxValue) {
      v = maxValue;
    } else if (v < 0) {
      v = 0;
    }
    _setValue(v);
    setValue(v);
  }, []);

  const subtraction = useCallback(() => {
    let v = _value - 1;
    if (v < 0) {
      v = 0;
    }
    _setValue(v);
    setValue(v);
  }, [_value]);
  const summation = useCallback(() => {
    let v = _value + 1;
    if (!!maxValue && v > maxValue) {
      v = maxValue;
    }
    _setValue(v);
    setValue(v);
  }, [_value, maxValue]);

  const setValue = useCallback(
    debounce((_value) => {
      onChange(_value);
    }, 300),
    []
  );

  useEffect(() => {
    if (value != _value) {
      _setValue(value);
    }
  }, [value]);

  return (
    <View style={Styles.wrapper}>
      <TouchableOpacity onPress={subtraction} style={Styles.button}>
        <Ionicons name="remove" color="#fff" size={24} />
      </TouchableOpacity>
      <TextInput
        value={String(_value)}
        onChangeText={onChangeText}
        keyboardType="number-pad"
        style={Styles.input}
      />
      <TouchableOpacity onPress={summation} style={Styles.button}>
        <Ionicons name="add" color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    borderRadius: 8,
    padding: 4,
    backgroundColor: colors.success,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.divider,
    marginHorizontal: 4,
    paddingHorizontal: 4,
    paddingVertical: 8,
    minWidth: 40,
    textAlign: "center",
  },
});

export default CounterInput;
