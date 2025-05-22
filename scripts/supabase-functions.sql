-- Create admins table
create table if not exists public.admins (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.admins enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Allow authenticated users to read admin data" on public.admins;
drop policy if exists "Allow authenticated users to insert admin data" on public.admins;
drop policy if exists "Allow authenticated users to update admin data" on public.admins;

-- Create policies
create policy "Allow authenticated users to read admin data"
  on public.admins for select
  to authenticated
  using (true);

create policy "Allow authenticated users to insert admin data"
  on public.admins for insert
  to authenticated
  with check (true);

create policy "Allow authenticated users to update admin data"
  on public.admins for update
  to authenticated
  using (true); 