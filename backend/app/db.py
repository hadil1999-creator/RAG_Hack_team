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

"""
import mysql.connector
import bcrypt

# Connect to the MySQL database
db = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
)
cursor = db.cursor()

# Function to hash the password
def hash_password(password: str) -> bytes:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

# Example user details
email = "testuser@example.com"
password = "your_secure_password"

# Hash the password
hashed_password = hash_password(password)

# SQL query to insert the user
sql = "INSERT INTO users (email, password_hash) VALUES (%s, %s)"
values = (email, hashed_password)

try:
    cursor.execute(sql, values)
    db.commit()
    print("User added successfully!")
except mysql.connector.Error as err:
    print(f"Error: {err}")
    db.rollback()
finally:
    cursor.close()
    db.close()

"""