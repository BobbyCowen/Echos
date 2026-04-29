import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type FieldShellProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};

const FieldShell = ({ label, hint, children }: FieldShellProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  header: {
    gap: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  hint: {
    fontSize: 13,
    color: '#64748b',
  },
});

export default FieldShell;
