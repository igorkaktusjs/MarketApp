export const LINE_COLORS = {
    open: "#4A90E2",
    close: "#E91E63",
    low: "#4CAF50",
    high: "#FF9800",
  } as const;
  
  export type LineKey = keyof typeof LINE_COLORS;
  