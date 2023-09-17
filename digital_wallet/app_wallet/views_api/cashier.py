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


class CorresponsalWithdrawal(APIView):

    def post(self, request):
        """
        JSON de entrada:
        {
            "identification_number": "123456789",
            "code_validation": "20000"
        }
        """
        serializer = withdrawalBalanceDetailSerializer(data=request.data)
        
        if serializer.is_valid():
            identification_number = request.data['identification_number']
            id_user = User.objects.filter(identification_number=identification_number).values('id').first()
            
            if id_user:
                balanceDetail = BalanceDetail.objects.filter(user_id=id_user["id"]).first()
                withdrawal_m = withdrawal.objects.get(identification_number=identification_number)

                if balanceDetail.balance >= withdrawal_m.value:
                    balanceDetail.balance = (balanceDetail.balance - withdrawal_m.value)
                    balanceDetail.save()
                    withdrawal_m.delete()
                    success = self.register_trasaction(id_user["id"], identification_number, withdrawal_m.value)

                    return Response({"mensaje": "retiro exitoso", "id":id_user["id"],"amount":withdrawal_m.value}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"mensaje": "Saldo insuficiente"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"mensaje": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"mensaje": "Error de validación"}, status=status.HTTP_400_BAD_REQUEST)

    def register_trasaction(self, id_user, identification, reload):
        """
            * id_user : user id 
            * identification: identification number
            * reload: amount of money to be recharged
            method creates an instance of trasaction in the database after
            a  reload is performed
        """
        user = User.objects.get(id=id_user)

        new_trasaction = Transaction(
            user = user,
            reference = identification,
            reference_name = 'sucursal',
            amount = reload,
            details = "Retiro",
            transaction_type="Retiro"
            )
        print(new_trasaction)
        new_trasaction.save()
        return Response(status=status.HTTP_201_CREATED)