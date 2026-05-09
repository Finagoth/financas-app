import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Transaction = {
  id: string;
  emoji: string;
  name: string;
  date: string;
  value: number;
  type: "income" | "expense";
};

type TransactionContextData = {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id" | "date">) => void;
  removeTransaction: (id: string) => void;
  isLoading: boolean;
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
};

const STORAGE_KEY = "@financas:transactions";

const initialTransactions: Transaction[] = [
  {
    id: "1",
    emoji: "💼",
    name: "Salário",
    date: "01 Mai 2026",
    value: 3200,
    type: "income",
  },
  {
    id: "2",
    emoji: "🛒",
    name: "Mercado",
    date: "03 Mai 2026",
    value: 350,
    type: "expense",
  },
  {
    id: "3",
    emoji: "⚡",
    name: "Conta de luz",
    date: "05 Mai 2026",
    value: 400,
    type: "expense",
  },
];

const TransactionContext = createContext({} as TransactionContextData);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ── Carregar dados ao abrir o app ──────────────────────────────────────────
  useEffect(() => {
    async function loadTransactions() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);

        if (stored) {
          // Já tem dados salvos — carrega eles
          setTransactions(JSON.parse(stored));
        } else {
          // Primeira vez — salva os dados iniciais
          await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(initialTransactions),
          );
          setTransactions(initialTransactions);
        }
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
        setTransactions(initialTransactions);
      } finally {
        setIsLoading(false);
      }
    }

    loadTransactions();
  }, []);

  // ── Salvar sempre que transactions mudar ───────────────────────────────────
  useEffect(() => {
    if (isLoading) return; // Não salva durante o carregamento inicial

    async function saveTransactions() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
      } catch (error) {
        console.error("Erro ao salvar transações:", error);
      }
    }

    saveTransactions();
  }, [transactions, isLoading]);

  // ── Adicionar transação ────────────────────────────────────────────────────
  function addTransaction(tx: Omit<Transaction, "id" | "date">) {
    const newTransaction: Transaction = {
      ...tx,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  }

  // ── Remover transação ──────────────────────────────────────────────────────
  function removeTransaction(id: string) {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }

  // ── Cálculos automáticos ───────────────────────────────────────────────────
  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, tx) => acc + tx.value, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => acc + tx.value, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
        isLoading,
        totalBalance,
        totalIncome,
        totalExpense,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionContext);
}
