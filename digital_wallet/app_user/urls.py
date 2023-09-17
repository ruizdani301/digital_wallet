from django.urls import path
from app_user.views_apis.register import UserRegister 
from app_user.views_apis.login import UserLogin
from app_user.views_apis.logout import UserLogout
from app_user.views_apis.data_user import Userview
from app_user.views_apis.update_paswword import UpadatePassword
#from app_user.views_apis.update_user import UpdateUser 


app_name = "user_app"

urlpatterns = [
    path('register', UserRegister.as_view(), name='register'),
    path('login', UserLogin.as_view(), name='login'),
    path('logout', UserLogout.as_view(), name='logout'),
    path('user/<int:id>', Userview.as_view(), name='user'),
    path('update-password/', UpadatePassword.as_view(), name='user')
]
