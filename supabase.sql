-- Appointments table
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  date date not null,
  time text not null,
  practice_area text not null,
  message text,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc', now())
);

-- Contact messages table
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc', now())
);