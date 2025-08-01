import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = params;
    const body = await request.json();
    const { title, generatedContent } = body;
    if (!title || !generatedContent) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const content = await prisma.content.update({
      where: {
        id,
        tenantId: session.user.tenantId,
      },
      data: {
        title,
        generatedContent,
      },
    });
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = params;
    await prisma.content.delete({
      where: {
        id,
        tenantId: session.user.tenantId,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 });
  }
}
