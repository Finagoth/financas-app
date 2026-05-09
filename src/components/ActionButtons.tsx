import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  onPress: () => void;
};

export default function ActionButtons({ onPress }: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.btn, styles.btnIncome]}
        onPress={onPress}
      >
        <Text style={[styles.btnText, styles.textGreen]}>+ Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, styles.btnExpense]}
        onPress={onPress}
      >
        <Text style={[styles.btnText, styles.textRed]}>− Saída</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 10, marginBottom: 24 },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  btnIncome: { backgroundColor: "#1a3d2b" },
  btnExpense: { backgroundColor: "#3d1a1a" },
  btnText: { fontSize: 14, fontWeight: "600" },
  textGreen: { color: "#5dd4a0" },
  textRed: { color: "#f07070" },
});
