import { View, Text, StyleSheet } from "react-native";
import { useTransactions } from "../context/TransactionContext";

export default function BalanceCard() {
  const { totalBalance, totalIncome, totalExpense } = useTransactions();

  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Saldo atual</Text>
      <Text style={styles.value}>{formatCurrency(totalBalance)}</Text>

      <View style={styles.row}>
        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>Entradas</Text>
          <Text style={[styles.miniValue, styles.green]}>
            {formatCurrency(totalIncome)}
          </Text>
        </View>
        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>Saídas</Text>
          <Text style={[styles.miniValue, styles.red]}>
            {formatCurrency(totalExpense)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e3a5f",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: "#7aafdf",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  miniCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: 10,
  },
  miniLabel: {
    fontSize: 10,
    color: "#7aafdf",
  },
  miniValue: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  green: { color: "#5dd4a0" },
  red: { color: "#f07070" },
});
