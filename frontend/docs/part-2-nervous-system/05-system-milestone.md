---
sidebar_position: 5
title: 5. System Build Milestone
description: Construct a working nervous system
---

# System Build Milestone: The Nervous System

**Goal**: Construct the foundation of your robot's software architecture.

## What You Are Building
A distributed system where:
1.  A **Brain Node** publishes a heartbeat signal.
2.  A **Controller Node** listens for the signal.
3.  If the signal stops (brain death), the Controller triggers an **Emergency Stop**.

## Code Implementation

### 1. The Heartbeat (Brain)
```bash
ros2 run my_robot_nervous_system brain_node
```
*Publishes to `/heartbeat` every 100ms.*

### 2. The Reflex (Spinal Cord)
```bash
ros2 run my_robot_nervous_system reflex_node
```
*Subscribes to `/heartbeat`. If no message for >500ms, publishes velocity=0 to `/cmd_vel`.*

## Verification
1.  Start both nodes. Robot is "Active".
2.  Kill the `brain_node` (Ctrl+C).
3.  Observe the `reflex_node` output:
    `[WARN] Heartbeat lost! Emergency Stop Triggered!`

> **Congratulations!** You have built a failsafe robotic nervous system. This is the first requirement for any physical AI deployment.
