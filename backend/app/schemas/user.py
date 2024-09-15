from pydantic import BaseModel, EmailStr , Field ,validator

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    confirm_password: str = Field(...,alias="confirm-password")

    # This function checks if the password and confirm_password are the same ,validator is used to validate the data before it is passed to the endpoint 
    @validator("confirm_password")
    def passwords_match(cls,confirm_password,values):
        if "password" in values and confirm_password != values["password"]:
            raise ValueError("Passwords do not match")
        return confirm_password

class UserLogin(BaseModel):
    email: EmailStr
    password: str