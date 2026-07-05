import { connectDB } from '@/lib/mongodb';
import App from '@/lib/models/App';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const app = await App.findById(params.id).populate('developer', 'name email');
    
    if (!app) {
      return NextResponse.json({ error: 'App not found' }, { status: 404 });
    }

    return NextResponse.json(app, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const { name, description, category, version, rating } = await req.json();

    const updatedApp = await App.findByIdAndUpdate(
      params.id,
      { name, description, category, version, rating },
      { new: true }
    );

    return NextResponse.json(updatedApp, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await App.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'App deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
