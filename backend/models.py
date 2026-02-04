from sqlalchemy import Column, Integer, String, Boolean, DateTime, ARRAY
from sqlalchemy.sql import func
from database import Base
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# SQLAlchemy Model (Database)
class Quote(Base):
    __tablename__ = "quotes"
    
    quote_id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False, unique=True)
    author = Column(String, nullable=False)
    tags = Column(ARRAY(String), default=[])
    shown = Column(Boolean, default=False)
    repeat_counter = Column(Integer, default=0, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    shown_at = Column(DateTime(timezone=True), nullable=True)

# Pydantic Models (API)
class QuoteCreate(BaseModel):
    content: str
    author: str
    tags: List[str] = []

class QuoteResponse(BaseModel):
    id: int
    content: str
    author: str
    tags: List[str] = []
    shown: bool
    
    class Config:
        from_attributes = True
        populate_by_name = True
        
    @classmethod
    def from_quote(cls, quote: Quote):
        return cls(
            id=quote.quote_id,
            content=quote.content,
            author=quote.author,
            tags=quote.tags or [],
            shown=quote.shown
        )
