from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from .customManager import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email'), unique=True)
    first_name = models.CharField(_('first name'), max_length=25, null=True, blank=True)
    last_name = models.CharField(_('last name'), max_length=25, null=True, blank=True)
    middle_name = models.CharField(_('middle name'), max_length=25, null=True, blank=True)
    is_staff = models.BooleanField(_('is staff'), default=False)
    is_active = models.BooleanField(_('is active'), default=True)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'

    @property
    def get_full_name(self):

        if self.first_name is not None and self.last_name is not None:
            return str(self.first_name) + ' ' + str(self.last_name)
        elif self.first_name is None and self.last_name is not None:
            return str(self.last_name)
        elif self.first_name is not None and self.last_name is None:
            return str(self.first_name)
        else:
            return str(self.email) + " (Name not set)"