from app.db import get_db_connection
import bcrypt
from fastapi import HTTPException

# Function to hash password using bcrypt
def hash_password(password):
    # Generate salt and hash the password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

# Function to register a new user (store email and hashed password)
def register_user(email, password):
    db = get_db_connection()
    cursor = db.cursor()
    try:
        # Hash the password before storing it
        hashed_password = hash_password(password)

        # Insert the user into the database
        sql = "INSERT INTO users (email, password_hash) VALUES (%s, %s)"
        values = (email, hashed_password)
        cursor.execute(sql, values)

        # Commit the transaction
        db.commit()
        print("User registered successfully!")

    except mysql.connector.Error as err:
        # Rollback in case of error
        db.rollback()
        error_message = f"Error: {err}"
        print(error_message)  # Optionally log to a file or monitoring system
        raise HTTPException(status_code=500, detail="Internal server error")

    finally:
        cursor.close()
        db.close()

def login_user(email: str, password: str):
    db = get_db_connection()
    cursor = db.cursor()
    sql = "SELECT password_hash FROM users WHERE email = %s"
    cursor.execute(sql, (email,))
    result = cursor.fetchone()
    if result and bcrypt.checkpw(password.encode('utf-8'), result[0]):
        return "mock_token"  # Replace with actual token generation
    else:
        raise ValueError("Invalid credentials")
