'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard-header';
import { PatientOverview } from '@/components/patient-overview';
import { UrgentAlerts } from '@/components/urgent-alerts';
import { ShiftHandoffs } from '@/components/shift-handoffs';
import { AIRiskIndicators } from '@/components/ai-risk-indicators';
import { MultilingualSummaries } from '@/components/multilingual-summaries';
import { mockPatients, mockAlerts, mockShiftHandoffs, mockRiskAssessments, mockMultilingualSummaries } from '@/lib/mock-data';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter patients based on search
  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.bed.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Filter other data based on filtered patients
  const filteredAlerts = searchQuery
    ? mockAlerts.filter((alert) =>
        filteredPatients.some((p) => p.id === alert.patientId),
      )
    : mockAlerts;

  const filteredHandoffs = searchQuery
    ? mockShiftHandoffs.filter((handoff) =>
        filteredPatients.some((p) => p.id === handoff.patientId),
      )
    : mockShiftHandoffs;

  const filteredAssessments = searchQuery
    ? mockRiskAssessments.filter((assessment) =>
        filteredPatients.some((p) => p.id === assessment.patientId),
      )
    : mockRiskAssessments;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader onSearch={setSearchQuery} />

        {/* Main Content Sections */}
        {searchQuery ? (
          <>
            {filteredPatients.length > 0 ? (
              <>
                <PatientOverview patients={filteredPatients} />
                <UrgentAlerts alerts={filteredAlerts} />
                <ShiftHandoffs handoffs={filteredHandoffs} />
                <AIRiskIndicators assessments={filteredAssessments} />
              </>
            ) : (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <p className="text-muted-foreground text-lg">No patients found matching &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </>
        ) : (
          <>
            <PatientOverview patients={filteredPatients} />
            <UrgentAlerts alerts={filteredAlerts} />
            <ShiftHandoffs handoffs={filteredHandoffs} />
            <AIRiskIndicators assessments={filteredAssessments} />
            <MultilingualSummaries summaries={mockMultilingualSummaries} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
