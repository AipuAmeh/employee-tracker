INSERT INTO departments (department_name)
VALUES  ("Design"),
        ("Production"),
        ("Marketing"),
        ("Styling"),
        ("Finance");

INSERT INTO role (role_title, salary, department_id)
VALUES  ("Fashion Illustrator", 90000, 1),
        ("Stylist", 77000, 4),
        ("Tailor", 79000, 2),
        ("Brand Manager", 85000, 3),
        ("Photographer", 75000, 3),
        ("Accountant", 80000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Ivana", "Lanier", 1, NULL),
        ("Nia", "Maat", 2, 1),
        ("Savanna", "Kanu", 3, NULL),
        ("Jamal", "Cunningham", 4, 1),
        ("Shareen", "El Naga", 5, 3),
        ("Sabo", "Ichapi", 6, 1);
