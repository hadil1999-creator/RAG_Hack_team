from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from app.core.config import DATABASE_URL 
from contextlib import contextmanager

#create the SQLAlchemy engine
engine = create_engine(DATABASE_URL)

#create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)

#function to provide a database session to the caller
@contextmanager
def get_db() -> Session:
    """provide a sessoion to the caller"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()