import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pyautogui
import threading
import time
app = FastAPI()


origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


is_clicking = False

def auto_click():
    while is_clicking:
        pyautogui.click()
        time.sleep(0.001)

class ToggleRequest(BaseModel):
    status: bool

@app.post("/toggle_click")
async def toggle_click(request: ToggleRequest):
    global is_clicking
    if request.status:
        if not is_clicking:
            is_clicking = True
            thread = threading.Thread(target=auto_click)
            thread.start()
        return {"message": "Auto click started"}
    else:
        is_clicking = False
        return {"message": "Auto click stopped"}

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
