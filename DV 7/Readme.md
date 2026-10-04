# Superstore Sales Dashboard

## Overview

This project focuses on building an **interactive Superstore Sales Dashboard** using Power BI.

The dashboard provides an executive-level view of sales performance, category performance, and regional profitability using **DAX measures, KPI cards, and interactive visuals**.

---

## 1. Create a Dedicated Measures Table

Create a separate table named:

```text
_Measures
```

This table is used to store all DAX measures in one dedicated location.

### Example DAX Measures

```DAX
Total Sales = SUM(Superstore[Sales])
```

```DAX
Total Profit = SUM(Superstore[Profit])
```

```DAX
Total Orders = DISTINCTCOUNT(Superstore[Order ID])
```

```DAX
Total Quantity = SUM(Superstore[Quantity])
```

```DAX
Profit Margin = DIVIDE([Total Profit], [Total Sales], 0)
```

The measures should be organized under the `_Measures` table rather than being scattered across the data table.

---

## 2. Executive Summary

Create a top-line executive summary section using **KPI Cards**.

### Recommended KPI Cards

* **Total Sales**
* **Total Profit**
* **Total Orders**
* **Total Quantity**
* **Profit Margin**

These cards provide a quick overview of the overall business performance.

---

## 3. Category Performance

Create visuals to analyze performance across product categories.

### Recommended Visuals

**Sales by Category**

* Category on Axis
* Total Sales as Values

**Profit by Category**

* Category on Axis
* Total Profit as Values

**Sales and Profit by Sub-Category**

* Sub-Category
* Sales
* Profit

These visuals help identify which product categories and sub-categories perform better.

---

## 4. Regional Profitability

Create visuals to analyze profitability across different regions.

### Recommended Visuals

**Profit by Region**

* Region on Axis
* Total Profit as Values

**Sales by Region**

* Region on Axis
* Total Sales as Values

**Profit Margin by Region**

* Region
* Profit Margin

This allows users to identify high-performing and low-performing regions.

---

## 5. Interactive Dashboard

Add interactive controls to allow users to explore the dashboard.

### Recommended Slicers

* Region
* Category
* Sub-Category
* Segment

The visuals and KPI cards should respond dynamically when users select different slicer values.

---
```

