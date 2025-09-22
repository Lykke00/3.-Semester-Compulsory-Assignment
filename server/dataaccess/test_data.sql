-- Insert authors
insert into library.author (id, name, createdAt) values
                                                     ('a1', 'J.K. Rowling', now()),
                                                     ('a2', 'George R.R. Martin', now()),
                                                     ('a3', 'J.R.R. Tolkien', now());

-- Insert genres
insert into library.genre (id, name, createdAt) values
                                                    ('g1', 'Fantasy', now()),
                                                    ('g2', 'Science Fiction', now()),
                                                    ('g3', 'Mystery', now());

-- Insert books
insert into library.book (id, title, pages, createdAt, genreId) values
                                                                    ('b1', 'Harry Potter and the Philosopher''s Stone', 223, now(), 'g1'),
                                                                    ('b2', 'Harry Potter and the Chamber of Secrets', 251, now(), 'g1'),
                                                                    ('b3', 'A Game of Thrones', 694, now(), 'g1'),
                                                                    ('b4', 'A Clash of Kings', 768, now(), 'g1'),
                                                                    ('b5', 'The Hobbit', 310, now(), 'g1'),
                                                                    ('b6', 'The Fellowship of the Ring', 423, now(), 'g1'),
                                                                    ('b7', 'The Two Towers', 352, now(), 'g1'),
                                                                    ('b8', 'The Return of the King', 416, now(), 'g1');

-- Insert author-book relationships
insert into library.authorbookjunction (authorId, bookId) values
                                                              ('a1', 'b1'),
                                                              ('a1', 'b2'),
                                                              ('a2', 'b3'),
                                                              ('a2', 'b4'),
                                                              ('a3', 'b5'),
                                                              ('a3', 'b6'),
                                                              ('a3', 'b7'),
                                                              ('a3', 'b8');
