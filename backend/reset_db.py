"""
Simple script to drop and recreate quotes table with correct schema
"""
import asyncio
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()

async def reset_database():
    """Drop and recreate the quotes table"""
    # Get connection string
    database_url = os.getenv("DATABASE_URL", "")
    # Convert asyncpg URL format
    database_url = database_url.replace("postgresql+asyncpg://", "postgresql://").replace("?ssl=true", "")
    
    print("🔧 Connecting to database...")
    
    # Connect to database with SSL
    conn = await asyncpg.connect(database_url, ssl='require')
    
    try:
        print("🗑️  Dropping old quotes table...")
        await conn.execute("DROP TABLE IF EXISTS quotes CASCADE;")
        print("✅ Table dropped")
        
        print("📝 Creating new quotes table with quote_id...")
        create_table_sql = """
        CREATE TABLE quotes (
            quote_id SERIAL PRIMARY KEY,
            content TEXT NOT NULL UNIQUE,
            author VARCHAR(255) NOT NULL,
            tags VARCHAR(50)[] DEFAULT '{}',
            shown BOOLEAN DEFAULT FALSE NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
            shown_at TIMESTAMP WITH TIME ZONE,
            CONSTRAINT check_content_not_empty CHECK (LENGTH(TRIM(content)) > 0),
            CONSTRAINT check_author_not_empty CHECK (LENGTH(TRIM(author)) > 0)
        );
        """
        await conn.execute(create_table_sql)
        print("✅ Table created")
        
        print("📊 Creating indexes...")
        await conn.execute("CREATE INDEX idx_quotes_shown ON quotes(shown) WHERE shown = FALSE;")
        await conn.execute("CREATE INDEX idx_quotes_author ON quotes(author);")
        await conn.execute("CREATE INDEX idx_quotes_created_at ON quotes(created_at DESC);")
        print("✅ Indexes created")
        
        print("\n✅ Database reset complete! Table 'quotes' ready with 'quote_id' column")
        
    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(reset_database())
