import { EmergencyKeyword } from '../types';

export const emergencyKeywords: EmergencyKeyword[] = [
  { keyword: 'accident', priority: 'high' },
  { keyword: 'injured', priority: 'high' },
  { keyword: 'fire', priority: 'high' },
  { keyword: 'urgent', priority: 'medium' },
  { keyword: 'danger', priority: 'high' },
  { keyword: 'emergency', priority: 'high' },
  { keyword: 'help', priority: 'medium' },
  { keyword: 'stuck', priority: 'medium' },
  { keyword: 'trapped', priority: 'high' },
  { keyword: 'bleeding', priority: 'high' },
  { keyword: 'unconscious', priority: 'high' },
  { keyword: 'explosion', priority: 'high' },
  { keyword: 'gas leak', priority: 'high' },
  { keyword: 'flood', priority: 'high' },
  { keyword: 'violence', priority: 'high' }
];
