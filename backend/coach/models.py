from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)


class MyUserManager(BaseUserManager):
    def create_user(self, email, name, phone, id_phone, country, state, city, password=None):
        """
        Creates and saves a User with the given data.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            phone=phone,
            id_phone=id_phone,
            country=country,
            state=state,
            city=city
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None):
        """
        Creates and saves a superuser with the given data.
        """
        user = self.create_user(
            email,
            name=name,
            phone=None,
            id_phone=None,
            country=None,
            state=None,
            city=None
        )
        user.set_password(password)
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Program(models.Model):
    title = models.CharField(max_length=400)
    crated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Module(models.Model):
    title = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    father = models.ForeignKey(
        Program, on_delete=models.CASCADE, related_name='modules')

    def __str__(self):
        return self.title


class Video(models.Model):
    title = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    videofile = models.FileField(
        upload_to='videos/', null=True, verbose_name="")
    father = models.ForeignKey(
        Module, on_delete=models.CASCADE, related_name='videos')

    def __str__(self):
        return self.title


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=140)
    phone = models.BigIntegerField()
    id_phone = models.IntegerField()
    country = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    watched_videos = models.ManyToManyField(
        Video, related_name='videos', blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class Post(models.Model):
    picture = models.ImageField(upload_to="post_img")
    title = models.CharField(max_length=400)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='post_user')

    def __str__(self):
        return self.title

