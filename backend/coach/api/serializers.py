from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_auth.registration.serializers import RegisterSerializer
from coach.models import User


class CustomRegisterSerializer(RegisterSerializer):
    username = None
    email = serializers.EmailField(required=True)
    name = serializers.CharField(required=True)
    id_phone = serializers.IntegerField(allow_null=True)
    phone = serializers.IntegerField(allow_null=True)
    country = serializers.CharField(required=False)
    state = serializers.CharField(required=False)
    city = serializers.CharField(required=False)
    is_active = serializers.BooleanField(default=True)
    is_admin = serializers.BooleanField(default=False)
    is_superuser = serializers.BooleanField(default=False)

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()
        return {
            'email': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'name': self.validated_data.get('name', ''),
            'id_phone': self.validated_data.get('id_phone', ''),
            'phone': self.validated_data.get('phone', ''),
            'country': self.validated_data.get('country', ''),
            'state': self.validated_data.get('state', ''),
            'city': self.validated_data.get('city', ''),
            'is_active': self.validated_data.get('is_active', ''),
            'is_admin': self.validated_data.get('is_admin', ''),
            'is_superuser': self.validated_data.get('is_superuser', ''),
        }


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'})

    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ['is_superuser']


class TokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Token
        fields = ('key', 'user')
