from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import hash_password 


# This function returns the user object from the database based on the username provided in the argument
def get_user(db:Session,email:str):
    return db.query(User).filter(User.email == email).first() # this function returns the user object from the database based on the username provided in the argument 

# This function creates a new user in the database
def create_user(db:Session,email:str,password:str):
    hashed_password = hash_password(password)# this function hashes the password
    db_user = User(email=email,password=hashed_password)# this creates a new user object
    db.add(db_user) # this adds the user object to the database
    db.commit() # this commits the transaction means the user is created in the database 
    db.refresh(db_user) # this refreshes the user object and returns the user object with the id 
    return db_user # this returns the user object 