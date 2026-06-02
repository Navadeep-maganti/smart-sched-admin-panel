import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from '../../api/auth';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof schema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    defaultValues: { remember: true },
  });

  const onSubmit = async (values: LoginForm) => {
    setError(null);
    try {
      const result = await login(values);
      const access = result.access;
      const refresh = result.refresh;
      if (!access) {
        throw new Error('Login succeeded but no token was returned.');
      }
      localStorage.setItem('access', access);
      if (refresh) {
        localStorage.setItem('refresh', refresh);
      }

      const profile = result.user ?? result.profile;
      if (profile) {
        localStorage.setItem('user', JSON.stringify(profile));
      }
      navigate('/');
    } catch (err: any) {
      const backendMessage =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;
      const status = err?.response?.status ? ` (${err.response.status})` : '';
      const message = backendMessage
        ? `${backendMessage}${status}`
        : 'Unable to sign in. Please check credentials.';
      console.error('Login error:', err?.response?.data ?? err?.message);
      setError(message);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 px-4 py-8 text-slate-100">
      <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/95 p-10 shadow-soft">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-500 text-white shadow-soft">
            <ShieldCheck size={28} />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Admin Access</p>
            <h1 className="text-3xl font-semibold text-white">Sign in to Smart Scheduler</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
            <div className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3">
              <Mail size={18} className="text-slate-500" />
              <input
                type="email"
                autoComplete="email"
                {...register('email')}
                className="w-full bg-transparent text-slate-100 outline-none"
                placeholder="admin@university.edu"
              />
            </div>
            {errors.email && <p className="mt-2 text-sm text-rose-400">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
            <div className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3">
              <Lock size={18} className="text-slate-500" />
              <input
                type="password"
                autoComplete="current-password"
                {...register('password')}
                className="w-full bg-transparent text-slate-100 outline-none"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="mt-2 text-sm text-rose-400">{errors.password.message}</p>}
          </div>

          {/* <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('remember')} className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-brand-500" />
              Remember me
            </label>
            <span className="font-medium text-brand-500">Forgot password?</span>
          </div> */}

          {error && <div className="rounded-3xl bg-rose-950 px-4 py-3 text-sm text-rose-300">{error}</div>}

          <Button type="submit" disabled={isSubmitting} className="w-full justify-between">
            <span>{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
            <ArrowRight size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};
