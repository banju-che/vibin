# accounts/serializers.py

from rest_framework import serializers
from .models import UserProfile
from users.serializers import UserSerializer  

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'bio', 'avatar', 'location', 'created_at']
