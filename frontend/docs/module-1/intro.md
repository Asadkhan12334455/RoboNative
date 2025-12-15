---
sidebar_position: 1
---

# Module 1: Robotic Nervous System (ROS 2)

<LangContent lang="en">
Welcome to the Robotic Nervous System. This module covers the fundamentals of ROS 2, the middleware that powers modern robots.
</LangContent>

<LangContent lang="ur">
Robotic Nervous System (ROS 2) mein khush amdeed. Yeh module ROS 2 ke bunyadi usoolon ka ihata karta hai, jo ke jadeed robots ko chalane wala middleware hai.
</LangContent>

## Learning Outcomes
- Understand Nodes, Topics, and Services.
- Create a URDF model.
- Integrate with `rclpy`.

## Personalization
<RoleBasedContent role="software">
:::info For Software Engineers
ROS 2 uses a **Publisher/Subscriber** model similar to Kafka or RabbitMQ.
Nodes are essentially microservices that communicate over a DDS middleware.
:::
</RoleBasedContent>

<RoleBasedContent role="hardware">
:::tip For Hardware Engineers
Think of Topics as **signal wires** connecting distinct hardware modules (Nodes).
Messages are the voltage signals or data packets flowing through them.
:::
</RoleBasedContent>

## Core Concepts

### Nodes
A node is a process that performs computation.

### Quiz: ROS Fundamentals
<Quiz 
  question="What is the primary role of a Node in ROS 2?" 
  options={[
    "To physcially connect cables", 
    "To perform computation and processing", 
    "To store database records", 
    "To render 3D graphics"
  ]}
  correctAnswerIndex={1}
  explanation="Nodes are the executable processes that perform computation, such as reading sensors or controlling motors."
/>

### Topics
Nodes communicate over topics.

![ROS2 Graph](https://docs.ros.org/en/humble/_images/Nodes-TopicandService.gif)

## Assessment
Build a simple Talker/Listener system in Python.
