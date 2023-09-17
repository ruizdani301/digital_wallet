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
from ..models import BalanceDetail, Transaction
from app_user.models import *
import random


class ReloadMoneyView(APIView):
    """
        Class where the method needs a id to return or update any information
        ejemplo de json
        {
            "identification": "123456789",
            "reload": 100
        }

    """

    #permission_classes = (permissions.IsAuthenticated,)
    # authentication_classes = (SessionAuthentication,)

 
    def post(self, request):
        
        identification = request.data['identification']
        try:
            id_user = User.objects.filter(
                identification_number=identification).values('id').first()['id']
        except:
            return Response({'mensaje': 'usuario no existe'}, status=status.HTTP_404_NOT_FOUND)
       
        # current_balance = BalanceDetail.objects.filter(
        #     user_id=id_user).values('balance').first()['balance']

        new_balance = BalanceDetail.objects.get(user_id=id_user)
        reload = request.data['reload']
        new_balance.balance = (new_balance.balance + reload)
        
     
        new_balance.save()
        
        success = self.register_trasaction(id_user, identification, reload)
      

        return Response(status=status.HTTP_201_CREATED)

    

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
          details = "recarga",
          transaction_type="recarga"
        )
      print(new_trasaction)
      new_trasaction.save()
      return Response(status=status.HTTP_201_CREATED)