from allauth.account.adapter import get_adapter
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from allauth.account.utils import setup_user_email
from rest_auth.registration.serializers import RegisterSerializer
from coach.models import User, Post


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
    # is_superuser = serializers.BooleanField(default=False)

    class Meta:
        model = User
        fields = ('email', 'name', 'phone', 'id_phone', 'country', 'state',
                  'city', 'password', 'is_active', 'is_admin')

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
            # 'is_superuser': self.validated_data.get('is_superuser', ''),
        }

    def save(self, request):
        print('request.POST')
        print(request.POST)
        adapter = get_adapter()
        user = adapter.new_user(request)

        print('user')
        print(user)
        self.cleaned_data = self.get_cleaned_data()

        user.id = self.cleaned_data.get('id')
        user.email = self.cleaned_data.get('email')
        user.name = self.cleaned_data.get('name')
        user.id_phone = self.cleaned_data.get('id_phone')
        user.phone = self.cleaned_data.get('phone')
        user.country = self.cleaned_data.get('country')
        user.state = self.cleaned_data.get('state')
        user.city = self.cleaned_data.get('city')
        user.is_admin = self.cleaned_data.get('is_admin')
        user.is_active = self.cleaned_data.get('is_active')
        # user.is_superuser = self.cleaned_data.get('is_superuser')
        password = self.cleaned_data.get('password1')
        user.set_password(password)

        user.save()
        adapter.save_user(request, user, self)
        return user


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'})

    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ['is_superuser']


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class SimpleUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'is_admin',)
        read_only_fields = ['id', 'is_admin']


class TokenSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer()

    class Meta:
        model = Token
        fields = ('key', 'user')
