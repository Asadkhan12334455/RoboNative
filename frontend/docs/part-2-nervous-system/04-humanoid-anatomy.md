---
sidebar_position: 4
title: 4. Humanoid Structural Anatomy
description: Links, joints, coordinate frames, Kinematic chains
---

# Humanoid Structural Anatomy

To control a humanoid, you must understand its geometry. We describe this using **URDF (Unified Robot Description Format)**.

## Links and Joints

*   **Link**: A rigid body (e.g., forearm, shin). Has mass and inertia.
*   **Joint**: Connects two links. Defines motion (revolute, prismatic, fixed).

In a humanoid:
*   **Root**: Usually the pelvis (Base Link).
*   **Kinematic Chains**:
    *   Torso -> Head
    *   Torso -> Left Arm -> Left Hand
    *   Torso -> Right Leg -> Right Foot

## Coordinate Frames (TF2)

The most confusing part of robotics is answering "Where is the hand relative to the cup?".
*   The cup is in the `camera_frame`.
*   The hand is in the `body_frame`.
*   The robot is in the `map_frame`.

**TF2** is the library that handles these transforms over time. It lets you ask: "Transform this point from `camera_optical_frame` to `right_gripper_link`".

## Visual vs Collision Models

*   **Visual**: High-poly meshes (looks good to humans).
*   **Collision**: Simple shapes (boxes, cylinders, spheres). Fast for physics engines to calculate contacts.

**Tip**: Never use high-poly meshes for collision checking. Your simulation will crawl.
