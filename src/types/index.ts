import { User, Tenant, Content, Template, Industry, ContentType, SubscriptionPlan, UserRole } from "@prisma/client";

export type UserWithTenant = User & {
  tenant: Tenant;
};

export type ContentWithTemplate = Content & {
  template?: Template | null;
  user: User;
};

export type TenantWithUsers = Tenant & {
  users: User[];
};

export type TemplateWithContent = Template & {
  contents: Content[];
};

export interface ContentGenerationRequest {
  templateId?: string;
  industry: Industry;
  contentType: ContentType;
  prompt: string;
  variables?: Record<string, string>;
  title: string;
  description?: string;
}

export interface AIResponse {
  content: string;
  tokensUsed: number;
}

export interface DashboardStats {
  totalContents: number;
  thisMonthContents: number;
  tokensUsed: number;
  favoriteContents: number;
}

export interface TenantSettings {
  name: string;
  industry: Industry;
  domain?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId: string;
}

// Form types
export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  tenantName: string;
  industry: Industry;
  domain?: string;
}

export interface ContentFormData {
  title: string;
  description?: string;
  contentType: ContentType;
  industry: Industry;
  prompt: string;
  templateId?: string;
  variables?: Record<string, string>;
}

export interface TemplateFormData {
  name: string;
  description?: string;
  industry: Industry;
  contentType: ContentType;
  prompt: string;
  variables: string[];
  isPublic: boolean;
}

export { Industry, ContentType, SubscriptionPlan, UserRole };
