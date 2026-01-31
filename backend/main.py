
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json, traceback

from template_service import generate_course
from database import cursor, conn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "backend alive"}

@app.post("/generate")
def generate(data: dict):
    try:
        course = generate_course(
            data["topic"],
            data["level"],
            data["duration"]
        )

        # SAFETY CHECK
        if not course or "title" not in course:
            return JSONResponse(
                status_code=500,
                content={"error": "Invalid course generated"}
            )

        cursor.execute(
            "INSERT INTO courses (title, level, content) VALUES (?, ?, ?)",
            (course["title"], course["level"], json.dumps(course))
        )
        conn.commit()

        return course

    except Exception as e:
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )






