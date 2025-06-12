{
  "measures": ["appointments.count"],
  "dimensions": ["appointments.status"],
  "timeDimensions": [
    {
      "dimension": "appointments.date",
      "granularity": "day",
      "dateRange": "last 36 months"
    }
  ]
}

{
  "measures": ["appointments.count"],
  "dimensions": ["appointments.staff_name", "appointments.price"],
  "timeDimensions": [
    {
      "dimension": "appointments.date",
      "granularity": "day",
      "dateRange": "next 4 weeks"
    }
  ],
  "filters": [
    {
      "dimension": "appointments.status",
      "operator": "equals",
      "values": ["Scheduled", "Completed"]
    }
  ]
}

{
  "measures": ["appointments.count"],
  "dimensions": ["appointments.customer_status"],
  "timeDimensions": [
    {
      "dimension": "appointments.date",
      "granularity": "day",
      "dateRange": "next 4 weeks"
    }
  ],
  "filters": [
    {
      "dimension": "appointments.status",
      "operator": "equals",
      "values": ["Scheduled"]
    }
  ]
}

{
  "measures": ["appointments.count"],
  "dimensions": ["appointments.type", "appointments.price"],
  "timeDimensions": [
    {
      "dimension": "appointments.date",
      "granularity": "day",
      "dateRange": "next 4 weeks"
    }
  ]
}

{
  "measures": ["appointments.count"],
  "timeDimensions": [
    {
      "dimension": "appointments.date",
      "granularity": "day",
      "dateRange": "last 36 months"
    }
  ],
  "filters": [
    {
      "dimension": "appointments.status",
      "operator": "equals",
      "values": ["Cancelled"]
    }
  ]
}

{
  "measures": ["appointments.count"],
  "dimensions": ["appointments.staff_name", "appointments.price"],
  "timeDimensions": [
    {
      "dimension": "appointments.date",
      "granularity": "day",
      "dateRange": "last 12 weeks"
    }
  ],
  "filters": [
    {
      "dimension": "appointments.status",
      "operator": "equals",
      "values": ["Completed"]
    }
  ]
}