export type Product = {
  id: string;
  name: string;
  category: "E" | "L" | "M" | "I";
  price: number;
  description: string | null;
  created_at: string;
};

export const categoryMap = {
  E: "Eletrodoméstico",
  L: "Limpeza",
  M: "Móveis",
  I: "Informática",
};