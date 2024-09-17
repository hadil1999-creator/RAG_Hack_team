import os

#load environment variables 
DATABASE_URL = os.getenv("DATABASE_URL","mysql+pymysql://username:password@localhost/db_name")