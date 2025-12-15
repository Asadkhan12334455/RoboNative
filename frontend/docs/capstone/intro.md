---
sidebar_position: 1
---

# Capstone: Autonomous Humanoid Robot

Integrate all previous modules to build a fully autonomous humanoid robot.

## The Mission
Your robot must start from a voice command, plan a task, navigate to a location, and manipulate an object.

![Humanoid Robot](https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000)

## Workflow Simulation
The following script simulates the full **Vision-Language-Action (VLA)** pipeline you will implement.

### VLA Pipeline Script

```python
import time
from services import whisper_stt, llm_planner, isaac_nav, moveit_control

def autonomous_routine():
    print("🤖 Robot Initialized. Listening for command...")
    
    # 1. Voice Input (OpenAI Whisper)
    audio_clip = capture_audio()
    command = whisper_stt.transcribe(audio_clip)
    print(f"🎤 Command Received: '{command}'")
    
    # 2. Cognitive Planning (LLM)
    print("🧠 Planning actions...")
    plan = llm_planner.generate_plan(command, context="kitchen_environment")
    # Output: ["navigate_to_table", "detect_apple", "grasp_apple"]
    print(f"📋 VLA Plan: {plan}")

    # 3. Execution Loop
    for action in plan:
        if action == "navigate_to_table":
            print("movement: Navigating to Kitchen Table (ROS 2 Nav2)...")
            isaac_nav.goto("table_location")
            
        elif action == "detect_apple":
            print("👁️ Perception: Scanning for objects (YOLOv8)...")
            obj_pose = isaac_nav.get_object_pose("apple")
            print(f"📍 Object found at: {obj_pose}")
            
        elif action == "grasp_apple":
            print("🦾 Manipulation: Computing Inverse Kinematics (MoveIt)...")
            moveit_control.execute_grasp(obj_pose)
            print("✅ Object Grasped successfully.")
            
    print("🎉 Mission Complete.")

if __name__ == "__main__":
    autonomous_routine()
```

## Grading Criteria
| Component | Weight | Success Metric |
|-----------|--------|----------------|
| **Voice Command** | 20% | Correct intent extraction |
| **Navigation** | 30% | Reaching target without collision |
| **Manipulation** | 30% | Stable grasp of object |
| **Integration** | 20% | Smooth latency < 2s between steps |

<Quiz 
  question="Which component bridges language planning and motor control?" 
  options={[
    "Whisper", 
    "VLA Model / LLM", 
    "Rviz", 
    "Gazebo"
  ]}
  correctAnswerIndex={1}
  explanation="Vision-Language-Action (VLA) models or LLMs act as the 'Bridge', translating high-level text commands into low-level execution steps."
/>
