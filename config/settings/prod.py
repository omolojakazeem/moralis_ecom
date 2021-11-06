import os

from .base import *

my_debug = os.getenv('DEBUG')
if my_debug == "False":
    DEBUG = False
else:
    DEBUG = True

ALLOWED_HOSTS = ['moralis-ecom.herokuapp.com', ]

DATABASE_URL = os.getenv('DATABASE_URL')

SECRET_KEY = os.getenv('SECRET_KEY')
