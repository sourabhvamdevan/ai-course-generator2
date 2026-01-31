import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_course(topic: str, level: str, duration: str) -> str:
    prompt = f"""
Generate a course in STRICT JSON format.

Topic: {topic}
Level: {level}
Duration: {duration}

Return ONLY valid JSON.
No markdown.
No explanations.

JSON schema:
{{
  "title": string,
  "level": string,
  "modules": [
    {{
      "module": number,
      "title": string,
      "lessons": string[]
    }}
  ]
}}
"""

    response = client.chat.completions.create(
        model="llama3-8b-instant",
        messages=[
            {"role": "system", "content": "You are a precise JSON generator."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    return response.choices[0].message.content







