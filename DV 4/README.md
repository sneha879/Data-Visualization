# Employee Attrition Analysis in R

## Overview

This performs **Exploratory Data Analysis (EDA)** on an Employee Attrition dataset using R.

The analysis includes:

* Loading the dataset
* Understanding the structure of the data
* Generating summary statistics
* Checking column names
* Checking missing values
* Checking duplicate records
* Analyzing employee attrition
* Visualizing employee age distribution
* Comparing age with attrition
* Comparing monthly income with attrition
* Analyzing attrition by gender

---

## 1. Load the Dataset

```r
data <- read.csv("Employee-Attrition.csv")

head(data)
str(data)
summary(data)
```

The dataset contains **1470 observations and 35 variables**.

---

## 2. Check Column Names

```r
names(data)
```

The dataset contains employee-related attributes such as:

* Age
* Attrition
* BusinessTravel
* Department
* DistanceFromHome
* Education
* Gender
* JobRole
* JobSatisfaction
* MonthlyIncome
* OverTime
* PerformanceRating
* TotalWorkingYears
* YearsAtCompany
* YearsInCurrentRole
* YearsSinceLastPromotion
* YearsWithCurrManager

and other employee-related variables.

---

## 3. Check Missing Values

```r
colSums(is.na(data))
```

The analysis shows **0 missing values** across the listed columns.

---

## 4. Check Duplicate Records

```r
sum(duplicated(data))
```

### Output

```text
[1] 0
```

There are no duplicate records in the dataset.

---

## 5. Employee Attrition

```r
table(data$Attrition)
```

### Output

```text
 No  Yes
1233 237
```

### Attrition Visualization

```r
barplot(
  table(data$Attrition),
  main = "Employee Attrition",
  xlab = "Attrition",
  ylab = "Number of Employees"
)
```

```r
pie(
  table(data$Attrition),
  main = "Employee Attrition"
)
```

---

## 6. Attrition Percentage

```r
prop.table(table(data$Attrition)) * 100
```

### Output

```text
      No      Yes
83.87755 16.12245
```

---

## 7. Age Distribution

```r
hist(
  data$Age,
  main = "Age Distribution",
  xlab = "Age",
  ylab = "Number of Employees"
)
```

This visualization shows the distribution of employee ages.

---

## 8. Age vs Attrition

```r
boxplot(
  Age ~ Attrition,
  data = data,
  main = "Age vs Attrition",
  xlab = "Attrition",
  ylab = "Age"
)
```

This compares employee age distributions between employees who stayed and those who left.

---

## 9. Monthly Income vs Attrition

```r
boxplot(
  MonthlyIncome ~ Attrition,
  data = data,
  main = "Monthly Income vs Attrition",
  xlab = "Attrition",
  ylab = "Monthly Income"
)
```

This compares monthly income across the two attrition categories.

---

## 10. Attrition by Gender

```r
table(dataAttrition)
```

### Output

```text
        No Yes
Female 501  87
Male   732 150
```

### Visualization

```r
barplot(
  table(dataAttrition),
  beside = TRUE,
  legend = TRUE,
  main = "Attrition by Gender",
  xlab = "Gender",
  ylab = "Number of Employees"
)
```

---

## Concepts Covered

* R Data Import
* `read.csv()`
* `head()`
* `str()`
* `summary()`
* `names()`
* Missing Value Analysis
* Duplicate Detection
* Frequency Tables
* Percentage Calculation
* Bar Plot
* Pie Chart
* Histogram
* Box Plot
* Employee Attrition Analysis
* Gender-based Analysis
* Exploratory Data Analysis (EDA)

---

## Dataset Summary

| Property          | Value |
| ----------------- | ----: |
| Total Employees   |  1470 |
| Total Variables   |    35 |
| Missing Values    |     0 |
| Duplicate Records |     0 |
| Attrition: No     |  1233 |
| Attrition: Yes    |   237 |
