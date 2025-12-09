export interface Grade {
  symbol: string;
  date: string;
  gradingCompany: string;
  previousGrade: string;
  newGrade: string;
  action: string;
  // Campos adicionales inventados para usar en detalle
  targetPrice?: number;
  analystName?: string;
  confidenceLevel?: number; // 0-100
  notes?: string;
  logoUrl?: string;
}
