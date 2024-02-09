# Setup a New Supabase Project for Your Vue Template

## Steps

1. **Create a New Supabase Project**

- Go to the Supabase website and sign up for an account.
- Once you're logged in, click the "Create a new project" button.
- Enter a name for your project and select a region.
- Click the "Create project" button.

2. **Configure enviroment keys**

- Copy .env.example and rename to .env
- Replace `VITE_SUPABASE_URL` with the URL of your Supabase project.
- Replace `VITE_SUPABASE_ANON_KEY` with the API key of your Supabase project.

3. **Create a user profile DB (optional)**

- In SQL Editor, run this script to create a trigger that creates a new user profile for each user sign up

```postgres
create table public.profiles (
id uuid not null references auth.users on delete cascade,
username text,
avatar_url text null default 'https://github.com/shadcn.png'::text,
constraint profiles_username_key unique (username),
primary key (id)
);

alter table public.profiles enable row level security;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

- Setting public access

```postgres
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );
```

- Setting private access

```postgres
create policy "Profiles are viewable by users who created them."
  on profiles for select
  using ( auth.uid() = id );
```

For more info read: https://supabase.com/docs/guides/auth/managing-user-data

## Conclusion

You have now set up a new Supabase project.
