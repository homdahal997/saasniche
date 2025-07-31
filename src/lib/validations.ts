import { z } from 'zod';
import { Industry, ContentType, UserRole } from '@/types';

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  tenantName: z.string().min(2, 'Company name must be at least 2 characters'),
  industry: z.nativeEnum(Industry),
  domain: z.string().optional(),
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const contentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  contentType: z.nativeEnum(ContentType),
  industry: z.nativeEnum(Industry),
  prompt: z.string().min(10, 'Prompt must be at least 10 characters'),
  templateId: z.string().optional(),
  variables: z.record(z.string()).optional(),
});

export const templateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  description: z.string().optional(),
  industry: z.nativeEnum(Industry),
  contentType: z.nativeEnum(ContentType),
  prompt: z.string().min(10, 'Prompt must be at least 10 characters'),
  variables: z.array(z.string()),
  isPublic: z.boolean().default(false),
});

export const tenantSettingsSchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  industry: z.nativeEnum(Industry),
  domain: z.string().optional(),
});

export const userProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.nativeEnum(UserRole),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type ContentFormData = z.infer<typeof contentSchema>;
export type TemplateFormData = z.infer<typeof templateSchema>;
export type TenantSettingsFormData = z.infer<typeof tenantSettingsSchema>;
export type UserProfileFormData = z.infer<typeof userProfileSchema>;
