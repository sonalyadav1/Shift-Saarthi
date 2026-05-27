import PatientPage from '@/components/patient/patient-page';
import { mockPatients } from '@/lib/mock-data';

export default function Page({ params }: { params: { id: string } }) {
  const patient = mockPatients.find((p) => p.id === params.id);
  return <PatientPage patient={patient ?? null} />;
}
