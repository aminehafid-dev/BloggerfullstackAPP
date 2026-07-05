import { connectDB } from '@/lib/mongodb';
import App from '@/lib/models/App';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const apps = await App.find().populate('developer', 'name email').sort({ downloads: -1 }).limit(50);
    return NextResponse.json(apps, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, description, category, developer, downloadUrl, version, size, requirements } = await req.json();

    if (!name || !description || !category || !developer || !downloadUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newApp = new App({
      name,
      description,
      category,
      developer,
      downloadUrl,
      version: version || '1.0.0',
      size: size || 'Unknown',
      requirements,
    });

    await newApp.save();

    return NextResponse.json(newApp, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
