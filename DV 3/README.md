# R Programming – Basic Concepts and Programs

This README contains basic R programming concepts, syntax, examples, and outputs.

---

## 1. Variables and Data Types

```r
name <- "Sneha"
age <- 25
mark <- 85.5

print(name)
print(age)
print(mark)
```

### Output

```text
[1] "Sneha"
[1] 25
[1] 85.5
```

---

## 2. Taking User Input

```r
name <- readline("Enter your name: ")
age <- as.integer(readline("Enter your age: "))

print(name)
print(age)
```

### Output

```text
[1] "sneha"
[1] 23
```

---

## 3. Numeric Input

```r
mark <- as.numeric(readline("Enter your mark: "))

print(mark)
```

---

## 4. Arithmetic Operators

```r
a <- 20
b <- 6

print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a %% b)
print(a ^ b)
```

### Output

```text
[1] 26
[1] 14
[1] 120
[1] 3.333333
[1] 2
[1] 6.4e+07
```

### Operators

| Operator | Meaning        |
| -------- | -------------- |
| `+`      | Addition       |
| `-`      | Subtraction    |
| `*`      | Multiplication |
| `/`      | Division       |
| `%%`     | Modulus        |
| `^`      | Power          |

---

## 5. Vectors

```r
marks <- c(85, 90, 76, 88, 95)

print(marks)
```

### Output

```text
[1] 85 90 76 88 95
```

---

## 6. Accessing Vector Elements

```r
print(marks[1])
print(marks[3])
```

### Output

```text
[1] 85
[1] 76
```

> R uses **1-based indexing**, so the first element is at position `1`.

---

## 7. Vector Functions

```r
print(length(marks))
print(sum(marks))
print(mean(marks))
print(max(marks))
print(min(marks))
```

### Output

```text
[1] 5
[1] 434
[1] 86.8
[1] 95
[1] 76
```

Functions

| Function   | Purpose                      |
| ---------- | ---------------------------- |
| `length()` | Finds the number of elements |
| `sum()`    | Calculates the total         |
| `mean()`   | Calculates the average       |
| `max()`    | Finds the maximum value      |
| `min()`    | Finds the minimum value      |


 8. Character Vector

```r
students <- c("Arun", "Priya", "Kumar", "Divya")

print(students)
print(students[2])
```

Output

```tex
```

