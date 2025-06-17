export const LINE_COLORS = {
    open: "#E8618C",
    high: "#0A0A7C",
    low: "#22CCB2",
    close: "#379AE6",
    
    
  } as const;
  
  export type LineKey = keyof typeof LINE_COLORS;
  