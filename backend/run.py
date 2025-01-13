import uvicorn
import os
from app.core.config import Settings
import argparse
import os
from dotenv import load_dotenv

if __name__ == "__main__":
    # Get environment from env var or default to SIT
    parser = argparse.ArgumentParser(description="Run the server in different modes.")
    parser.add_argument("--prod", action="store_true", help="Run the server in production mode.")
    parser.add_argument("--uat", action="store_true", help="Run the server in uat mode.")
    parser.add_argument("--sit", action="store_true", help="Run the server in development mode.")
    
    args = parser.parse_args()

    if args.prod:
        load_dotenv("app/core/.env.prod")
    elif args.uat:
        load_dotenv("app/core/.env.uat")
    else:
        load_dotenv("app/core/.env.sit")

    settings = Settings()
    print(settings, args)
    
    # Set debug mode based on environment
    debug = settings.DEBUG

    # Configure uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=3000,
        reload=debug,
        workers=1 if debug else 4
    )