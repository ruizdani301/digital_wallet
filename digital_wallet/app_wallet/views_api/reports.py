from decimal import Decimal
from ..serializer.serializer import *
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import  Transaction
from app_user.models import *



class ReportTransaction(APIView):
  
  def get(self, request, id):
      """
      The function retrieves a list of transactions for a specific user and returns the serialized data.
      :param id:  is the user ID. It is used to filter the transactions based on the user ID
      :return: The code is returning a response with the serialized data of the transactions that belong  to the user with the given id. If there are no transactions found for the user, it returns a response with a message indicating that the user does not exist.
      """

      transaction = Transaction.objects.filter(user=id)
      if not transaction:
          return Response({'mensaje':'Usuario no existe'}, status=status.HTTP_404_NOT_FOUND)
      serializer =  TransactionReportSerializer(transaction, many=True)
      return Response(serializer.data)
