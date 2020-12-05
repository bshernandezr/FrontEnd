/**
 * Model interface for tourist
 */
export interface Tourist {
  id: string;
  name?: string;
  idType?: string;
  birthDate?: string;
  travelFrecuency?: number;
  travelBudget?: number;
  creditCard?: boolean;
  destination?: string;
  gender?: string;
}
