import { NextRequest, NextResponse } from 'next/server';
import { client, dbName } from '@/lib/mongo-client';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {

    const session = await auth.api.getSession({
        headers: req.headers,
    })

    try {
        await client.connect();
        const db = client.db(dbName);
        const user = await db.collection('user').find({
            email: session?.user?.email,
        }).toArray();
        return NextResponse.json({ preferences: user[0]?.preferences || {} }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch preferences' }, { status: 500 });
    } finally {
        await client.close();
    }
}