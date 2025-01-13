# FastAPI Multi-Environment Setup

This FastAPI application supports multiple environments (SIT, UAT, PROD) with different configurations for each.

## Running the Application

1. Set up your environment variables in a `.env` file (optional)
2. Run the application using:

```bash
# Set environment (defaults to SIT if not specified)
export ENVIRONMENT=sit  # or uat/prod

# Run the application
python run.py
```

## Environment Features

- **SIT (System Integration Testing)**
  - Debug mode enabled
  - Hot reload enabled
  - Single worker

- **UAT (User Acceptance Testing)**
  - Debug mode enabled
  - Hot reload enabled
  - Single worker

- **PROD (Production)**
  - Debug mode disabled
  - Hot reload disabled
  - Multiple workers (4)