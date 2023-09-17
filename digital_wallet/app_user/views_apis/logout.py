from ..models import *
from rest_framework import status, permissions
from rest_framework.generics import GenericAPIView
#from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response



class UserLogout(GenericAPIView):
    #permission_classes = (permissions.AllowAny,)
    #authentication_classes = ()

    def post(self, request, *args, **kwargs):
      user = User.objects.filter(id=request.data.get('id', ''))
      if user.exists():
        #RefreshToken.for_user(user.first())
        return Response({'message': 'Sesion cerrada con exito'}, status=status.HTTP_200_OK)
      return Response({'message': 'Usuario no existe'}, status=status.HTTP_400_BAD_REQUEST)