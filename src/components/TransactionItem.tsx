import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useTransactions } from "../context/TransactionContext";

type Props = {
  id: string;
  emoji: string;
  name: string;
  date: string;
  value: number;
  type: "income" | "expense";
};

export default function TransactionItem({
  id,
  emoji,
  name,
  date,
  value,
  type,
}: Props) {
  const { removeTransaction } = useTransactions();
  const isIncome = type === "income";

  function handleLongPress() {
    Alert.alert("Remover transação", `Deseja remover "${name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => removeTransaction(id),
      },
    ]);
  }

  return (
    <TouchableOpacity style={styles.container} onLongPress={handleLongPress}>
      <View
        style={[styles.icon, isIncome ? styles.iconIncome : styles.iconExpense]}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <Text style={[styles.value, isIncome ? styles.green : styles.red]}>
        {isIncome ? "+" : "−"} R$ {value.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconIncome: { backgroundColor: "#1a3d2b" },
  iconExpense: { backgroundColor: "#3d1a1a" },
  emoji: { fontSize: 18 },
  info: { flex: 1 },
  name: { fontSize: 14, color: "#ffffff", fontWeight: "500" },
  date: { fontSize: 12, color: "#7070a0", marginTop: 2 },
  value: { fontSize: 14, fontWeight: "600" },
  green: { color: "#5dd4a0" },
  red: { color: "#f07070" },
});
