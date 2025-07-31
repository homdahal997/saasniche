import OpenAI from 'openai';
import { AIResponse, Industry, ContentType } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface GenerateContentParams {
  industry: Industry;
  contentType: ContentType;
  prompt: string;
  variables?: Record<string, string>;
}

export async function generateContent(params: GenerateContentParams): Promise<AIResponse> {
  try {
    // Replace variables in the prompt
    let processedPrompt = params.prompt;
    if (params.variables) {
      Object.entries(params.variables).forEach(([key, value]) => {
        processedPrompt = processedPrompt.replace(new RegExp(`{{${key}}}`, 'g'), value);
      });
    }

    // Create industry and content type specific system message
    const systemMessage = getSystemMessage(params.industry, params.contentType);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        {
          role: "user",
          content: processedPrompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || '';
    const tokensUsed = completion.usage?.total_tokens || 0;

    return {
      content,
      tokensUsed
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate content');
  }
}

function getSystemMessage(industry: Industry, contentType: ContentType): string {
  const industryContext = getIndustryContext(industry);
  const contentTypeContext = getContentTypeContext(contentType);

  return `You are an expert ${contentTypeContext} writer specializing in the ${industryContext} industry. 
  
  Your task is to create high-quality, professional content that:
  - Is tailored specifically for the ${industryContext} industry
  - Follows best practices for ${contentTypeContext}
  - Is engaging, clear, and actionable
  - Uses appropriate tone and language for the target audience
  - Incorporates industry-specific terminology and insights
  
  Always ensure the content is original, well-structured, and meets professional standards.`;
}

function getIndustryContext(industry: Industry): string {
  const contexts: Record<Industry, string> = {
    MARKETING: 'marketing and advertising',
    LEGAL: 'legal services and law',
    HEALTHCARE: 'healthcare and medical services',
    FINANCE: 'financial services and fintech',
    TECHNOLOGY: 'technology and software',
    ECOMMERCE: 'e-commerce and retail',
    EDUCATION: 'education and training',
    REAL_ESTATE: 'real estate and property',
    CONSULTING: 'consulting and professional services',
    HOSPITALITY: 'hospitality and tourism',
    MANUFACTURING: 'manufacturing and industrial',
    NON_PROFIT: 'non-profit and social impact',
    OTHER: 'general business'
  };
  return contexts[industry];
}

function getContentTypeContext(contentType: ContentType): string {
  const contexts: Record<ContentType, string> = {
    MARKETING_COPY: 'marketing copy',
    EMAIL_TEMPLATE: 'email marketing',
    BLOG_POST: 'blog and content marketing',
    SOCIAL_MEDIA: 'social media content',
    LEGAL_DOCUMENT: 'legal document',
    CONTRACT_TEMPLATE: 'contract and agreement',
    PRIVACY_POLICY: 'privacy policy',
    TERMS_OF_SERVICE: 'terms of service',
    TECHNICAL_DOCUMENTATION: 'technical documentation',
    API_DOCUMENTATION: 'API documentation',
    USER_MANUAL: 'user guide and manual',
    PRESS_RELEASE: 'press release',
    PRODUCT_DESCRIPTION: 'product description',
    JOB_DESCRIPTION: 'job posting',
    OTHER: 'business content'
  };
  return contexts[contentType];
}
