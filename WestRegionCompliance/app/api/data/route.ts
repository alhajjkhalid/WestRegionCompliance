import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parseCSVData } from '@/lib/parseCSV';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Read CSV from dashboard directory
    const csvPath = path.join(process.cwd(), 'SW Report for AI.csv');

    if (!fs.existsSync(csvPath)) {
      return NextResponse.json(
        { error: 'CSV file not found', path: csvPath },
        { status: 404 }
      );
    }

    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const data = parseCSVData(csvContent);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading CSV:', error);
    return NextResponse.json(
      { error: 'Failed to read CSV file', details: String(error) },
      { status: 500 }
    );
  }
}
