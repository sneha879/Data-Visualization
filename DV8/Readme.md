# Financial Analytics Data Model – Power BI

## Overview

This project focuses on creating a structured **Power BI data model for financial analytics** using a dedicated Date Table, time-intelligence DAX measures, and hierarchical date drilldowns.

## 1. Configure the Date Table

* Create a dedicated **Date Table** in Power BI.
* Include date attributes such as:

  * Year
  * Quarter
  * Month
  * Month Number
  * Day
* Mark the table as an **Official Date Table** in Power BI.
* Establish a relationship between the Date Table and the financial transaction/fact table using the Date column.

## 2. Create Time-Intelligence DAX Measures

Create DAX measures to analyze financial performance across different time periods.

### Total Sales

```DAX
Total Sales = SUM(FinancialData[Sales])
```

### Year-to-Date Sales

```DAX
Sales YTD =
TOTALYTD(
    [Total Sales],
    'Date'[Date]
)
```

### Previous Period Sales

```DAX
Previous Period Sales =
CALCULATE(
    [Total Sales],
    DATEADD(
        'Date'[Date],
        -1,
        YEAR
    )
)
```

### Previous Year Sales

```DAX
Sales Previous Year =
CALCULATE(
    [Total Sales],
    SAMEPERIODLASTYEAR('Date'[Date])
)
```

> Replace `FinancialData` and the column names with the names used in the actual dataset.

## 3. Create Date Hierarchies

Create a custom hierarchy for interactive drilldown analysis:

```text
Year
 └── Quarter
      └── Month
           └── Day
```

This allows users to drill down from:

**Year → Quarter → Month → Day**

For example:

```text
2025
 ├── Q1
 │    ├── January
 │    ├── February
 │    └── March
 ├── Q2
 ├── Q3
 └── Q4
```

## 4. Build the Financial Data Model

Create a structured model using a **Fact and Dimension table approach**.

### Fact Table

The financial fact table contains transactional information such as:

* Date
* Transaction ID
* Sales
* Cost
* Profit
* Quantity

### Date Dimension

The Date Table contains:

* Date
* Year
* Quarter
* Month
* Month Number
* Day

### Model Structure

```text
              Date Dimension
                    |
                    |
                    1
                    |
                    *
             Financial Fact
                    |
        -------------------------
        |           |           |
      Sales        Cost       Profit
```

Create the appropriate **1-to-many relationship** between the Date Dimension and Financial Fact table.

## 5. Financial Analytics

Use the structured model and time-intelligence measures to analyze:

* Current Sales
* Year-to-Date Sales
* Previous Year Sales
* Year-over-Year performance
* Monthly financial trends
* Quarterly performance
* Daily financial performance

## 6. Expected Outcome

The final Power BI model should provide:

* Official Date Table
* Time-intelligence DAX measures
* Year–Quarter–Month–Day hierarchy
* Proper fact and dimension structure
* Correct table relationships
* Drilldown-based financial analysis
* A structured model optimized for financial analytics

## Concepts Covered

* Power BI Date Table
* Mark as Date Table
* DAX Time Intelligence
* `DATEADD`
* `TOTALYTD`
* `SAMEPERIODLASTYEAR`
* Custom Date Hierarchy
* Drilldown
* Fact and Dimension Tables
* Relationships
* Financial Data Modeling
* Time-based Financial Analysis

