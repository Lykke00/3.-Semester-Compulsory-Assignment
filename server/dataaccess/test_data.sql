-- Insert some genres
INSERT INTO library.genre (id, name, createdAt)
VALUES
    (gen_random_uuid(), 'Fantasy', NOW()),
    (gen_random_uuid(), 'Sci-Fi', NOW()),
    (gen_random_uuid(), 'Romance', NOW()),
    (gen_random_uuid(), 'Mystery', NOW());

-- Insert some authors
INSERT INTO library.author (id, name, createdAt)
VALUES
    (gen_random_uuid(), 'J.K. Rowling', NOW()),
    (gen_random_uuid(), 'Isaac Asimov', NOW()),
    (gen_random_uuid(), 'Agatha Christie', NOW());

-- Insert some books
INSERT INTO library.book (id, title, pages, createdAt, genreId)
VALUES
    (gen_random_uuid(), 'Harry Potter and the Philosopher''s Stone', 223, NOW(),
     (SELECT id FROM library.genre WHERE name = 'Fantasy')),
    (gen_random_uuid(), 'Foundation', 255, NOW(),
     (SELECT id FROM library.genre WHERE name = 'Sci-Fi')),
    (gen_random_uuid(), 'Murder on the Orient Express', 256, NOW(),
     (SELECT id FROM library.genre WHERE name = 'Mystery')),
    (gen_random_uuid(), 'Pride and Prejudice', 279, NOW(),
     (SELECT id FROM library.genre WHERE name = 'Romance'));

-- Link authors to books
INSERT INTO library.authorbookjunction (authorId, bookId)
SELECT a.id, b.id
FROM library.author a
         JOIN library.book b ON (a.name = 'J.K. Rowling' AND b.title LIKE 'Harry Potter%')
UNION ALL
SELECT a.id, b.id
FROM library.author a
         JOIN library.book b ON (a.name = 'Isaac Asimov' AND b.title = 'Foundation')
UNION ALL
SELECT a.id, b.id
FROM library.author a
         JOIN library.book b ON (a.name = 'Agatha Christie' AND b.title LIKE 'Murder%');
