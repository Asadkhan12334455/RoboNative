---
sidebar_position: 2
title: 2. Signal Reliability
description: Publisher-Subscriber pipelines, QoS, Lifecycle nodes
---

# Signal Reliability & Control Flow

A nervous system that drops signals is dangerous. If your "stop" command is lost, the robot crashes. In ROS 2, we manage this with **Quality of Service (QoS)** policies.

## Publisher-Subscriber Pipelines

The most common form of communication is the **Pub/Sub** model. It decouples the sender and receiver.

```python
# Publisher (The Source)
self.publisher_ = self.create_publisher(String, 'motor_commands', 10)

# Subscriber (The Sink)
self.subscription = self.create_subscription(
    String,
    'motor_commands',
    self.listener_callback,
    10)
```

## Quality of Service (QoS)

Not all data is equal.
*   **Reliable**: "TCP-like". Guaranteed delivery. Essential for **high-level commands** (e.g., "Switch to walk mode").
*   **Best Effort**: "UDP-like". Fast, drop packets if needed. Essential for **sensor streams** (e.g., 60fps camera feed). If you miss frame #100, you don't want it re-sent when you're already at frame #105.

### Trade-offs
| QoS Profile | Latency | Reliability | Use Case |
| :--- | :--- | :--- | :--- |
| **Reliable** | Higher | High | State changes, one-off commands |
| **Best Effort** | Lowest | Low | High-frequency sensor data (LIDAR, Video) |

## Lifecycle Nodes: System Stability

Robots have states: `Unconfigured`, `Inactive`, `Active`, `Finalized`.
**Lifecycle Nodes** allow you to start the system in a deterministic way.
1.  **Configure**: Load parameters, setup drivers.
2.  **Activate**: Start publishing headers/data.
3.  **Deactivate**: Stop publishing, keep config.
4.  **Shutdown**: Cleanup.

This prevents the "undefined behavior" of a robot twitching on startup.
