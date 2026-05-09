import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTransactions } from "../context/TransactionContext";

export default function AddScreen() {
  const navigation = useNavigation();
  const { addTransaction } = useTransactions();

  const [type, setType] = useState<"income" | "expense">("income");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [emoji, setEmoji] = useState("");

  function handleSave() {
    if (!name.trim() || !value.trim()) {
      Alert.alert("Atenção", "Preencha a descrição e o valor.");
      return;
    }

    const numericValue = parseFloat(value.replace(",", "."));

    if (isNaN(numericValue) || numericValue <= 0) {
      Alert.alert("Atenção", "Digite um valor válido.");
      return;
    }

    addTransaction({
      name: name.trim(),
      value: numericValue,
      type,
      emoji: emoji.trim() || (type === "income" ? "💰" : "💸"),
    });

    // Limpar formulário
    setName("");
    setValue("");
    setEmoji("");
    setType("income");

    // Voltar para Home
    navigation.navigate("Home" as never);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.title}>Nova transação</Text>

        {/* Seletor de tipo */}
        <View style={styles.typeRow}>
          <TouchableOpacity
            style={[
              styles.typeBtn,
              type === "income" && styles.typeBtnActiveIncome,
            ]}
            onPress={() => setType("income")}
          >
            <Text
              style={[
                styles.typeBtnText,
                type === "income" && styles.textGreen,
              ]}
            >
              Entrada
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeBtn,
              type === "expense" && styles.typeBtnActiveExpense,
            ]}
            onPress={() => setType("expense")}
          >
            <Text
              style={[styles.typeBtnText, type === "expense" && styles.textRed]}
            >
              Saída
            </Text>
          </TouchableOpacity>
        </View>

        {/* Campos */}
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Salário, Mercado..."
          placeholderTextColor="#7070a0"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="0,00"
          placeholderTextColor="#7070a0"
          keyboardType="decimal-pad"
          value={value}
          onChangeText={setValue}
        />

        <Text style={styles.label}>Emoji (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="💼"
          placeholderTextColor="#7070a0"
          value={emoji}
          onChangeText={setEmoji}
        />

        {/* Botão salvar */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Salvar transação</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0f0f1a" },
  content: { flex: 1, padding: 20, paddingTop: 40 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 24,
  },
  typeRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  typeBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a2e",
    borderWidth: 1,
    borderColor: "#2a2a4a",
  },
  typeBtnActiveIncome: { backgroundColor: "#1a3d2b", borderColor: "#5dd4a0" },
  typeBtnActiveExpense: { backgroundColor: "#3d1a1a", borderColor: "#f07070" },
  typeBtnText: { fontSize: 14, fontWeight: "600", color: "#7070a0" },
  textGreen: { color: "#5dd4a0" },
  textRed: { color: "#f07070" },
  label: {
    fontSize: 12,
    color: "#7070a0",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#1a1a2e",
    borderWidth: 1,
    borderColor: "#2a2a4a",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 16,
  },
  saveBtn: {
    backgroundColor: "#378ADD",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  saveBtnText: { fontSize: 16, fontWeight: "bold", color: "#ffffff" },
});
