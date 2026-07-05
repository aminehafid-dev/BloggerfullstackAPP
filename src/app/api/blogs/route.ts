import { connectDB } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const blogs = await Blog.find().populate('author', 'name email').sort({ createdAt: -1 }).limit(20);
    return NextResponse.json(blogs, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { title, content, excerpt, category, tags, author } = await req.json();

    if (!title || !content || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newBlog = new Blog({
      title,
      content,
      excerpt: excerpt || content.substring(0, 150),
      category: category || 'General',
      tags: tags || [],
      author,
    });

    await newBlog.save();

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
