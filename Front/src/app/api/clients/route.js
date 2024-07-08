import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = (page - 1) * limit;

    const jsonDirectory = path.join(process.cwd(), 'src', 'data');
    const fileContents = await fs.readFile(path.join(jsonDirectory, 'clients.json'), 'utf8');
    const clients = JSON.parse(fileContents);

    const paginatedClients = clients.slice(offset, offset + limit);
    const totalItems = clients.length;
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = page;

    return NextResponse.json({
      totalItems,
      totalPages,
      currentPage,
      clients: paginatedClients,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}
