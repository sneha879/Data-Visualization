# Netflix Stock Performance Dashboard

## Overview

This project focuses on building an interactive **Netflix Stock Performance Dashboard** using Power BI and a Netflix OHLC stock dataset.

The dashboard analyzes daily stock price movements using **Open, High, Low, Close (OHLC)** values, trading volume, and moving averages.

## Objectives

* Build an interactive **OHLC and Volume trend chart**.
* Analyze daily **Close Price** movements.
* Plot **20-Day Moving Average** and **50-Day Moving Average** curves.
* Implement interactive **date timeline slicers**.
* Use **Quick Parameters** to switch between different stock-price views.
* Deliver an interactive Netflix Stock Performance Dashboard.

## 1. Load the Netflix OHLC Dataset

Import the Netflix stock dataset into Power BI.

Typical columns include:

* Date
* Open
* High
* Low
* Close
* Volume

Go to:

**Home → Get Data → Text/CSV → Transform Data**

Verify that:

* `Date` is recognized as a Date data type.
* Open, High, Low and Close are numeric.
* Volume is numeric.
* Data is sorted correctly by Date.

## 2. Build the OHLC and Volume Trend

Create an interactive financial trend visualization using:

* Date
* Open
* High
* Low
* Close
* Volume

The dashboard should allow users to understand:

* Daily opening price
* Daily highest price
* Daily lowest price
* Daily closing price
* Trading volume
* Overall price movement



## 3. Create Moving Average Measures

 measures for the **20-Day Moving Average** and **50-Day Moving Average** based on the daily Close Price.

### 20-Day Moving Average

```DAX
20 Day MA =
AVERAGEX(
    DATESINPERIOD(
        'Date'[Date],
        MAX('Date'[Date]),
        -20,
        DAY
    ),
    CALCULATE(AVERAGE(NFLX[Close]))
)
```

### 50-Day Moving Average

```DAX
50 Day MA =
AVERAGEX(
    DATESINPERIOD(
        'Date'[Date],
        MAX('Date'[Date]),
        -50,
        DAY
    ),
    CALCULATE(AVERAGE(NFLX[Close]))
)
```


## 4. Compare Close Price with Moving Averages

Create a line chart containing:

* Date → X-axis
* Close Price → Y-axis
* 20-Day Moving Average → Y-axis
* 50-Day Moving Average → Y-axis

This allows users to identify:

* Short-term price trends
* Long-term price trends
* Moving-average crossovers
* Upward and downward trends
* Possible changes in market momentum

## 5. Create Date Timeline Slicer

Add a **Date Slicer** to the dashboard.

Use:

**Date → Slicer**

Configure it as a timeline/range selection so users can analyze specific periods.



* Specific dates
* A date range
* Recent trading periods
* Historical trading periods

All dashboard visuals should respond to the selected date range.

## 6. Create Quick Parameter Switches

Create a **Field Parameter** or **Quick Parameter** to allow users to switch between important stock-price measures.

Example options:

```text
Close Price
20-Day Moving Average
50-Day Moving Average
```

This allows the user to interactively change the metric displayed in the visual instead of creating separate charts.

## 7. Dashboard Components

The final dashboard can contain:

### KPI Cards

* Latest Close Price
* Highest Price
* Lowest Price
* Total Trading Volume

### Main Trend Chart

Display:

* Close Price
* 20-Day Moving Average
* 50-Day Moving Average

### OHLC Analysis

Display daily:

* Open
* High
* Low
* Close

### Volume Chart

Display:

* Date
* Trading Volume

### Interactive Controls

Include:

* Date Timeline Slicer
* Quick/Field Parameter
* Optional year/month filters


```

## 9. Key Insights

The dashboard should help identify:

* Overall Netflix stock price trends
* Short-term price movement
* Long-term price movement
* High and low price periods
* Changes in trading volume
* 20-Day vs 50-Day moving-average behavior
* Periods of increasing or decreasing market activity

## 10. Final Deliverable

The final deliverable is an interactive **Netflix Stock Performance Dashboard** containing:

* OHLC analysis
* Daily Close Price trend
* 20-Day Moving Average
* 50-Day Moving Average
* Volume trend
* Date timeline slicer
* Quick/Field parameter switches
* Interactive financial visuals
* KPI cards
* Stock performance insights

## Concepts Covered

* Power BI
* Netflix OHLC Dataset
* Financial Data Visualization
* OHLC Analysis
* Line Charts
* Volume Analysis
* Moving Averages
* 20-Day Moving Average
* 50-Day Moving Average
* Date Slicers
* Field Parameters
* Interactive Dashboards
* Stock Market Trend Analysis
* KPI Cards
* Financial Analytics
