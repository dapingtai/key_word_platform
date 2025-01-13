from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.v1.audio_routes import router as audio_routes
from .core.config import get_settings

settings = get_settings()
app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include the item routes

app.include_router(audio_routes)