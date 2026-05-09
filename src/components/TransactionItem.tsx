import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useState } from "react";
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
  const { removeTransaction, editTransaction } = useTransactions();
  const isIncome = type === "income";

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editValue, setEditValue] = useState(value.toString());

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

  function handleSaveEdit() {
    const numericValue = parseFloat(editValue.replace(",", "."));
    if (!editName.trim() || isNaN(numericValue) || numericValue <= 0) {
      Alert.alert("Atenção", "Preencha nome e valor válidos.");
      return;
    }
    editTransaction(id, {
      name: editName.trim(),
      value: numericValue,
      type,
      emoji,
    });
    setEditing(false);
  }

  if (editing) {
    return (
      <View style={styles.editContainer}>
        <TextInput
          style={styles.editInput}
          value={editName}
          onChangeText={setEditName}
          placeholder="Nome"
          placeholderTextColor="#7070a0"
          autoFocus
        />
        <TextInput
          style={[styles.editInput, { width: 100 }]}
          value={editValue}
          onChangeText={setEditValue}
          keyboardType="decimal-pad"
          placeholder="Valor"
          placeholderTextColor="#7070a0"
        />
        <TouchableOpacity style={styles.saveEdit} onPress={handleSaveEdit}>
          <Text style={styles.saveEditText}>✓</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelEdit}
          onPress={() => setEditing(false)}
        >
          <Text style={styles.cancelEditText}>✕</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setEditing(true)}
      onLongPress={handleLongPress}
    >
      <View
        style={[styles.icon, isIncome ? styles.iconIncome : styles.iconExpense]}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date} · toque para editar</Text>
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
  date: { fontSize: 11, color: "#7070a0", marginTop: 2 },
  value: { fontSize: 14, fontWeight: "600" },
  green: { color: "#5dd4a0" },
  red: { color: "#f07070" },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: "#378ADD",
  },
  editInput: {
    flex: 1,
    backgroundColor: "#0f0f1a",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 13,
    color: "#ffffff",
    borderWidth: 1,
    borderColor: "#2a2a4a",
  },
  saveEdit: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#1a3d2b",
    alignItems: "center",
    justifyContent: "center",
  },
  saveEditText: { color: "#5dd4a0", fontSize: 16, fontWeight: "bold" },
  cancelEdit: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#3d1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelEditText: { color: "#f07070", fontSize: 14, fontWeight: "bold" },
});
