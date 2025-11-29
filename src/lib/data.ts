import type { User, Pet, Activity, HealthRecord, Reminder } from '@/lib/types';

export const sampleUser: User = {
  uid: 'mock-user-id-123',
  email: 'alex@example.com',
  displayName: 'Alex Doe',
  photoURL: 'https://picsum.photos/seed/user/100/100',
};

export const samplePets: Pet[] = [
  {
    id: 'buddy',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 5,
    weight: 28,
    photoUrl: 'https://picsum.photos/seed/buddy/400/400',
    photoHint: 'golden retriever',
  },
  {
    id: 'luna',
    name: 'Luna',
    breed: 'Siamese',
    age: 3,
    weight: 5,
    photoUrl: 'https://picsum.photos/seed/luna/400/400',
    photoHint: 'siamese cat',
  },
  {
    id: 'rocky',
    name: 'Rocky',
    breed: 'Terrier Mix',
    age: 7,
    weight: 12,
    photoUrl: 'https://picsum.photos/seed/rocky/400/400',
    photoHint: 'terrier dog',
  }
];

export const sampleActivities: Activity[] = [
  { id: 'act1', petId: 'buddy', type: 'Walk', date: new Date(Date.now() - 86400000 * 1).toISOString(), notes: 'Evening walk in the park' },
  { id: 'act2', petId: 'buddy', type: 'Meal', date: new Date(Date.now() - 86400000 * 1 + 3600000).toISOString(), notes: '1 cup of kibble' },
  { id: 'act3', petId: 'luna', type: 'Grooming', date: new Date(Date.now() - 86400000 * 2).toISOString(), notes: 'Brushed her fur' },
  { id: 'act4', petId: 'buddy', type: 'Walk', date: new Date(Date.now() - 3600000).toISOString(), notes: 'Morning walk' },
];

export const sampleHealthRecords: HealthRecord[] = [
  { id: 'hr1', petId: 'buddy', type: 'Vaccination', date: new Date('2023-05-20').toISOString(), details: 'Rabies booster', vetName: 'Dr. Smith' },
  { id: 'hr2', petId: 'luna', type: 'Vet Visit', date: new Date('2024-01-10').toISOString(), details: 'Annual check-up', vetName: 'Dr. Anya' },
  { id: 'hr3', petId: 'buddy', type: 'Medication', date: new Date(Date.now() - 86400000 * 5).toISOString(), details: 'Flea & tick treatment' },
];

export const sampleReminders: Reminder[] = [
  { id: 'rem1', petId: 'buddy', type: 'Feeding', time: '08:00', frequency: 'Daily', notes: '1 cup of kibble' },
  { id: 'rem2', petId: 'buddy', type: 'Feeding', time: '18:00', frequency: 'Daily' },
  { id: 'rem3', petId: 'luna', type: 'Medication', time: '10:00', frequency: 'Daily', notes: 'Thyroid pill' },
  { id: 'rem4', petId: 'rocky', type: 'Walking', time: '19:00', frequency: 'Daily' },
];
