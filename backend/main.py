from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, func
from contextlib import asynccontextmanager
from datetime import datetime
from models import Quote, QuoteResponse
from database import get_db, init_db
import os
from dotenv import load_dotenv

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Initializing database...")
    await init_db()
    print("✅ Database initialized successfully")
    yield
    # Shutdown
    print("❌ Shutting down...")

app = FastAPI(
    title="Quote of the Day API",
    description="API for fetching and managing daily quotes",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001", 
        "https://qotd-xi.vercel.app",
        "https://quote-time.vercel.app",
        "https://quote-time.vercel.app/",
        "https://qotd-git-main-bishalabps52s-projects.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Quote of the Day API", "status": "running", "database": "PostgreSQL"}

@app.get("/api/quote-of-the-day", response_model=QuoteResponse)
async def get_quote_of_the_day(db: AsyncSession = Depends(get_db)):
    """
    Get a random quote using repeat_counter system.
    Shows quotes with lowest repeat_counter first.
    When all quotes reach same count, increments all counters.
    """
    # Find the minimum repeat_counter value
    min_counter_result = await db.execute(
        select(func.min(Quote.repeat_counter))
    )
    min_counter = min_counter_result.scalar()
    
    if min_counter is None:
        raise HTTPException(status_code=404, detail="No quotes available")
    
    # Get a random quote with the minimum repeat_counter
    result = await db.execute(
        select(Quote)
        .where(Quote.repeat_counter == min_counter)
        .order_by(func.random())
        .limit(1)
    )
    quote = result.scalar_one_or_none()
    
    if not quote:
        raise HTTPException(status_code=404, detail="No quotes available")
    
    # Increment this quote's counter
    quote.repeat_counter += 1
    quote.shown = True
    quote.shown_at = datetime.utcnow()
    await db.commit()
    await db.refresh(quote)
    
    return QuoteResponse.from_quote(quote)

@app.get("/api/stats")
async def get_stats(db: AsyncSession = Depends(get_db)):
    """
    Get statistics about quotes in the database
    """
    # Total quotes
    total_result = await db.execute(select(func.count(Quote.quote_id)))
    total_quotes = total_result.scalar()
    
    # Shown quotes
    shown_result = await db.execute(
        select(func.count(Quote.quote_id)).where(Quote.shown == True)
    )
    shown_quotes = shown_result.scalar()
    
    # Not shown quotes
    not_shown_quotes = total_quotes - shown_quotes
    
    return {
        "total_quotes": total_quotes,
        "shown_quotes": shown_quotes,
        "not_shown_quotes": not_shown_quotes
    }

@app.post("/api/reset-quotes")
async def reset_quotes(db: AsyncSession = Depends(get_db)):
    """
    Reset all quotes to not shown
    """
    result = await db.execute(
        update(Quote).values(shown=False, shown_at=None)
    )
    await db.commit()
    
    return {"message": f"Reset all quotes to not shown"}
