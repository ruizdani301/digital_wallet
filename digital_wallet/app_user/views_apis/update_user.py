from rest_framework.generics import RetrieveUpdateAPIView
from ..models import User
from serializer import UserSerializer

class UpdateUser(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_fields = ['id']
