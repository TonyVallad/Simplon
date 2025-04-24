**<h1 align="center">Cursor with Claude Sonnet</h1>**

## Overview

Cursor powered by Claude Sonnet is an AI-enhanced integrated development environment (IDE) that combines the coding capabilities of a traditional editor with the power of Claude Sonnet, a state-of-the-art large language model (LLM). This document outlines Claude Sonnet's capabilities in Cursor and provides guidance on crafting optimal prompts to maximize its effectiveness in building complete projects.

## Core Capabilities

### 1. Code Generation and Modification

Claude Sonnet in Cursor can:

- Generate code in numerous programming languages (Python, JavaScript, TypeScript, Java, C#, C++, Go, Rust, etc.)
- Create entire files from scratch based on specifications
- Edit existing code with precise modifications
- Complete partial code implementations
- Refactor code for improved readability, performance, or maintainability
- Generate unit tests and documentation

### 2. Project Understanding

Claude Sonnet excels at:

- Analyzing existing codebases through file exploration
- Understanding project structure, dependencies, and workflows
- Identifying patterns and conventions in code
- Following established coding standards within a project
- Reading configuration files and understanding their implications

### 3. Tool Usage

Claude Sonnet can leverage several tools in Cursor:

- **File Operations**: Read, create, edit, and delete files
- **Search Capabilities**: Codebase search, file search, directory listing, and grep search
- **Terminal Commands**: Execute shell commands (with user approval)
- **Web Search**: Access up-to-date information (when available)

### 4. Language and Framework Expertise

Claude Sonnet has knowledge of:

- Modern programming languages and their idioms
- Popular frameworks and libraries
- Best practices for different types of applications
- Common design patterns and architectural approaches
- Development workflows and toolchains

## Crafting Optimal Prompts

To maximize Claude Sonnet's effectiveness in Cursor, consider the following prompt structure and strategies:

### 1. Project Initialization Prompts

For starting new projects, include:

```
Create a [type of application] using [framework/language] with the following features:
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

The project should follow [architectural pattern] and use [specific libraries/tools].
Start by creating the project structure and core files.
```

**Example:**
```
Create a web application for task management using React and Node.js with the following features:
1. User authentication (signup, login, password reset)
2. Task creation, editing, and deletion
3. Task categorization and filtering
4. Task deadline notifications

The project should follow a clean architecture pattern and use MongoDB for data storage, Express for the backend API, and Material UI for the frontend.
Start by creating the project structure and core files.
```

### 2. Step-by-Step Development Guidance

Claude Sonnet works best with incremental prompts:

```
Now that we have [previous component], let's implement [next component]. This should:
- [Functionality 1]
- [Functionality 2] 
- [Functionality 3]

Please consider [specific constraints or requirements].
```

### 3. Debugging and Problem Solving

When facing issues:

```
I'm encountering [specific error or issue] in [file/component]. The error message is:
[error message]

Here's what I've tried:
1. [Approach 1]
2. [Approach 2]

Please help identify the root cause and suggest a solution.
```

### 4. Code Refinement

For improving existing code:

```
Please review the [file/component] and suggest improvements for:
- Performance optimization
- Error handling
- Code organization
- Security considerations
```

### 5. Contextual Information

Always provide relevant context:

```
This project uses:
- [Framework/Library 1] version [X.Y.Z]
- [Framework/Library 2] version [X.Y.Z]
- [Database] for data persistence
- [Authentication method] for user authentication

The project structure follows [specific pattern or convention].
```

## Best Practices for Working with Claude Sonnet in Cursor

### 1. Be Specific and Detailed

- Provide clear requirements with specific functionality descriptions
- Mention programming languages, frameworks, and libraries by name and version
- Specify code style preferences and patterns to follow
- Reference existing files or components when relevant

### 2. Iterative Development

- Break down complex tasks into smaller, manageable steps
- Provide feedback on generated code before proceeding to the next step
- Refine requirements based on intermediate results
- Ask for explanations if you don't understand the approach

### 3. Use Appropriate Tools

- Encourage Claude to use codebase search for finding relevant code patterns
- Request file listings to explore directory structures
- Allow terminal commands for environment setup and testing
- Use web search for up-to-date information on libraries and solutions

### 4. Project Architecture Guidance

- Specify architecture upfront (MVC, MVVM, Clean Architecture, etc.)
- Define component responsibilities clearly
- Establish naming conventions and code organization principles
- Outline data flow and state management approaches

### 5. Error Handling and Edge Cases

- Request explicit error handling in critical code paths
- Ask for validation of user inputs and external data
- Specify how to handle network failures, timeouts, and other exceptions
- Prompt for security considerations like input sanitization and authentication

## Advanced Features and Limitations

### Advanced Capabilities

Claude Sonnet in Cursor can:

- Generate complex algorithms with detailed explanations
- Implement design patterns appropriate for specific use cases
- Create responsive and accessible user interfaces
- Develop RESTful APIs and GraphQL endpoints
- Set up authentication flows and authorization logic
- Configure databases and data models
- Implement state management solutions
- Create build and deployment configurations

### Current Limitations

Be aware of these constraints:

- Cannot directly run code or access running processes' output
- May need guidance on very recent framework updates or libraries
- Cannot access or modify files outside the current workspace
- Requires explicit information about external APIs or services
- May need additional context for complex, domain-specific logic
- Cannot directly interact with databases or external services

## Example Full Project Prompt

Here's an example of a comprehensive prompt for a complete project:

```
I need to build a full-stack e-commerce application with the following technologies:
- React with TypeScript for the frontend
- Node.js with Express for the backend API
- MongoDB for the database
- Authentication using JWT
- Stripe for payment processing

Key features:
1. User registration and authentication
2. Product browsing with filtering and search
3. Shopping cart management
4. Checkout process with Stripe integration
5. Order history and tracking
6. Admin dashboard for product and order management

Please approach this step by step:
1. First, create the project structure for both frontend and backend
2. Set up the essential configuration files
3. Implement the database models
4. Create the API endpoints
5. Develop the frontend components
6. Integrate authentication
7. Implement the shopping cart functionality
8. Add the checkout process with Stripe
9. Create the admin dashboard
10. Add final touches and optimization

For each step, explain your approach and any important design decisions.
```

## Conclusion

Claude Sonnet in Cursor is a powerful AI assistant capable of helping developers build complete projects from scratch. By providing clear, detailed prompts with sufficient context and following an iterative development approach, you can effectively collaborate with Claude to create sophisticated applications efficiently.

The key to success is understanding Claude's capabilities, providing appropriate context, breaking down complex tasks, and maintaining a conversational approach to development where each step builds on the previous work. 