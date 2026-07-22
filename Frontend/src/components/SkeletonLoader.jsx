export function SkeletonDayCard() {
  return (
    <div className="card p-6 space-y-5">
      <div className="skeleton h-6 w-24 rounded-lg" />

      {["Morning", "Afternoon", "Evening"].map((slot) => (
        <div key={slot} className="space-y-2">
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-5 w-48 rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-3/4 rounded" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonBudgetCard() {
  const widths = [70, 50, 60, 45];

  return (
    <div className="card p-6 space-y-4">
      <div className="skeleton h-6 w-40 rounded" />

      {widths.map((width, index) => (
        <div key={index} className="space-y-1.5">
          <div className="flex justify-between">
            <div className="skeleton h-4 w-24 rounded" />
            <div className="skeleton h-4 w-16 rounded" />
          </div>

          <div className="h-2.5 bg-warm-200 dark:bg-warm-700 rounded-full overflow-hidden">
            <div
              className="skeleton h-full rounded-full"
              style={{ width: `${width}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonAttractionCard() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton h-40 w-full rounded-none" />

      <div className="p-4 space-y-2">
        <div className="skeleton h-5 w-32 rounded" />
        <div className="skeleton h-4 w-20 rounded" />
      </div>
    </div>
  );
}

export function SkeletonTripCard() {
  return (
    <div className="card p-5 space-y-3">
      <div className="skeleton h-6 w-36 rounded" />
      <div className="skeleton h-4 w-48 rounded" />
      <div className="skeleton h-4 w-32 rounded" />

      <div className="flex gap-2 pt-2">
        <div className="skeleton h-8 w-16 rounded-lg" />
        <div className="skeleton h-8 w-16 rounded-lg" />
        <div className="skeleton h-8 w-16 rounded-lg" />
      </div>
    </div>
  );
}