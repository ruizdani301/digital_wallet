from decimal import Decimal
from ..serializer.serializer import *
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework import status, permissions
from ..models import BalanceDetail
from app_user.models import *
import random


class UserWithdrawal(APIView):
    #permission_classes = (permissions.AllowAny,)
    #authentication_classes = (SessionAuthentication,)
    def post(self, request):
        """
        JSON de entrada:
        {
            "identification_number": "123456789",
            "value": 20000
        }
        """
        code = random.randint(100000, 999999)
        request_data = request.data
        request_data["code_validation"] = str(code)
        identification_number = request_data["identification_number"]
        try:
                id_user = User.objects.filter(
                identification_number=identification_number).values('id').first()['id']
        except:
            return Response({'mensaje': 'usuario no existe'}, status=status.HTTP_404_NOT_FOUND)
        
        new_balance = BalanceDetail.objects.filter(
                    user_id=id_user).values('balance').first()
        if new_balance['balance'] < request_data['value']:
          return Response({'mensaje': 'saldo insuficiente', 'saldo actual':new_balance['balance']}, status=status.HTTP_406_NOT_ACCEPTABLE)
          
        try:
            withdrawal_m = withdrawal.objects.get(identification_number=identification_number)
            
            withdrawal_m.code_validation = request_data["code_validation"]
            withdrawal_m.value = request_data["value"]
            withdrawal_m.save()

            return Response({"code_validation": withdrawal_m.code_validation}, status=status.HTTP_200_OK)

        except withdrawal.DoesNotExist:

            serializer = withdrawalSerializer(data=request_data)
            if serializer.is_valid(raise_exception=True):

                withdrawal_m = withdrawal(**request_data)
                withdrawal_m.save()
                print(withdrawal_m)

                return Response({"mensaje": withdrawal_m.code_validation}, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
