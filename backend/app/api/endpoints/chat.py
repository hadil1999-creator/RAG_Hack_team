from fastapi import APIRouter,Depends,HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import uuid
from ...db import get_db
from ...models import Chat
from ...schemas.chat import ChatCreate,ChatResponse

router = APIRouter()

#
# pydantic model for chat message
class chat(BaseModel):
    id:str
    title:str
    lastMessage:str
    timestamp:datetime

#database connection


# Get all chats
@router.post("/chat",reponse_model=ChatResponse)
def create_chat(chat:ChatCreate,db:Session=Depends(get_db)):#db:Session=Depends(get_db) is used to get the database connection
    db_chat = Chat(title=chat.title,lastMessage=chat.lastMessage)#create a new chat object
    db.add(db_chat)#add the chat object to the database
    db.commit()#commit the transaction
    db.refresh(db_chat)#refresh the chat object
    return db_chat

# this endpoint is used to 
@router.get("/chats",response_model=List[ChatResponse])
def read_chats(skip:int=0,limit:int=100,db:Session=Depends(get_db)):#  skip:int=0,limit:int=100 is used to get the number of chats to be skipped and the number of chats to be displayed    
    chats = db.query(Chat).offset(skip).limit(limit).all()
    return chats

# this endpoint is used to get a chat with a given chat_id  
@router.get("/chat/{chat_id}",response_model=ChatResponse) 
def get_chat(chat_id:int,db:Session=Depends(get_db)):
    chat = db.query(Chat).filter(Chat.id == chat_id).first() #return None if chat_id not found,next keyword is used here to get the first chat with the given chat_id

    #if chat is None, raise an exception
    if chat is None:
        raise HTTPException(status_code=404,detail="Chat not found") #raise keyword is used to raise an exception
    return chat

@router.put("/chat/{chat_id}",response_model=ChatResponse)
def update_chat(chat_id:int,chat:chatCreate,db:session = Depends(get_db)):
    db_chat = db.query(Chat).filter(Chat.id ==chat_id).first()
    if db_chat is None:
        raise HTTPException(status_code=404,detail="Chat not found")
    for var ,value in vars(Chat).items():
        setattr(db_chat,var,value)
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    return db_chat

@router.delete("/chat/{chat_id}",response_model=ChatResponse )
def delete_chat(chat_id:int,db:Session = Depends(get_db)):
    db_chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if db_chat is None:
        raise HTTPException(status_code=404,detail="Chat not found")
    db.delete(db_chat)                  
    db.commit()
    return db_chat
