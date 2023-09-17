from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import logout, authenticate
from ..serializer import UpdatePasswordSerializer
from rest_framework.response import Response
from ..models import User


class UpadatePassword(APIView):
    
    def patch(self, request, *args, **kwargs):
      data = request.data
      serializer = UpdatePasswordSerializer(data=data)
     
      id = self.request.data['id']
      user = User.objects.filter(id=id).first()

      if serializer.is_valid():
        old_password = serializer.data['old_password']
        new_password = serializer.data['new_password']
      else:
        print(serializer.errors)
        return Response({'message': "error al serializar"}, serializer.errors)
        

      if user.check_password(old_password):
          user.set_password(new_password)
          user.save()
          logout(request)
          return Response({'message': "Contraseña actualizada"}, status=status.HTTP_200_OK)
          
      else:
          return Response({'message': "La contraseña no coincide"},status=status.HTTP_404_NOT_FOUND)