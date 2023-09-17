from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from app_user.serializer import UserSerializer
from ..serializer import UserSerializer, UpdateUserSerializer
from ..models import *


"""
  The Userview class is an API view that retrieves a user object by its ID and returns it in serialized form.
"""
class Userview(APIView):
  

    def get(self, request, id):
        try:
          data = User.objects.get(id = id)
        except:
          return Response({'user': "No existe este usuario"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(data)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'user': "No existe este usuario"}, status=status.HTTP_404_NOT_FOUND)

        serializer = UpdateUserSerializer(user, data=request.data, partial=True)  # Usamos 'partial=True' para permitir actualizaciones parciales
        if serializer.is_valid():
            serializer.save()
            return Response({'user': serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)