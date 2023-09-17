from ..models import *
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.response import Response
from app_user.serializer import UserSerializer
from .validations import custom_validation, validate_email, validate_password
from ..serializer import CustomTokenSerializer, UserSerializer


#class UserLogin(TokenObtainPairView):
class UserLogin(APIView):  

  serializer_class = CustomTokenSerializer
  
  def post(self, request, *args, **kwargs):
    email = request.data.get('email', '')
    password = request.data.get('password', '')
    user = authenticate(email=email,password=password)
    if user:
        login_serializer = self.serializer_class(data=request.data)
        if login_serializer.is_valid():
            user_serializer = UserSerializer(user)
            return Response({
              # 'token': login_serializer.validated_data.get('access'),
              # 'refresh-token': login_serializer.validated_data.get('refresh'),
              'user': user_serializer.data,
              'message': 'Inicio de sesion exitoso'
            }, status=status.HTTP_200_OK)
        return Response({'error': 'email o password incorrectos'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'email o password incorrectos'}, status=status.HTTP_400_BAD_REQUEST)