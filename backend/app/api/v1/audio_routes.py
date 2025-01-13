from fastapi import APIRouter, HTTPException, UploadFile, File
import os
from fastapi.responses import JSONResponse
from app.model.sound import use_whisper
import os
import shutil

router = APIRouter(prefix="/api/v1/audio", tags=["Audio"])

@router.get("/item/{item_id}")
async def read_audio(item_id: int):
    if item_id == 3:
        return {"item_id": item_id, "name": "Foo"}
    raise HTTPException(status_code=404, detail="Item not found")

@router.post("/upload")
async def upload_audio(audio_file: UploadFile = File(...)):
    try:
        # Create files/input directory if it doesn't exist
        os.makedirs("files/input", exist_ok=True)
        
        # Generate file path
        file_path = f"files/input/{audio_file.filename}"
        
        # Save the file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(audio_file.file, buffer)
        
        return JSONResponse(
            content={"message": "Audio file uploaded successfully", "filename": audio_file.filename},
            status_code=200
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/analysis")
async def analysis_sound(filename):
    file_path = f"files/input/{filename}"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail=f"File {filename} not found")
    model = use_whisper.FastWhisper('large-v2', 'normal', file_path)
    res = await model.generate()
    return {"message": res }
