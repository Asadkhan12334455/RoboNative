---
sidebar_position: 1
title: 1. Neural Communication
description: Purpose of ROS 2 in Physical AI, Nodes, Topics, Services vs Actions
---

# Neural Communication Layer

In the biological nervous system, neurons allow signals to travel from the brain to the muscles and from sensors back to the brain. In a robot, the **Robot Operating System 2 (ROS 2)** serves this exact purpose. It provides the **middleware**—the plumbing—that allows different parts of the robot's "brain" and "body" to talk to each other reliably.

## Purpose of ROS 2 in Physical AI

Physical AI isn't just about runnning a model in a notebook. It requires **asynchronous, distributed, and real-time communication**.
*   **Asynchronous**: Your vision system shouldn't freeze while waiting for the legs to move.
*   **Distributed**: Heavy compute (like LLMs) might run on a separate onboard computer (e.g., Jetson Orin) or even in the cloud, while motor control runs on microcontrollers (e.g., STM32).
*   **Real-time**: If the robot is falling, the balance controller needs to know *immediately*, not 500ms later.

## The Building Blocks

### 1. Nodes as Artificial Neurons
A **Node** is a process that performs a specific computation.
*   `camera_node`: Reads images from the camera.
*   `llm_node`: Decides what to do based on text/vision.
*   `motor_controller_node`: Sends voltage commands to actuators.

```python
import rclpy
from rclpy.node import Node

class ArtificialNeuron(Node):
    def __init__(self):
        super().__init__('vision_neuron')
        self.get_logger().info('Neuron Active: Visual Cortex Online')

def main():
    rclpy.init()
    node = ArtificialNeuron()
    rclpy.spin(node)
    rclpy.shutdown()
```

### 2. Topics as Signal Pathways
**Topics** are named buses over which nodes exchange messages. It's a Pub/Sub model.
*   **Publisher**: The eye (camera node) talks on `/images`.
*   **Subscriber**: The brain (vision node) listens to `/images`.

### 3. Services vs Actions
Not all communication is a continuous stream.
*   **Services** (Synchronous): "Reflexes". Request/Response. E.g., "Check battery level." Blocking call.
*   **Actions** (Asynchronous): "Deliberate Behavior". E.g., "Walk to the kitchen." This takes time, provides feedback (progress), and can be cancelled (abort!).

## What You Built
By understanding these primitives, you have laid the foundation for the **Robotic Nervous System**. The next step is ensuring these signals arrive *reliably*.
