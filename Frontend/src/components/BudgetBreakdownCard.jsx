const BudgetBreakdownCard = ({ breakdown = {}, totalBudget = 0 }) => {
  const items = [
    { label: "Accommodation", value: breakdown.accommodation ?? 0 },
    { label: "Transport", value: breakdown.transport ?? 0 },
    { label: "Food", value: breakdown.food ?? 0 },
    { label: "Activities", value: breakdown.activities ?? 0 },
  ];

  const total =
    breakdown.total ??
    items.reduce((sum, item) => sum + Number(item.value || 0), 0) ??
    totalBudget;

  return (
    <div className="card p-5">
      <h3 className="text-lg font-bold text-warm-900 dark:text-warm-50 mb-4">
        Budget Breakdown
      </h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="text-warm-600 dark:text-warm-300">{item.label}</span>
            <span className="font-semibold text-warm-900 dark:text-warm-50">
              ₨{Number(item.value || 0).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-warm-200 dark:border-warm-700 flex items-center justify-between">
        <span className="font-semibold text-warm-900 dark:text-warm-50">Total</span>
        <span className="font-bold text-teal-700 dark:text-teal-400">
          ₨{Number(total || 0).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default BudgetBreakdownCard;
