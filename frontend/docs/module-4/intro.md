---
sidebar_position: 1
---

# Module 4: Vision-Language-Action (VLA)

The cutting edge of Embodied AI.

## From LLM to VLA
Using Large Language Models to plan robot actions.

## Pipeline
1. **Voice Input**: OpenAI Whisper.
2. **Cognitive Planning**: LLM (GPT-4 / Claude).
3. **Action Execution**: Robot actuation commands.

## Code Example
```python
import openai

def plan_action(command):
    prompt = f"Convert this command to robot actions: {command}"
    response = openai.Completion.create(prompt=prompt)
    return response.choices[0].text
```
