import type { User, Pet, Activity, HealthRecord, Reminder } from '@/lib/types';

export const sampleUser: User = {
  uid: 'mock-user-id-123',
  email: 'alex@example.com',
  displayName: 'Alex Doe',
  photoURL: 'https://images.unsplash.com/photo-1521566652839-697aa473761a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8cGVyc29ufGVufDB8fHx8MTc2NDMzNTM5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
};

export const samplePets: Pet[] = [
  {
    id: 'buddy',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 5,
    weight: 28,
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1924&auto=format&fit=crop',
    photoHint: 'golden retriever dog',
  },
  {
    id: 'luna',
    name: 'Luna',
    breed: 'Siamese',
    age: 3,
    weight: 5,
    photoUrl: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80&w=2080&auto=format&fit=crop',
    photoHint: 'siamese cat',
  },
  {
    id: 'rocky',
    name: 'Rocky',
    breed: 'Terrier Mix',
    age: 7,
    weight: 12,
    photoUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1964&auto=format&fit=crop',
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
  { id: 'hr4', petId: 'buddy', type: 'Infection', date: new Date('2024-03-15').toISOString(), details: 'Ear infection, right ear. Prescribed drops.', vetName: 'Dr. Smith' },
];

export const sampleReminders: Reminder[] = [
  { id: 'rem1', petId: 'buddy', type: 'Feeding', time: '08:00', frequency: 'Daily', notes: '1 cup of kibble' },
  { id: 'rem2', petId: 'buddy', type: 'Feeding', time: '18:00', frequency: 'Daily' },
  { id: 'rem3', petId: 'luna', type: 'Medication', time: '10:00', frequency: 'Daily', notes: 'Thyroid pill' },
  { id: 'rem4', petId: 'rocky', type: 'Walking', time: '19:00', frequency: 'Daily' },
];
