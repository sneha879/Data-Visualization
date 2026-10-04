# Superstore Data Transformation Using Power Query

## Overview

This project focuses on preparing the **Superstore CSV dataset** for analysis using **Power BI Power Query Editor**.

The main objective is to import, transform, standardize, and prepare the data before loading it into the Power BI data model.

---

## 1. Load the Superstore CSV

Open **Power BI Desktop** and import the Superstore CSV file.

### Steps

1. Open Power BI Desktop.
2. Select **Home → Get Data → Text/CSV**.
3. Select the Superstore CSV file.
4. Click **Transform Data** to open Power Query Editor.

---

## 2. Standardize Text Formatting

Standardize the categorical columns:

* `Category`
* `Sub-Category`
* `Segment`

### Power Query Transformations

Use:

**Transform → Format → UPPERCASE**

or

**Transform → Format → lowercase**

or

**Transform → Format → Capitalize Each Word**

Example:

```text
technology  → Technology
OFFICE SUPPLIES → Office Supplies
consumer → Consumer
```

The objective is to ensure that the same category is represented consistently throughout the dataset.

---

## 3. Create Date Columns

Use the existing date field to create additional date-related columns.

Suggested columns:

* Year
* Month
* Month Name
* Quarter
* Day

### Using Power Query UI

Select the date column and use:

**Add Column → Date**

Then select the required transformation such as:

* Year
* Month
* Quarter
* Day

---

## 4. Create Date Columns Using M Code

Power Query can also create custom columns using **M language**.

### Year

```m
Date.Year([Order Date])
```

### Month

```m
Date.Month([Order Date])
```

### Month Name

```m
Date.MonthName([Order Date])
```

### Quarter

```m
"Q" & Number.ToText(Date.QuarterOfYear([Order Date]))
```

### Day

```m
Date.Day([Order Date])
```

These transformations create additional fields that can be used for analysis and visualization.

---

## 5. Validate the Transformed Data

Before loading the data, verify:

* Category values are standardized.
* Sub-Category values are standardized.
* Segment values are standardized.
* Date columns contain valid values.
* Newly created date columns contain the expected results.
* No unwanted columns or errors remain.

---

## 6. Close & Apply

After completing all transformations:

1. Select **Home**.
2. Click **Close & Apply**.
3. Power BI loads the transformed data into the data model.

---

## Final Outcome

The Superstore dataset is transformed into a **clean and analysis-ready dataset** containing standardized categorical attributes and useful date dimensions.

### Concepts Covered

* CSV Data Import
* Power Query Editor
* Text Standardization
* Categorical Data Transformation
* Date Transformation
* Custom Columns
* Power Query M Language
* Data Validation
* Close & Apply
* Preparing Data for Power BI Analytics
