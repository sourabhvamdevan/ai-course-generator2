from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

from template_service import generate_course
from database import cursor, conn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/generate")
def generate(data: dict):
    course = generate_course(
        data["topic"],
        data["level"],
        data["duration"]
    )

    cursor.execute(
        "INSERT INTO courses (title, level, content) VALUES (?, ?, ?)",
        (course["title"], course["level"], json.dumps(course))
    )
    conn.commit()

    return course


@app.get("/history")
def history():
    rows = cursor.execute(
        "SELECT id, title, level FROM courses ORDER BY id DESC"
    ).fetchall()

    return [
        {"id": r[0], "title": r[1], "level": r[2]}
        for r in rows
    ]






