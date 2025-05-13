import type { Patient, DraftPatient } from './types';
import { create } from 'zustand';
import {v4 as uuidv4} from 'uuid'

type PatientState = {
  patients: Patient[];
  addPatient: (data: DraftPatient) => void;
};

const createPatient = (patient: DraftPatient): Patient => ({
  ...patient,
  id: uuidv4(),
});

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  addPatient: (data) =>
    set((state) => ({
      patients: [...state.patients, createPatient(data)],
    })),
}));

