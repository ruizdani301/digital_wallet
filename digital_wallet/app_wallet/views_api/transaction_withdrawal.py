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


"""
  The `PayView` class is an API view that allows users to make transactions by deducting the  transaction amount from their current balance.
"""


class TransactionView(APIView):
    #permission_classes = (permissions.IsAuthenticated,)
    #authentication_classes = (SessionAuthentication,)

    def post(self, request):

        # cambiar por  cedula la id
        id = request.data['user']
        current_balance = BalanceDetail.objects.filter(user_id=id).values('balance').first()
        current_balance = current_balance['balance']

        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):

            validatedData = serializer.validated_data

            transaction = Transaction(**validatedData)
            # transaction.amount            
            serializerResponse = TransactionSerializer(transaction)

            return Response(serializerResponse.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)