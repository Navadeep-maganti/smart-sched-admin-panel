import type { UserProfile } from '../../types';
import { Button } from '../../components/ui/Button';

interface ProfilePageProps {
  profile: UserProfile | null;
}

export const ProfilePage = ({ profile }: ProfilePageProps) => {
  if (!profile) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-slate-400">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Profile</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Account details</h2>
          </div>
          <Button variant="secondary">Edit profile</Button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Name</p>
            <p className="mt-2 text-lg font-semibold text-white">{profile.name}</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Email</p>
            <p className="mt-2 text-lg font-semibold text-white">{profile.email}</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Role</p>
            <p className="mt-2 text-lg font-semibold text-white">{profile.role}</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Department</p>
            <p className="mt-2 text-lg font-semibold text-white">{profile.department ?? 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
