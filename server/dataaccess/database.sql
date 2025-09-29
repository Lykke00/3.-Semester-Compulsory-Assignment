drop schema if exists library cascade;
create schema if not exists library;

create table library.author
(
    id        uuid primary key default gen_random_uuid(),
    name      text not null,
    createdAt timestamp with time zone
);

create table library.genre
(
    id        uuid primary key default gen_random_uuid(),
    name      text not null,
    createdAt timestamp with time zone
);

create table library.book
(
    id        uuid primary key default gen_random_uuid(),
    title     text not null,
    pages     int not null,
    createdAt timestamp with time zone,
    genreId   uuid references library.genre (id) on delete set null
);

create table library.authorbookjunction
(
    authorId uuid references library.author (id) on delete cascade,
    bookId   uuid references library.book (id) on delete cascade,
    primary key (authorId, bookId)
);
