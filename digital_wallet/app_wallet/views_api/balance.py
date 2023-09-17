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


class BalanceApiView(APIView):
    """
        Class where the method needs a id to return or update
        any information
    """

    def getObject(self, id):
        """
            Validated if object exist
        """
        valor = BalanceDetail.objects.filter(
            user_id=id).values('balance', 'user__name', 'user__uuid_user').first()

        return (valor)

    def get(self, request, id):
        current_balance = self.getObject(id)
        serializer = BalanceSerializer(current_balance)
        print(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)