import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTransactions } from "../context/TransactionContext";

const INCOME_EMOJIS = ["💰", "💼", "🏦", "📈", "🎁", "💵", "🤑", "💳"];
const EXPENSE_EMOJIS = [
  "🛒",
  "🍔",
  "⚡",
  "🏠",
  "🚗",
  "🎮",
  "👕",
  "💊",
  "📱",
  "🎬",
  "✈️",
  "🐾",
];

export default function AddScreen() {
  const navigation = useNavigation();
  const { addTransaction } = useTransactions();

  const [type, setType] = useState<"income" | "expense">("income");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [emoji, setEmoji] = useState("💰");

  const emojiList = type === "income" ? INCOME_EMOJIS : EXPENSE_EMOJIS;

  function handleTypeChange(newType: "income" | "expense") {
    setType(newType);
    setEmoji(newType === "income" ? "💰" : "🛒");
  }

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
    addTransaction({ name: name.trim(), value: numericValue, type, emoji });
    setName("");
    setValue("");
    setEmoji("💰");
    setType("income");
    navigation.navigate("Home" as never);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nova transação</Text>

        {/* Tipo */}
        <View style={styles.typeRow}>
          <TouchableOpacity
            style={[
              styles.typeBtn,
              type === "income" && styles.typeBtnActiveIncome,
            ]}
            onPress={() => handleTypeChange("income")}
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
            onPress={() => handleTypeChange("expense")}
          >
            <Text
              style={[styles.typeBtnText, type === "expense" && styles.textRed]}
            >
              Saída
            </Text>
          </TouchableOpacity>
        </View>

        {/* Descrição */}
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Salário, Mercado..."
          placeholderTextColor="#7070a0"
          value={name}
          onChangeText={setName}
        />

        {/* Valor */}
        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="0,00"
          placeholderTextColor="#7070a0"
          keyboardType="decimal-pad"
          value={value}
          onChangeText={setValue}
        />

        {/* Emoji */}
        <Text style={styles.label}>Emoji</Text>
        <View style={styles.emojiGrid}>
          {emojiList.map((e) => (
            <TouchableOpacity
              key={e}
              style={[styles.emojiBtn, emoji === e && styles.emojiBtnActive]}
              onPress={() => setEmoji(e)}
            >
              <Text style={styles.emojiText}>{e}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Preview */}
        <View style={styles.preview}>
          <Text style={styles.previewLabel}>Preview</Text>
          <View style={styles.previewRow}>
            <View
              style={[
                styles.previewIcon,
                type === "income" ? styles.iconIncome : styles.iconExpense,
              ]}
            >
              <Text style={{ fontSize: 20 }}>{emoji}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.previewName}>{name || "Descrição"}</Text>
              <Text style={styles.previewDate}>Hoje</Text>
            </View>
            <Text
              style={[
                styles.previewValue,
                type === "income" ? styles.textGreen : styles.textRed,
              ]}
            >
              {type === "income" ? "+" : "−"} R$ {value || "0,00"}
            </Text>
          </View>
        </View>

        {/* Botão */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Salvar transação</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0f0f1a" },
  content: { padding: 20, paddingTop: 40 },
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
    marginBottom: 8,
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
    marginBottom: 20,
  },
  emojiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  emojiBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#1a1a2e",
    borderWidth: 1,
    borderColor: "#2a2a4a",
    alignItems: "center",
    justifyContent: "center",
  },
  emojiBtnActive: {
    backgroundColor: "#1e3a5f",
    borderColor: "#378ADD",
    borderWidth: 2,
  },
  emojiText: { fontSize: 22 },
  preview: {
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#2a2a4a",
  },
  previewLabel: {
    fontSize: 10,
    color: "#7070a0",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  previewRow: { flexDirection: "row", alignItems: "center" },
  previewIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconIncome: { backgroundColor: "#1a3d2b" },
  iconExpense: { backgroundColor: "#3d1a1a" },
  previewName: { fontSize: 14, color: "#ffffff", fontWeight: "500" },
  previewDate: { fontSize: 12, color: "#7070a0", marginTop: 2 },
  previewValue: { fontSize: 14, fontWeight: "600" },
  saveBtn: {
    backgroundColor: "#378ADD",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtnText: { fontSize: 16, fontWeight: "bold", color: "#ffffff" },
});
