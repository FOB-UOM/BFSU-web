import { NextResponse } from 'next/server';
import { checkNotionConnection } from '../../../../lib/notion';

export async function GET() {
    const hasKey = Boolean(process.env.NOTION_API_KEY);
    const configuredDatabases = {
        newsDb: Boolean(process.env.NOTION_NEWS_DB_ID),
        eventsDb: Boolean(process.env.NOTION_EVENTS_DB_ID),
        councilDb: Boolean(process.env.NOTION_COUNCIL_DB_ID),
        societiesDb: Boolean(process.env.NOTION_SOCIETIES_DB_ID),
        welfareDb: Boolean(process.env.NOTION_WELFARE_DB_ID),
    };

    const connection = await checkNotionConnection();

    return NextResponse.json({
        platform: 'BFSU Notion Headless CMS',
        timestamp: new Date().toISOString(),
        hasApiKey: hasKey,
        connection,
        databases: configuredDatabases,
        setupInstructions: [
            '1. Go to https://www.notion.so/profile/integrations',
            '2. Click "+ New integration", name it "BFSU Web Engine", and select your Student Org workspace.',
            '3. Copy the "Internal Integration Secret" into .env.local as NOTION_API_KEY=ntn_...',
            '4. In Notion, open each database page, click "..." > "Connections" > Add "BFSU Web Engine".',
            '5. Copy each database URL ID (the 32-char string) into .env.local as NOTION_NEWS_DB_ID, etc.'
        ]
    });
}
