



def generate_course(topic: str, level: str, duration: str) -> dict:
    # Normalize inputs
    topic = topic.strip().title()
    level = level.strip().title()
    duration_weeks = extract_weeks(duration)

    modules_count = max(3, min(8, duration_weeks))

    lesson_templates = {
        "Beginner": [
            "Introduction to {topic}",
            "Basic Concepts of {topic}",
            "Real-world Applications of {topic}",
            "Common Terminologies in {topic}",
            "Getting Started with {topic}"
        ],
        "Intermediate": [
            "Core Principles of {topic}",
            "System Design in {topic}",
            "Tools and Frameworks",
            "Performance and Optimization",
            "Case Studies"
        ],
        "Advanced": [
            "Advanced Architectures",
            "Scalability and Reliability",
            "Security Considerations",
            "Industry-level Case Studies",
            "Future Trends in {topic}"
        ]
    }

    modules = []

    for i in range(modules_count):
        lessons = [
            l.format(topic=topic)
            for l in lesson_templates.get(level, lesson_templates["Beginner"])
        ]

        modules.append({
            "module": i + 1,
            "title": f"{topic} – Module {i + 1}",
            "lessons": lessons[:3 + (i % 2)]
        })

    return {
        "title": topic,
        "level": level,
        "modules": modules
    }


def extract_weeks(duration: str) -> int:
    try:
        return int(duration.split()[0])
    except:
        return 4


