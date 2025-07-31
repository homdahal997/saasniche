# Copilot Instructions for Multi-Tenant SaaS Application

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a multi-tenant SaaS application built with Next.js that generates AI-powered content tailored for niche markets. The application allows users from different organizations (tenants) to create customized marketing copy, legal templates, or technical documentation based on their industry.

## Architecture Guidelines
- **Multi-tenancy**: Use tenant-based isolation with proper data segregation
- **Authentication**: Implement secure user authentication with tenant-aware sessions
- **AI Integration**: Use OpenAI GPT-4 API for content generation with customizable prompts
- **Database**: Use Prisma ORM with PostgreSQL for data management
- **UI/UX**: Use Tailwind CSS for responsive design with clean, modern interfaces
- **API Design**: Follow RESTful principles with proper error handling and validation

## Key Features to Implement
1. Tenant-based user authentication and access control
2. Industry-specific content generation dashboard
3. AI-powered content templates with customizable prompts
4. Content management system for saved templates
5. Billing and subscription management foundation
6. Responsive frontend with modern UI components

## Code Standards
- Use TypeScript for type safety
- Follow Next.js 14+ App Router conventions
- Implement proper error boundaries and loading states
- Use server actions for form handling
- Maintain proper component modularity and reusability
- Include comprehensive error handling and validation
- Use environment variables for sensitive configuration

## File Organization
- `src/app/`: Next.js App Router pages and API routes
- `src/components/`: Reusable UI components
- `src/lib/`: Utility functions, database, and external service integrations
- `src/types/`: TypeScript type definitions
- `src/middleware.ts`: Authentication and tenant resolution middleware
