---
name: plan
description: Interactive Requirements & Design Clarification
---

# /plan - Interactive Requirements & Design Clarification

A slash command that helps transform ideas into actionable implementation prompts through structured conversation.

## Purpose

The `/plan` command engages in interactive dialogue to:
1. Clarify requirements by asking targeted questions
2. Create a high-level design based on answers
3. Generate a detailed implementation prompt saved to `tmp/task-{task-title}.md`

## Usage

```
/plan <initial idea description>
```

## Process Flow

### Phase 1: Requirements Clarification
The command will:
- Analyze the codebase to understand context
- Ask specific questions about:
    * Target components/pages
    * Integration points
    * Data flow and dependencies
    * UI/UX preferences
    * Technical constraints or preferences
    * External services or APIs

### Phase 2: Design Creation
Based on gathered requirements:
- Propose a high-level design
- Identify required changes
- Suggest implementation approach
- Confirm design with user

### Phase 3: Task Prompt Generation
Output a structured prompt to `tmp/task-{task-title}.md` containing:
- Clear problem statement
- Specified requirements
- Step-by-step implementation guide
- Technical details and constraints
- No actual implementation code

## Example Interaction

**User**: `/plan Add AI-powered video thumbnail generation`

**Assistant**: I'll help you plan the AI-powered video thumbnail generation feature. Let me ask some clarifying questions:

1. **When should thumbnails be generated?**
   - During upload process
   - After video conversion
   - On-demand via API

**User**: During the upload process, right after conversion starts

**Assistant**: 
2. **What should the thumbnail be based on?**
   - First frame of video
   - Most interesting frame (AI-selected)
   - Multiple options for user to choose

**User**: Most interesting frame using AI analysis

**Assistant**:
3. **Which AI service would you prefer?**
   - OpenAI Vision API
   - Google Cloud Video Intelligence
   - AWS Rekognition
   - Other

**User**: OpenAI Vision API, I already have credentials

**Assistant**:
4. **Storage preferences for thumbnails?**
   - Local filesystem with videos
   - Separate thumbnails directory
   - S3 bucket
   
**User**: Store with videos in the same directory

**Assistant**:
5. **Any specific API endpoint preferences?**

**User**: GET /api/videos/:videoid/thumbnail

**Assistant**: Based on your requirements, here's the design:

**Feature**: AI-Powered Video Thumbnail Generation
- Triggers during upload after conversion starts
- Uses OpenAI Vision API to select most interesting frame
- Stores thumbnail in video directory
- Accessible via GET /api/videos/:videoid/thumbnail

Creating task prompt...

*[Saves to tmp/task-video-thumbnail-ai.md]*

## Benefits

1. **Structured Approach**: Ensures all aspects are considered
2. **Clear Requirements**: No ambiguity in implementation
3. **Separation of Concerns**: Planning separate from coding
4. **Reusable Prompts**: Generated tasks can be shared or reused
5. **Context Awareness**: Leverages codebase understanding

## Implementation Notes

The slash command should:
- Use `TodoWrite` to track clarification steps
- Read relevant files to understand current architecture
- Generate descriptive, kebab-case task filenames
- Include "Tell me if you have any questions or confusion" at the end
- Never include actual implementation code
- Focus on "what" and "why", leaving "how" for implementation phase
