import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { generateContent } from '@/lib/openai';
import { contentSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validation = contentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { title, description, contentType, industry, prompt, templateId, variables } = validation.data;

    // Generate content using AI
    const aiResponse = await generateContent({
      industry,
      contentType,
      prompt: String(prompt),
      variables: variables as Record<string, string> | undefined,
    });

    // Save content to database
    const content = await prisma.content.create({
      data: {
        title,
        description,
        contentType,
        industry,
        prompt,
        generatedContent: aiResponse.content,
        variables,
        templateId,
        userId: session.user.id,
        tenantId: session.user.tenantId,
      },
    });

    // Track usage for billing
    await prisma.contentUsage.create({
      data: {
        userId: session.user.id,
        tenantId: session.user.tenantId,
        contentType,
        tokensUsed: aiResponse.tokensUsed,
      },
    });

    return NextResponse.json({ content, tokensUsed: aiResponse.tokensUsed });
  } catch (error) {
    console.error('Content generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const contentType = searchParams.get('contentType');
    const industry = searchParams.get('industry');

    const where = {
      tenantId: session.user.tenantId,
      ...(contentType && { contentType }),
      ...(industry && { industry }),
    };

    const [contents, total] = await Promise.all([
      prisma.content.findMany({
        where,
        include: {
          template: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.content.count({ where }),
    ]);

    return NextResponse.json({
      contents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Content fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}
