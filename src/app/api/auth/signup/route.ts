import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  const data = await req.json();
  const { name, email, password, organization } = data;

  if (!name || !email || !password || !organization) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'Email already in use.' }, { status: 409 });
  }

  // Hash password
  const hashedPassword = await hash(password, 10);

  // Create tenant first
  const tenant = await prisma.tenant.create({
    data: { name: organization, industry: 'OTHER' }
  });

  // Create user with tenantId
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      tenantId: tenant.id
    }
  });

  return NextResponse.json({ success: true, userId: user.id });
}
