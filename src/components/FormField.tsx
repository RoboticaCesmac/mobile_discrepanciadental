import React, { InputHTMLAttributes } from 'react';
import { StyleSheet, TextInput, View, Text, Keyboard } from 'react-native';
import { TextInputProps } from 'react-native';

interface FormFieldProps extends TextInputProps {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error?: string;
  secureTextEntry?: boolean | undefined;
  maxLength?: number;
  keyboardType?: any
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  placeholder,
  maxLength,
  keyboardType,
  onChangeText,
  secureTextEntry = false,
  error,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        maxLength={maxLength}
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  focusedLabel: {
    color: '#007AFF',
  },
  input: {
    backgroundColor: "#eeeee4",
    width: 343,
    height: 54,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10
  },
  focusedInput: {
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  error:{
    color: 'red',
  }
});

export default FormField;
