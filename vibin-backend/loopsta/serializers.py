from rest_framework import serializers
from .models import Loopsta
from comments.serializers import CommentSerializer

class LoopstaSerializer(serializers.ModelSerializer):

    likes_count = serializers.SerializerMethodField()
    liked_by_user = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Loopsta
        fields = [
            'id',
            'video',
            'user',
            'caption',
            'comments',
            'created_at',
            'likes_count',
            'liked_by_user', 
        ]

    def get_likes_count(self, obj):
        return obj.likes.count() if hasattr(obj, 'likes') else 0
    
    def get_liked_by_user(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return obj.likes.filter(user=user).exists()
        return False
    


