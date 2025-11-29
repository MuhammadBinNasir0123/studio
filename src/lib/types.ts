export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  photoUrl: string;
  photoHint: string;
}

export type ActivityType = 'Meal' | 'Walk' | 'Grooming' | 'Training';
export interface Activity {
  id: string;
  petId: string;
  type: ActivityType;
  date: string; // ISO 8601 format
  notes?: string;
}

export type HealthRecordType = 'Vaccination' | 'Vet Visit' | 'Medication' | 'Infection' | 'Disease';
export interface HealthRecord {
  id: string;
  petId: string;
  type: HealthRecordType;
  date: string; // ISO 8601 format
  details: string;
  vetName?: string;
}

export type ReminderType = 'Feeding' | 'Walking' | 'Medication';
export interface Reminder {
  id: string;
  petId: string;
  type: ReminderType;
  time: string; // "HH:mm"
  frequency: string; // "Daily", "Weekly", etc.
  notes?: string;
  isImportant?: boolean;
}
