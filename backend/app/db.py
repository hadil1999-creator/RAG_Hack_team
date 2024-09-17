from sqlalchemy import create_engine 
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

#
DATABASE_URL = "mysql+mysqlconnector://username:password@localhost:3306/fastapi"

# Load environment variables
engine = create_engine(DATABASE_URL)
sessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)
Base = declarative_base()
