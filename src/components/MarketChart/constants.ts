export const LINE_COLORS = {
    open: "#4A90E2",
    high: "#FF9800",
    low: "#4CAF50",
    close: "#E91E63",
    
    
  } as const;
  
  export type LineKey = keyof typeof LINE_COLORS;
  