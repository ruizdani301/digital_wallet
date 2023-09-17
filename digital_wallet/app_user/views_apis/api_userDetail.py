# from ..serializer import CustomTokenSerializer, UserSerializer
# from ..models import *
# from app_wallet.models import BalanceDetail
# from django.contrib.auth import get_user_model, login, logout, authenticate
# from rest_framework.authentication import SessionAuthentication
# from rest_framework import status, permissions
# from rest_framework.views import APIView
# from rest_framework.generics import GenericAPIView
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )
# from rest_framework.response import Response
# from app_user.serializer import UserLoginSerializer, UserRegisterSerializer, UserSerializer
# from .validations import custom_validation, validate_email, validate_password



# class UserRegister(APIView):
#     permission_classes = (permissions.AllowAny,)
#     # authentication_classes = (SessionAuthentication,)

#     def post(self, request):
#         clean_data = custom_validation(request.data)
#         serializer = UserRegisterSerializer(data=clean_data)
#         if serializer.is_valid(raise_exception=True):
#             user = serializer.create(clean_data)
#             if user:
#                 id_user = User.objects.filter(
#                 identification_number=user.identification_number).values('id').first()['id']
              
#                 balance_detail = BalanceDetail(user_id = id_user,
#                                           balance = 0,
#                                           )
#                 balance_detail.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class UserLogin(TokenObtainPairView):
#   serializer_class = CustomTokenSerializer
  
#   def post(self, request, *args, **kwargs):
#     email = request.data.get('email', '')
#     password = request.data.get('password', '')
#     user = authenticate(email=email,password=password)
#     if user:
#         login_serializer = self.serializer_class(data=request.data)
#         if login_serializer.is_valid():
#             user_serializer = UserSerializer(user)
#             return Response({
#               'token': login_serializer.validated_data.get('access'),
#               'refresh-token': login_serializer.validated_data.get('refresh'),
#               'user': user_serializer.data,
#               'message': 'Inicio de sesion exitoso'
#             }, status=status.HTTP_200_OK)
#         return Response({'error': 'email o password incorrectos'}, status=status.HTTP_400_BAD_REQUEST)
#     return Response({'error': 'email o password incorrectos'}, status=status.HTTP_400_BAD_REQUEST)



# class UserLogout(GenericAPIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = ()

#     def post(self, request, *args, **kwargs):
#       user = User.objects.filter(id=request.data.get('id', ''))
#       if user.exists():
#         RefreshToken.for_user(user.first())
#         return Response({'message': 'Sesion cerrada con exito'}, status=status.HTTP_200_OK)
#       return Response({'message': 'Usuario no existe'}, status=status.HTTP_400_BAD_REQUEST)
    


# class Userview(APIView):

#     def get(self, request):
#         serializer = UserSerializer(request.user)
#         return Response({'user': serializer.data}, status=status.HTTP_200_OK)



# class UserLogin(APIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = (SessionAuthentication,)

#     def post(self, request):
#         data = request.data
#         assert validate_email(data)
#         assert validate_password(data)
#         serializer = UserLoginSerializer(data=data)
#         user = authenticate(
#             request, email=data['email'], password=data['password'])

#         if user is not None:
#             login(request, user)
#             payload = jwt_payload_handler(user)
#             token = jwt_encode_handler(payload)
#             return Response({'token': token}, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
#         # if serializer.is_valid(raise_exception=True):
#         #     user = serializer.check_user(data)
#         #     login(request, user)
#         #     # data_user = User.objects.all().filter(email=user.email)
#         #     # serializer = UserSerializer(data_user, many=True)
#         #     return Response(status=status.HTTP_200_OK)


# class UserLogout(APIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = ()

#     def post(self, request):
#         logout(request)
#         return Response(status=status.HTTP_200_OK)

