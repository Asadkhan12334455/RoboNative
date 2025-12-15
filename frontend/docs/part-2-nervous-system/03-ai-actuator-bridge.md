---
sidebar_position: 3
title: 3. AI-to-Actuator Bridge
description: Connecting Python AI agents to ROS 2, rclpy deep dive
---

# AI-to-Actuator Bridge

This is where the "Digital Brain" meets the "Physical Body". Modern AI agents (LLMs, VLA models) are typically written in Python (PyTorch/JAX). The robot's control loop often runs in C++ or highly optimized Python. We bridge them using `rclpy`.

## Connecting AI Agents

Your AI agent is just another ROS 2 Node.

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class BrainNode(Node):
    def __init__(self):
        super().__init__('digital_brain')
        self.publisher = self.create_publisher(String, 'high_level_intent', 10)
    
    def decide(self, observation):
        # ... Run LLM Inference ...
        return "walk_forward"

    def run_loop(self):
        # Run inference at 10Hz
        decision = self.decide(get_observation())
        self.publisher.publish(String(data=decision))
```

## Safety Gates

An LLM can hallucinate. You **never** connect an LLM directly to motor torques.
We use a **Safety Gate** node in between.

`LLM (Intent) -> [Safety Gate] -> Controller (Torque)`

The Safety Gate checks:
1.  **Validity**: Is the command structured correctly?
2.  **Feasibility**: Is the target pose inside the joint limits?
3.  **Safety**: Is the velocity safe for the current environment?

If the check fails, the Safety Gate converts the unsafe command into a "Safe Stop" or clamps the values.
