"""User routes"""

#################
# IMPORTS
#################
from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse

from google.auth.transport import requests
from google.oauth2 import id_token

from authlib.integrations.starlette_client import OAuth
from starlette.config import Config


from server.models.schemas import User, Login, EmailSchema,ContactForm, TokenData

from server.models.schemas import User, Login, EmailSchema, ContactForm
from database import db
##############

from server.auth.utility import *
from bson import json_util
import json

config = Config('.env')
oauth = OAuth(config)


#######################
#HASHING PASSWORD
#######################
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#######################
#COMPARING HASH
#######################
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


#######################
#HASHING
#######################
def get_password_hash(password):
    return pwd_context.hash(password)


user_router = APIRouter()

###########################
#API
###########################
@user_router.get("/user/{email}")
async def user(get_user : str= Depends(oauth2_scheme)):
    try:
        user = await db.user.find_one({"email": 'johnemma1234@gmail.com'}, None)
        print(user)
    except None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={'message' : 'Something went wrong. Try again'}
        )

    Response = {
        "userData": {
            'id': str(user['_id']),
            'firstname': user['first_name'],
            'lastname': user['lastname'],
            'email': user['email'],
            }
        }
    return JSONResponse(Response, status_code=status.HTTP_200_OK)

@user_router.post("/api/user", response_model = User)
async def create_user(raw_user: User):
    user = {        
        "first_name": raw_user.first_name,
        "lastname": raw_user.last_name,
        "email":raw_user.email,
        "password": raw_user.password,                     
    }
    #print(raw_user)
    
    ##########################
    #STORING HASHED PASSWORD
    ##########################
    password_hash = get_password_hash(raw_user.password)
    user["password"] = password_hash


    ############################
    #MAKING POST TO DATABASE
    ############################
    if await db.user.find_one({"email": raw_user.email} ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={'message' : 'Something went wrong. Try another email'}
        )

    # if await db.user.find_one({"username": raw_user.username} ):
    #     raise HTTPException(
    #         status_code=status.HTTP_400_BAD_REQUEST,
    #         detail={'message' : 'Username not unique'}
    #    )

    new_user = await db['user'].insert_one(user)
    create_user= await db.user.find_one({"_id": new_user.inserted_id})
    create_user["_id"] = str(create_user["_id"])

    access_token = create_access_token(user['email'])
    #refresh_token = create_refresh_token(userRes['email'])
    # print(access_token)
    Response = {
        "token" :{ "token" : access_token},
        "userData":{
            'firstname': user['first_name'],
            'lastname': user['lastname'],
            'email': user['email'],
            }
        }
    return JSONResponse(Response, status_code=status.HTTP_201_CREATED)
    





##############################
#Login Api
##############################
@user_router.post("/api/user/login", response_model = Login)
async def login(login : OAuth2PasswordRequestForm = Depends()):
    user = await db["user"].find_one({ "email": login.username }, None)
    # print(user)
    userRes = json.loads(json_util.dumps(user))

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )

    password_hash = str(user["password"])
    plain_password= login.password
    value = verify_password(plain_password, password_hash)
    #print(value)


    ####################
    #Jwt token
    ####################
    if not verify_password(plain_password, password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(userRes['email'])
    #refresh_token = create_refresh_token(userRes['email'])
    # print(access_token)
   
  
    Response = {
        "access_token" : token, "token_type": "bearer",
        "userData":{
            'Firstname': userRes['first_name'],
            'Lastname': userRes['lastname'],
            'email': userRes['email'],
            }
        }
    return JSONResponse(Response, status_code=status.HTTP_201_CREATED)



CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID') or None
CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET') or None
if CLIENT_ID is None or CLIENT_SECRET is None:
    raise BaseException('Missing env variables')


# config_data = {'GOOGLE_CLIENT_ID': CLIENT_ID, 'GOOGLE_CLIENT_SECRET': CLIENT_SECRET}
# #config = Config('.env')
# #starlette_config = Config(environ = config_data)
# #oauth = OAuth(starlette_config)
# oauth.register(
#     name='google',
#     server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
#     client_kwargs={'scope': 'openid email profile',
#     'prompt': 'select_account',  # force to select account
#     },
# )




#############################################
#Email signUp
#############################################

@user_router.get('/verifyGoogle' )
async def verify(token:list):
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        
        user = idinfo['sub']
    # user = {        
    #     "first_name": raw_user.first_name,
    #     "lastname": raw_user.last_name,
    #     "email":raw_user.email,
    #     "password": raw_user.password,                     
    # }
    # #print(raw_user)
    
    # ##########################
    # #STORING HASHED PASSWORD
    # ##########################
    # password_hash = get_password_hash(raw_user.password)
    # user["password"] = password_hash


    # ############################
    # #MAKING POST TO DATABASE
    # ############################
    # if await db.user.find_one({"email": raw_user.email} ):
    #     raise HTTPException(
    #         status_code=status.HTTP_400_BAD_REQUEST,
    #         detail={'message' : 'Something went wrong. Try another email'}
    #     )

    # # if await db.user.find_one({"username": raw_user.username} ):
    # #     raise HTTPException(
    # #         status_code=status.HTTP_400_BAD_REQUEST,
    # #         detail={'message' : 'Username not unique'}
    # #    )

    # new_user = await db['user'].insert_one(user)
    # create_user= await db.user.find_one({"_id": new_user.inserted_id})
    # create_user["_id"] = str(create_user["_id"])

    # access_token = create_access_token(user['email'])
    # #refresh_token = create_refresh_token(userRes['email'])
    # # print(access_token)
    # Response = {
    #     "token" :{ "token" : access_token},
    #     "userData":{
    #         'firstname': user['firstname'],
    #         'lastname': user['lastname'],
    #         'email': user['email'],
    #         }
    #     }


    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Could not validate credentials',
            headers={'WWW-Authenticate': 'Bearer'},
        )


@user_router.post("/contactForm")
async def send_mail(email: ContactForm):
    ##################
    #SMTP
    ##################
    return JSONResponse(status_code=200, content={"message": "Thanks for reaching out"})

@user_router.post("/newsletter")
async def send_mail(data : EmailSchema ):
    email = {        
        "username": data.email,                     
    }
    
    new_news_letter = await db['NewsLetter'].insert_one(email)
    print(new_news_letter)
    news_letter= await db.NewsLetter.find_one({"_id": new_news_letter.inserted_id})
    print(news_letter)
    news_letter["_id"] = str(news_letter["_id"])
    return JSONResponse(status_code=200, content={"message": "success"})


@user_router.post("/forgotPassword", response_model = TokenData )
async def send_mail(data: TokenData): 
    user = await db["user"].find_one({ "email": data.username }, None)
    # print(user)
    userRes = json.loads(json_util.dumps(user))

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Not Found"
        )
    return JSONResponse(status_code=200, content={"message": "An email has been sent to you"})







