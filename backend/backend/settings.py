import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'f5xh0eca#5)4eb4e1uf8wky9%ac=e2bcds6b76+cfafztq-5q)'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

SITE_ID = 1
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django.contrib.sites',
    'django_filters',
    'allauth',
    'allauth.account',
    'corsheaders',
    'rest_auth.registration',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
    'storages',

    'coach'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'coach/api/templates'), ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'coach',
        'CLIENT': {
                'host': 'mongodb://admin:adminpass@cluster0-shard-00-00-buiih.mongodb.net:27017,cluster0-shard-00-01-buiih.mongodb.net:27017,cluster0-shard-00-02-buiih.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
                'port': 27017,
                'username': 'admin',
                'password': 'adminpass',
                'authSource': 'admin',
        }

    }
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    # },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'coach.User'

# SESSION_ENGINE = 'django.contrib.sessions.backends.signed_cookies'
# SESSION_SERIALIZER = 'django.contrib.sessions.serializers.JSONSerializer'
# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'es-co'

TIME_ZONE = 'America/Bogota'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# CORS
CORS_ORIGIN_WHITELIST = ["http://localhost:3000"]
CORS_ALLOW_CREDENTIALS = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'

# Rest Framework Config
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for -unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    )
}

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'coach.api.serializers.UserSerializer',
    'TOKEN_SERIALIZER': 'coach.api.serializers.TokenSerializer',
    'PASSWORD_RESET_SERIALIZER':
        'coach.api.serializers.PasswordResetSerializer',
}


REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'coach.api.serializers.CustomRegisterSerializer',
}


# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend' #enviar correo al email
# enviar correo a consola

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_HOST_USER = 'AlbaNuryCoach'
EMAIL_HOST_PASSWORD = 'Michelle2020*'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
SEND_GRID_API_KEY = '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'
DEFAULT_FROM_EMAIL = 'Alba Nury <albanurygonzalez2020@gmail.com>'


# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
# EMAIL_HOST = 'localhost'
# EMAIL_PORT = 1025
# DEFAULT_FROM_EMAIL = 'Alba Nury <emailexample@gmail.com>'

# Django All-Auth config
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_USER_EMAIL_FIELD = 'email'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_VERIFICATION = 'none'
USERNAME_REQUIRED = False
EMAIL_REQUIRED = True

# AWS storage
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

AWS_ACCESS_KEY_ID = 'AKIASNWJXNEZETRBGCCM'
AWS_SECRET_ACCESS_KEY = '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'
AWS_STORAGE_BUCKET_NAME = 'alba-nury'

AWS_DEFAULT_ACL = None
AWS_S3_FILE_OVERWRITE = False
