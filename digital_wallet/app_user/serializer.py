from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *

UserModel = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    """ejemplo json
    {
    "name": "Maria Antonieta",
    "password": "mypassword",
    "identification_type": "cc",
    "identification_number": "123456789",
    "email": "ma@ejemplo.com",
    "phone_number": "32456425432",
    "country_code": "57"
    }
    """
    class Meta:
        model = UserModel
        fields = '__all__'
    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(
            name=clean_data['name'],
            password=(clean_data['password']),
            identification_type=clean_data['identification_type'],
            identification_number=clean_data['identification_number'],
            email=clean_data['email'],
            phone_number=clean_data['phone_number'],
            country_code=clean_data['country_code']
        )
        user_obj.save()
        return user_obj


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(
            username=clean_data['email'], password=clean_data['password'])
        if not user:
            raise ValidationError('User not found or incorrect password')
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "uuid_user", "last_login", "name", "email", "identification_type", "identification_number", "phone_number", "updated_at"]
        
class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["name", "email", "identification_type","identification_number", "phone_number"]

        
class CustomTokenSerializer(TokenObtainPairSerializer):
  pass

class UpdatePasswordSerializer(serializers.Serializer):
    id = serializers.IntegerField() 
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)