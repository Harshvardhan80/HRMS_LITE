"""
Django settings for hrms_lite project.
"""

from pathlib import Path
from decouple import config
import dj_database_url

# --------------------------------------------------
# BASE DIR
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# --------------------------------------------------
# SECURITY
# --------------------------------------------------
SECRET_KEY = config(
    'SECRET_KEY',
    default='django-insecure-change-this-in-production'
)

DEBUG = config('DEBUG', default=False, cast=bool)

ALLOWED_HOSTS = ["*"]  # OK for Railway

CSRF_TRUSTED_ORIGINS = [
    "https://*.railway.app",
]

# --------------------------------------------------
# APPLICATIONS
# --------------------------------------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'corsheaders',

    # Local
    'employees',
]

# --------------------------------------------------
# MIDDLEWARE
# --------------------------------------------------
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',

    'corsheaders.middleware.CorsMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# --------------------------------------------------
# URLS / WSGI
# --------------------------------------------------
ROOT_URLCONF = 'hrms_lite.urls'

WSGI_APPLICATION = 'hrms_lite.wsgi.application'

# --------------------------------------------------
# TEMPLATES (FRONTEND HTML)
# --------------------------------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',

        # 👇 FRONTEND FOLDER
        'DIRS': [
            BASE_DIR / 'frontend'
        ],

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

# --------------------------------------------------
# DATABASE
# --------------------------------------------------
DATABASES = {
    'default': dj_database_url.config(
        default=config('DATABASE_URL', default='sqlite:///db.sqlite3'),
        conn_max_age=600
    )
}

# --------------------------------------------------
# PASSWORD VALIDATION
# --------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# --------------------------------------------------
# INTERNATIONALIZATION
# --------------------------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# --------------------------------------------------
# STATIC FILES (CSS / JS)
# --------------------------------------------------
STATIC_URL = '/static/'

# 👇 FRONTEND STATIC FILES
STATICFILES_DIRS = [
    BASE_DIR / 'frontend'
]

STATIC_ROOT = BASE_DIR / 'staticfiles'

STATICFILES_STORAGE = (
    'whitenoise.storage.CompressedManifestStaticFilesStorage'
)

# --------------------------------------------------
# DEFAULT PRIMARY KEY
# --------------------------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# --------------------------------------------------
# CORS
# --------------------------------------------------
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:3000,http://127.0.0.1:3000'
).split(',')

CORS_ALLOW_CREDENTIALS = True

# --------------------------------------------------
# DRF
# --------------------------------------------------
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
}