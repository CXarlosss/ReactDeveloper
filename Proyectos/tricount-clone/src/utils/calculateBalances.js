export const calculateBalances = (expenses = [], members = []) => {
  if (!Array.isArray(expenses) || !Array.isArray(members)) return [];

  const balances = {};

  // Paso 1: Inicializamos balances
  members.forEach(user => {
    if (user?.uid) {
      balances[user.uid] = {
        paid: 0,
        shouldPay: 0
      };
    }
  });

  // Paso 2: Procesamos los gastos
  expenses.forEach(exp => {
    if (!exp || typeof exp !== "object") return;

    const { paidBy, amount, splitWith } = exp;

    // Validaciones de seguridad
    if (!paidBy || typeof amount !== "number" || !Array.isArray(splitWith) || splitWith.length === 0) return;
    if (!balances[paidBy]) {
      console.warn("Pagador no encontrado en balances:", paidBy);
      return;
    }

    const splitAmount = amount / splitWith.length;

    // Lo que cada uno debería pagar
    splitWith.forEach(uid => {
      if (!balances[uid]) {
        console.warn("Participante no encontrado en balances:", uid);
        return;
      }
      balances[uid].shouldPay += splitAmount;
    });

    // Lo que pagó el usuario
    balances[paidBy].paid += amount;
  });

  // Paso 3: Calculamos deudas
  const debts = [];
  const users = Object.keys(balances);

  users.forEach(from => {
    users.forEach(to => {
      if (from === to) return;

      const netFrom = balances[from].paid - balances[from].shouldPay;
      const netTo = balances[to].paid - balances[to].shouldPay;
      const diff = netFrom - netTo;

      if (diff < 0 && Math.abs(diff) > 0.01) {
        const amount = Math.min(Math.abs(diff) / 2, Math.abs(netFrom));
        debts.push({
          from,
          to,
          amount: Number(amount.toFixed(2))
        });
      }
    });
  });

  return simplifyDebts(debts);
};

// 🔄 Simplifica deudas cruzadas entre usuarios
function simplifyDebts(debts) {
  const map = {};

  debts.forEach(({ from, to, amount }) => {
    const key = `${from}->${to}`;
    const reverseKey = `${to}->${from}`;

    if (map[reverseKey]) {
      map[reverseKey] -= amount;
    } else {
      map[key] = (map[key] || 0) + amount;
    }
  });

  // Filtramos deudas con 0 o negativas y convertimos a objetos legibles
  return Object.entries(map)
    .filter(([, amount]) => Math.abs(amount) > 0.01)
    .map(([key, amount]) => {
      const [from, to] = key.split("->");
      return amount > 0
        ? { from, to, amount: Number(amount.toFixed(2)) }
        : { from: to, to: from, amount: Number(Math.abs(amount).toFixed(2)) };
    });
}
