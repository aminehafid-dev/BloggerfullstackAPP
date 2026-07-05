import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      return NextResponse.json({ message: 'Admin already exists' }, { status: 400 });
    }

    // Create test admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new User({
      name: 'Admin User',
      email: 'admin@blogapp.com',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();

    // Create test regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const regularUser = new User({
      name: 'Test User',
      email: 'user@blogapp.com',
      password: userPassword,
      role: 'user',
    });

    await regularUser.save();

    return NextResponse.json(
      {
        message: 'Seed data created successfully',
        admin: { email: 'admin@blogapp.com', password: 'admin123' },
        user: { email: 'user@blogapp.com', password: 'user123' },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
