from ..models import *
from app_wallet.models import BalanceDetail
from django.contrib.auth import get_user_model, login, logout, authenticate
from rest_framework.authentication import SessionAuthentication
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from app_user.serializer import UserRegisterSerializer
from .validations import custom_validation



class UserRegister(APIView):
    #permission_classes = (permissions.AllowAny,)
    # authentication_classes = (SessionAuthentication,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                id_user = User.objects.filter(
                identification_number=user.identification_number).values('id').first()['id']
              
                balance_detail = BalanceDetail(user_id = id_user,
                                          balance = 0,
                                          )
                balance_detail.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)