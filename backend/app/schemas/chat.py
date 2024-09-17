# from pydantic import BaseModel
# from datetime import datetime

# # this class is used to create a new chat

# class ChatBase(BaseModel):
#     title: str
#     lastMessage: str

# class ChatCreate(ChatBase):
#     pass

# class ChatResponse(ChatBase):
#     id: str
#     timestamp: datetime

#     class Config:
#         orm_mode = True