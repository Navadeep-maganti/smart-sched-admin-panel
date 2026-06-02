import { useMemo } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { DashboardShell } from "./components/layout/DashboardShell";
import { LoginPage } from "./pages/auth/LoginPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { DepartmentsPage } from "./pages/academics/DepartmentsPage";
import { TermsPage } from "./pages/academics/TermsPage";
import { SectionsPage } from "./pages/academics/SectionsPage";
import { SubjectsPage } from "./pages/academics/SubjectsPage";
import { BuildingsPage } from "./pages/infrastructure/BuildingsPage";
import { RoomsPage } from "./pages/infrastructure/RoomsPage";
import { DaysPage } from "./pages/infrastructure/DaysPage";
import { TimeslotsPage } from "./pages/infrastructure/TimeslotsPage";
import { FacultyPage } from "./pages/users/FacultyPage";
import { StudentsPage } from "./pages/users/StudentsPage";
import { ConstraintTypesPage } from "./pages/constraints/ConstraintTypesPage";
import { FacultyConstraintsPage } from "./pages/constraints/FacultyConstraintsPage";
import { AssignmentsPage } from "./pages/timetables/AssignmentsPage";
import { SessionGroupsPage } from "./pages/timetables/SessionGroupsPage";
import { TimetablesPage } from "./pages/timetables/TimetablesPage";
import { TimetableDetailPage } from "./pages/timetables/TimetableDetailPage";
import { EntriesPage } from "./pages/timetables/EntriesPage";
import { SchedulerLabPage } from "./pages/scheduler/SchedulerLabPage";
import { PerformancePage } from "./pages/performance/PerformancePage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { SectionTimetablePage } from "./pages/visualization/SectionTimetablePage";
import { FacultyTimetablePage } from "./pages/visualization/FacultyTimetablePage";
import { RoomTimetablePage } from "./pages/visualization/RoomTimetablePage";
import { getStoredProfile } from "./hooks/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("access");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const profile = useMemo(() => getStoredProfile(), []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    queryClient.clear();
    navigate("/login");
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardShell onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route
                  path="profile"
                  element={<ProfilePage profile={profile} />}
                />
                <Route
                  path="academics/departments"
                  element={<DepartmentsPage />}
                />
                <Route path="academics/terms" element={<TermsPage />} />
                <Route path="academics/sections" element={<SectionsPage />} />
                <Route path="academics/subjects" element={<SubjectsPage />} />
                <Route
                  path="infrastructure/buildings"
                  element={<BuildingsPage />}
                />
                <Route path="infrastructure/rooms" element={<RoomsPage />} />
                <Route path="infrastructure/days" element={<DaysPage />} />
                <Route
                  path="infrastructure/timeslots"
                  element={<TimeslotsPage />}
                />
                <Route path="users/faculty" element={<FacultyPage />} />
                <Route path="users/students" element={<StudentsPage />} />
                <Route
                  path="constraints/types"
                  element={<ConstraintTypesPage />}
                />
                <Route
                  path="constraints/faculty"
                  element={<FacultyConstraintsPage />}
                />
                <Route
                  path="timetables/assignments"
                  element={<AssignmentsPage />}
                />
                <Route
                  path="timetables/session-groups"
                  element={<SessionGroupsPage />}
                />
                <Route path="timetables/list" element={<TimetablesPage />} />
                <Route
                  path="timetables/list/:timetableId"
                  element={<TimetableDetailPage />}
                />
                <Route path="timetables/entries" element={<EntriesPage />} />
                <Route
                  path="visualization/section"
                  element={<SectionTimetablePage />}
                />
                <Route
                  path="visualization/faculty"
                  element={<FacultyTimetablePage />}
                />
                <Route
                  path="visualization/room"
                  element={<RoomTimetablePage />}
                />
                <Route path="scheduler" element={<SchedulerLabPage />} />
                <Route path="performance" element={<PerformancePage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </DashboardShell>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
