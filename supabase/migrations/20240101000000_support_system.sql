-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Tickets table
create table if not exists public.tickets (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade,
    subject varchar(255) not null,
    message text not null,
    priority varchar(20) not null check (priority in ('low', 'medium', 'high', 'urgent')),
    category varchar(50) not null check (category in ('general', 'technical', 'billing', 'other')),
    status varchar(20) not null default 'open' check (status in ('open', 'pending', 'resolved', 'closed')),
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    resolved_at timestamptz,
    resolved_by uuid references auth.users(id)
);

-- Ticket messages table
create table if not exists public.ticket_messages (
    id uuid default uuid_generate_v4() primary key,
    ticket_id uuid references public.tickets(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    message text not null,
    is_staff boolean default false,
    created_at timestamptz default now()
);

-- Contact messages table
create table if not exists public.contact_messages (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id),
    name varchar(50) not null,
    email varchar(255) not null,
    phone varchar(15),
    subject varchar(255) not null,
    message text not null,
    priority varchar(20) not null check (priority in ('low', 'normal', 'high', 'urgent')),
    status varchar(20) not null default 'new' check (status in ('new', 'in_progress', 'resolved', 'closed')),
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    resolved_at timestamptz,
    resolved_by uuid references auth.users(id)
);

-- Notification preferences table
create table if not exists public.notification_preferences (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade unique,
    email_notifications boolean default true,
    push_notifications boolean default true,
    ticket_updates boolean default true,
    marketing_emails boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Notification history table
create table if not exists public.notifications (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade,
    title varchar(255) not null,
    message text not null,
    type varchar(50) not null,
    read boolean default false,
    link varchar(255),
    created_at timestamptz default now()
);

-- Create indexes
create index if not exists tickets_user_id_idx on public.tickets(user_id);
create index if not exists tickets_status_idx on public.tickets(status);
create index if not exists ticket_messages_ticket_id_idx on public.ticket_messages(ticket_id);
create index if not exists contact_messages_status_idx on public.contact_messages(status);
create index if not exists notifications_user_id_idx on public.notifications(user_id);
create index if not exists notifications_read_idx on public.notifications(read);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger tickets_updated_at
    before update on public.tickets
    for each row
    execute function public.handle_updated_at();

create trigger contact_messages_updated_at
    before update on public.contact_messages
    for each row
    execute function public.handle_updated_at();

create trigger notification_preferences_updated_at
    before update on public.notification_preferences
    for each row
    execute function public.handle_updated_at();

-- Row Level Security (RLS) policies
alter table public.tickets enable row level security;
alter table public.ticket_messages enable row level security;
alter table public.contact_messages enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.notifications enable row level security;

-- Tickets policies
create policy "Users can view their own tickets"
    on public.tickets for select
    using (auth.uid() = user_id);

create policy "Users can create their own tickets"
    on public.tickets for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own tickets"
    on public.tickets for update
    using (auth.uid() = user_id);

-- Ticket messages policies
create policy "Users can view messages for their tickets"
    on public.ticket_messages for select
    using (
        auth.uid() in (
            select user_id from public.tickets
            where id = ticket_id
        )
    );

create policy "Users can create messages for their tickets"
    on public.ticket_messages for insert
    with check (
        auth.uid() in (
            select user_id from public.tickets
            where id = ticket_id
        )
    );

-- Contact messages policies
create policy "Users can view their own contact messages"
    on public.contact_messages for select
    using (auth.uid() = user_id or user_id is null);

create policy "Anyone can create contact messages"
    on public.contact_messages for insert
    with check (true);

-- Notification preferences policies
create policy "Users can view their own notification preferences"
    on public.notification_preferences for select
    using (auth.uid() = user_id);

create policy "Users can update their own notification preferences"
    on public.notification_preferences for update
    using (auth.uid() = user_id);

create policy "Users can insert their own notification preferences"
    on public.notification_preferences for insert
    with check (auth.uid() = user_id);

-- Notifications policies
create policy "Users can view their own notifications"
    on public.notifications for select
    using (auth.uid() = user_id);

create policy "Users can update their own notifications"
    on public.notifications for update
    using (auth.uid() = user_id);
