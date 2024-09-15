from passlib.context import CryptContext # this is the password hashing library

pwd_context = CryptContext(schemes = ["bcrypt"], deprecated = "auto")   # this is the password hashing algorithm

def verify_password(plain_password,hashed_password):
    return pwd_context.verify(plain_password,hashed_password) # this function verifies the password and returns a boolean value

def hash_password(password):
    return pwd_context.hash(password) # this function hashes the password and returns the hashed password
