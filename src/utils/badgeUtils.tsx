export const getBadgeColor = (
  change: number
): "success" | "warning" | "danger" => {
  if (change > 0) return "success";
  if (change < 0) return "danger";
  return "warning";
};
