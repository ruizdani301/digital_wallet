from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()

def custom_validation(data):
    email = data.get('email', '').strip()
    password = data.get('password', '').strip()
    
    if not email:
        raise ValidationError({'email': 'An email is needed'})
    
    if UserModel.objects.filter(email=email).exists():
        raise ValidationError({'email': 'Choose another email'})
    
    if not password or len(password) < 8:
        raise ValidationError({'password': 'Choose another password, min 8 characters'})
    
    return data

def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('an email is needed')
    return True

def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('a password is needed')
    return True
